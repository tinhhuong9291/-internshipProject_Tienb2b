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
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}
.page-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color, #4f46e5);
  display: flex;
  align-items: center;
  gap: 10px;
}
.back-btn {
  background: #64748b;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.back-btn:hover {
  background: #475569;
}
.customer-card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.07);
  padding: 20px 28px;
  margin-bottom: 28px;
}
.avatar {
  width: 64px;
  height: 64px;
  background: var(--primary-color, #4f46e5);
  color: #fff;
  border-radius: 50%;
  font-size: 2.2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 22px;
}
.info h3 {
  margin: 0 0 6px 0;
  font-size: 1.3rem;
  font-weight: 600;
}
.info p {
  margin: 0;
  color: #64748b;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}
.interaction-main {
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
}
.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.07);
  padding: 24px 20px;
  flex: 1 1 350px;
  min-width: 340px;
}
.interaction-form h3,
.interaction-list h3 {
  margin-top: 0;
  margin-bottom: 18px;
  font-size: 1.15rem;
  font-weight: 600;
  color: #4f46e5;
  display: flex;
  align-items: center;
  gap: 8px;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  font-weight: 500;
  margin-bottom: 4px;
  display: block;
}
.form-group select,
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 9px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  margin-top: 2px;
  background: #f8fafc;
  transition: border 0.2s;
}
.form-group select:focus,
.form-group input:focus,
.form-group textarea:focus {
  border-color: #4f46e5;
  outline: none;
}
.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}
.btn {
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}
.btn-primary {
  background: #4f46e5;
  color: #fff;
}
.btn-primary:hover {
  background: #4338ca;
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
  padding: 6px 12px;
  font-size: 0.95rem;
}
.btn-edit:hover {
  background: #059669;
}
.btn-delete {
  background: #ef4444;
  color: #fff;
  padding: 6px 12px;
  font-size: 0.95rem;
}
.btn-delete:hover {
  background: #dc2626;
}
.loading,
.error-message,
.no-data {
  padding: 18px 0;
  text-align: center;
  color: #64748b;
  font-size: 1.1rem;
}
.error-message {
  color: #ef4444;
}
.timeline {
  list-style: none;
  padding: 0;
  margin: 0;
}
.timeline-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 22px;
  position: relative;
}
.timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 18px;
  margin-top: 7px;
  flex-shrink: 0;
  background: #e5e7eb;
  border: 2px solid #c7d2fe;
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
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}
.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.type {
  font-weight: 600;
  text-transform: capitalize;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 6px;
}
.type.email {
  color: #65a30d;
}
.type.call {
  color: #0284c7;
}
.type.meeting {
  color: #ea580c;
}
.type.message {
  color: #a21caf;
}
.date {
  color: #64748b;
  font-size: 0.95rem;
}
.content {
  margin-bottom: 6px;
  font-size: 1.05rem;
}
.followup {
  font-size: 0.95rem;
  color: #64748b;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
@media (max-width: 900px) {
  .interaction-main {
    flex-direction: column;
    gap: 18px;
  }
  .card {
    min-width: unset;
  }
}
</style>
