<template>
  <div class="interactions-page">
    <div class="page-header">
      <h2>
        <i class="fas fa-comments"></i>
        Customer Interactions
      </h2>
      <button class="back-btn" @click="$router.push('/customers')">
        <i class="fas fa-arrow-left"></i> Back
      </button>
    </div>

    <div v-if="customer" class="customer-card">
      <div class="avatar">{{ customer.name?.[0]?.toUpperCase() || "?" }}</div>
      <div class="info">
        <h3>{{ customer.name }}</h3>
        <p v-if="customer.email">
          <i class="fas fa-envelope"></i> {{ customer.email }}
        </p>
        <p v-if="customer.phone">
          <i class="fas fa-phone"></i> {{ customer.phone }}
        </p>
      </div>
    </div>

    <div class="interaction-main">
      <div class="interaction-form card">
        <h3>{{ editMode ? "Edit Interaction" : "Add New Interaction" }}</h3>
        <form @submit.prevent="addInteraction">
          <div class="form-group">
            <label>Type</label>
            <select v-model="newInteraction.type" required>
              <option value="email">Email</option>
              <option value="call">Call</option>
              <option value="meeting">Meeting</option>
              <option value="message">Message</option>
            </select>
          </div>
          <div class="form-group">
            <label>Content</label>
            <textarea
              v-model="newInteraction.content"
              rows="3"
              required
              placeholder="Enter details..."
            ></textarea>
          </div>
          <div class="form-group">
            <label>Follow-up Date</label>
            <input type="date" v-model="newInteraction.followUpDate" />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">
              <i :class="editMode ? 'fas fa-save' : 'fas fa-plus'"></i>
              {{ editMode ? "Update" : "Add" }}
            </button>
            <button
              v-if="editMode"
              type="button"
              class="btn btn-secondary"
              @click="cancelEdit"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div class="interaction-list card">
        <h3><i class="fas fa-history"></i> Interaction History</h3>
        <div v-if="isLoading" class="loading">Loading...</div>
        <div v-else-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <div v-else-if="interactions.length === 0" class="no-data">
          <i class="fas fa-inbox"></i> No interactions found.
        </div>
        <ul v-else class="timeline">
          <li
            v-for="interaction in interactions"
            :key="interaction._id"
            class="timeline-item"
          >
            <div class="timeline-dot" :class="interaction.type"></div>
            <div class="timeline-content">
              <div class="timeline-header">
                <span class="type" :class="interaction.type">
                  <i :class="iconForType(interaction.type)"></i>
                  {{ interaction.type }}
                </span>
                <span class="date">{{ formatDate(interaction.date) }}</span>
              </div>
              <div class="content">{{ interaction.content }}</div>
              <div v-if="interaction.followUpDate" class="followup">
                <i class="fas fa-calendar-alt"></i>
                Follow-up: {{ formatDate(interaction.followUpDate) }}
              </div>
              <div class="actions">
                <button @click="startEdit(interaction)" class="btn btn-edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  @click="deleteInteraction(interaction._id)"
                  class="btn btn-delete"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    customerId: { type: String, required: true },
  },
  data() {
    return {
      customer: null,
      interactions: [],
      isLoading: false,
      errorMessage: "",
      newInteraction: {
        type: "email",
        content: "",
        followUpDate: null,
      },
      editMode: false,
      editId: null,
    };
  },
  mounted() {
    this.fetchCustomer();
    this.fetchInteractions();
  },
  watch: {
    customerId() {
      this.fetchCustomer();
      this.fetchInteractions();
    },
  },
  methods: {
    async fetchCustomer() {
      try {
        const response = await fetch(
          `https://internshipproject-tienb2b.onrender.com/api/customers/${this.customerId}`
        );
        if (!response.ok) throw new Error();
        this.customer = await response.json();
      } catch {
        this.errorMessage = "Failed to fetch customer details.";
      }
    },
    async fetchInteractions() {
      this.errorMessage = "";
      this.isLoading = true;
      try {
        const res = await fetch(
          `https://internshipproject-tienb2b.onrender.com/api/interactions/${this.customerId}`
        );
        if (!res.ok) throw new Error();
        this.interactions = await res.json();
      } catch {
        this.errorMessage = "Failed to fetch interactions.";
      } finally {
        this.isLoading = false;
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    iconForType(type) {
      switch (type) {
        case "email":
          return "fas fa-envelope";
        case "call":
          return "fas fa-phone";
        case "meeting":
          return "fas fa-handshake";
        case "message":
          return "fas fa-comment";
        default:
          return "fas fa-info-circle";
      }
    },
    async addInteraction() {
      try {
        const interactionData = {
          ...this.newInteraction,
          customerId: this.customerId,
        };
        let url =
          "https://internshipproject-tienb2b.onrender.com/api/interactions";
        let method = "POST";
        if (this.editMode && this.editId) {
          url = `${url}/${this.editId}`;
          method = "PUT";
        }
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(interactionData),
        });
        if (!response.ok) throw new Error();
        this.resetForm();
        await this.fetchInteractions();
      } catch {
        this.errorMessage = `Failed to ${
          this.editMode ? "update" : "add"
        } interaction.`;
      }
    },
    startEdit(interaction) {
      this.editMode = true;
      this.editId = interaction._id;
      this.newInteraction = {
        type: interaction.type,
        content: interaction.content,
        followUpDate: interaction.followUpDate
          ? new Date(interaction.followUpDate).toISOString().split("T")[0]
          : null,
      };
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.newInteraction = {
        type: "email",
        content: "",
        followUpDate: null,
      };
      this.editMode = false;
      this.editId = null;
    },
    async deleteInteraction(id) {
      if (!confirm("Are you sure you want to delete this interaction?")) return;
      try {
        const response = await fetch(
          `https://internshipproject-tienb2b.onrender.com/api/interactions/${id}`,
          { method: "DELETE" }
        );
        if (!response.ok) throw new Error();
        await this.fetchInteractions();
      } catch {
        this.errorMessage = "Failed to delete interaction.";
      }
    },
  },
};
</script>

<style scoped>
.interactions-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 12px;
  font-family: "Inter", Arial, sans-serif;
  color: #334155;
  background-color: #f8fafc;
  border-radius: 16px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.page-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color, #4f46e5);
  display: flex;
  align-items: center;
  gap: 12px;
  text-shadow: 0 1px 1px rgba(79, 70, 229, 0.1);
}

.back-btn {
  background: #64748b;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(100, 116, 139, 0.15);
}

.back-btn:hover {
  background: #475569;
  transform: translateY(-2px);
}

.customer-card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.08);
  padding: 24px 32px;
  margin-bottom: 32px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid rgba(79, 70, 229, 0.1);
}

.customer-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.12);
}

.avatar {
  width: 76px;
  height: 76px;
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  color: #fff;
  border-radius: 50%;
  font-size: 2.4rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 28px;
  box-shadow: 0 4px 8px rgba(79, 70, 229, 0.2);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.info h3 {
  margin: 0 0 8px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
}

.info p {
  margin: 0 0 6px 0;
  color: #64748b;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.info p:last-child {
  margin-bottom: 0;
}

.info p i {
  color: #4f46e5;
  font-size: 0.9rem;
}

.interaction-main {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}

.card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.08);
  padding: 28px 24px;
  flex: 1 1 350px;
  min-width: 340px;
  border: 1px solid rgba(79, 70, 229, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.12);
}

.interaction-form h3,
.interaction-list h3 {
  margin-top: 0;
  margin-bottom: 22px;
  font-size: 1.25rem;
  font-weight: 600;
  color: #4f46e5;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f9;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-weight: 500;
  margin-bottom: 6px;
  display: block;
  color: #475569;
  font-size: 0.95rem;
}

.form-group select,
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  margin-top: 4px;
  background: #f8fafc;
  transition: all 0.2s ease;
  color: #1e293b;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
}

.form-group select:hover,
.form-group input:hover,
.form-group textarea:hover {
  border-color: #cbd5e1;
}

.form-group select:focus,
.form-group input:focus,
.form-group textarea:focus {
  border-color: #4f46e5;
  outline: none;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.btn {
  border: none;
  border-radius: 8px;
  padding: 12px 18px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  color: #fff;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #4338ca, #4f46e5);
}

.btn-secondary {
  background: #e2e8f0;
  color: #334155;
}

.btn-secondary:hover {
  background: #cbd5e1;
}

.btn-edit {
  background: #10b981;
  color: #fff;
  padding: 8px 14px;
  font-size: 0.95rem;
  border-radius: 6px;
}

.btn-edit:hover {
  background: #059669;
}

.btn-delete {
  background: #ef4444;
  color: #fff;
  padding: 8px 14px;
  font-size: 0.95rem;
  border-radius: 6px;
}

.btn-delete:hover {
  background: #dc2626;
}

.loading,
.error-message,
.no-data {
  padding: 32px 0;
  text-align: center;
  color: #64748b;
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.loading:before {
  content: "";
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top-color: #4f46e5;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: block;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  color: #ef4444;
}

.error-message:before {
  content: "⚠️";
  font-size: 2rem;
}

.no-data {
  color: #94a3b8;
}

.no-data:before {
  content: "📝";
  font-size: 2.5rem;
}

.timeline {
  list-style: none;
  padding: 0;
  margin: 0;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 28px;
  position: relative;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-item:before {
  content: "";
  position: absolute;
  left: 8px;
  top: 24px;
  bottom: -28px;
  width: 2px;
  background-color: #e2e8f0;
  z-index: 0;
}

.timeline-item:last-child:before {
  display: none;
}

.timeline-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin-right: 22px;
  margin-top: 8px;
  flex-shrink: 0;
  background: #e5e7eb;
  border: 2px solid #c7d2fe;
  z-index: 1;
  box-shadow: 0 0 0 4px #fff;
}

.timeline-dot.email {
  background: #c5e1a5;
  border-color: #a3e635;
}

.timeline-dot.call {
  background: #bbdefb;
  border-color: #38bdf8;
}

.timeline-dot.meeting {
  background: #ffcc80;
  border-color: #f59e42;
}

.timeline-dot.message {
  background: #e1bee7;
  border-color: #a78bfa;
}

.timeline-content {
  flex: 1;
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.timeline-content:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f1f5f9;
}

.type {
  font-weight: 600;
  text-transform: capitalize;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px;
  border-radius: 20px;
  background-color: rgba(100, 116, 139, 0.1);
}

.type.email {
  color: #65a30d;
  background-color: rgba(101, 163, 13, 0.1);
}

.type.call {
  color: #0284c7;
  background-color: rgba(2, 132, 199, 0.1);
}

.type.meeting {
  color: #ea580c;
  background-color: rgba(234, 88, 12, 0.1);
}

.type.message {
  color: #a21caf;
  background-color: rgba(162, 28, 175, 0.1);
}

.date {
  color: #64748b;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.date:before {
  content: "📅";
  font-size: 1rem;
}

.content {
  margin-bottom: 10px;
  font-size: 1.05rem;
  line-height: 1.5;
  color: #334155;
  padding: 6px 0;
}

.followup {
  font-size: 0.95rem;
  color: #64748b;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background-color: #f1f5f9;
  border-radius: 8px;
  display: inline-flex;
}

.actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  justify-content: flex-end;
}

@media (max-width: 900px) {
  .interaction-main {
    flex-direction: column;
    gap: 24px;
  }
  .card {
    min-width: unset;
  }
  .customer-card {
    padding: 20px;
  }
  .avatar {
    width: 60px;
    height: 60px;
    font-size: 1.8rem;
    margin-right: 20px;
  }
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .back-btn {
    align-self: flex-start;
  }
}
</style>
