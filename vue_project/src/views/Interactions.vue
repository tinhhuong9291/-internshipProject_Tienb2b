<template>
  <div class="interactions-page">
    <div class="page-header">
      <h2>Customer Interactions</h2>
      <button class="back-btn" @click="$router.push('/customers')">
        Back to Customers
      </button>
    </div>

    <div v-if="customer" class="customer-info">
      <div class="customer-avatar">
        {{ customer.name?.[0]?.toUpperCase() || "?" }}
      </div>
      <div class="customer-details">
        <h3>{{ customer.name }}</h3>
        <p v-if="customer.email">
          <i class="fas fa-envelope"></i> {{ customer.email }}
        </p>
        <p v-if="customer.phone">
          <i class="fas fa-phone"></i> {{ customer.phone }}
        </p>
      </div>
    </div>

    <div class="interaction-container">
      <div class="interaction-form">
        <h3>Add New Interaction</h3>
        <form @submit.prevent="addInteraction">
          <div class="form-group">
            <label for="type">Type:</label>
            <select id="type" v-model="newInteraction.type" required>
              <option value="email">Email</option>
              <option value="call">Call</option>
              <option value="meeting">Meeting</option>
              <option value="message">Message</option>
            </select>
          </div>

          <div class="form-group">
            <label for="content">Content:</label>
            <textarea
              id="content"
              v-model="newInteraction.content"
              rows="3"
              required
              placeholder="Enter interaction details..."
            ></textarea>
          </div>

          <div class="form-group">
            <label for="followUpDate">Follow-up Date:</label>
            <input
              type="date"
              id="followUpDate"
              v-model="newInteraction.followUpDate"
            />
          </div>

          <div class="form-actions">
            <button type="submit" class="submit-btn">
              {{ editMode ? "Update" : "Add" }} Interaction
            </button>
            <button
              v-if="editMode"
              type="button"
              class="cancel-btn"
              @click="cancelEdit"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div class="interaction-list">
        <h3>Interaction History</h3>

        <div v-if="isLoading" class="loading">Loading interactions...</div>
        <div v-else-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <div v-else-if="interactions.length === 0" class="no-data">
          No interactions found for this customer.
        </div>

        <div v-else>
          <div
            v-for="interaction in interactions"
            :key="interaction._id"
            class="interaction-card"
          >
            <div class="interaction-header">
              <span class="interaction-type" :class="interaction.type">
                {{ interaction.type }}
              </span>
              <span class="interaction-date">{{
                formatDate(interaction.date)
              }}</span>
            </div>
            <div class="interaction-content">{{ interaction.content }}</div>
            <div v-if="interaction.followUpDate" class="interaction-followup">
              Follow-up: {{ formatDate(interaction.followUpDate) }}
            </div>
            <div class="interaction-actions">
              <button @click="startEdit(interaction)" class="edit-btn">
                <i class="fas fa-edit"></i> Edit
              </button>
              <button
                @click="deleteInteraction(interaction._id)"
                class="delete-btn"
              >
                <i class="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { emailService } from "../services/emailService";

export default {
  props: {
    customerId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      customer: null,
      interactions: [],
      isLoading: false,
      errorMessage: "",
      error: "",
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
      this.fetchInteractions();
    },
  },
  methods: {
    async fetchCustomer() {
      try {
        const response = await fetch(
          `https://internshipproject-tienb2b.onrender.com/api/customers/${this.customerId}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        this.customer = await response.json();
      } catch (error) {
        this.errorMessage = "Failed to fetch customer details.";
        console.error("Error fetching customer:", error);
      }
    },

    async fetchInteractions() {
      this.error = "";
      this.isLoading = true;
      try {
        const res = await fetch(
          `https://internshipproject-tienb2b.onrender.com/api/interactions/${this.customerId}`
        );
        if (!res.ok) throw new Error("Error: " + res.statusText);
        this.interactions = await res.json();
      } catch (err) {
        this.error = "Failed to fetch interactions.";
        console.error("Error fetching interactions:", err);
      } finally {
        this.isLoading = false;
      }
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },

    // function fetch all interactions
    async fetchAllInteractions() {
      try {
        const response = await fetch(
          "https://internshipproject-tienb2b.onrender.com/api/interactions"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        this.interactions = await response.json();
      } catch (error) {
        this.errorMessage = "Failed to fetch interactions.";
        console.error("Error fetching interactions:", error);
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(interactionData),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Reset form
        this.resetForm();

        // Refresh interactions list
        await this.fetchInteractions();

        // Gửi email thông báo
        // if (this.customer.email) {
        //   await emailService.sendInteractionNotification(
        //     this.customer.email,
        //     interactionData
        //   );

        //   this.$toast.success('Email notification sent successfully');
        // }
      } catch (error) {
        this.errorMessage = `Failed to ${
          this.editMode ? "update" : "add"
        } interaction.`;
        console.error(
          `Error ${this.editMode ? "updating" : "adding"} interaction:`,
          error
        );
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
      if (!confirm("Are you sure you want to delete this interaction?")) {
        return;
      }

      try {
        const response = await fetch(
          `https://internshipproject-tienb2b.onrender.com/api/interactions/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Refresh interactions list
        await this.fetchInteractions();
      } catch (error) {
        this.errorMessage = "Failed to delete interaction.";
        console.error("Error deleting interaction:", error);
      }
    },

    // async handleAddInteraction(interaction) {
    //   try {
    //     // Lưu interaction vào database
    //     const savedInteraction = await this.saveInteraction(interaction);

    //     // Gửi email thông báo
    //     if (this.customer.email) {
    //       await emailService.sendInteractionNotification(
    //         this.customer.email,
    //         savedInteraction
    //       );

    //       this.$toast.success('Email notification sent successfully');
    //     }
    //   } catch (error) {
    //     this.$toast.error('Failed to send email notification');
    //     console.error('Error:', error);
    //   }
    // }
  },
};
</script>

<style scoped>
.interactions-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.back-btn {
  padding: 8px 16px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.back-btn:hover {
  background-color: #5a6268;
}

.customer-info {
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.customer-avatar {
  width: 60px;
  height: 60px;
  background-color: var(--primary-color, #007bff);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  margin-right: 20px;
}

.customer-details h3 {
  margin-top: 0;
  margin-bottom: 8px;
}

.customer-details p {
  margin: 5px 0;
  color: #6c757d;
}

.interaction-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.interaction-form,
.interaction-list {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group select,
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
}

.form-group textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.submit-btn {
  padding: 10px 15px;
  background-color: var(--primary-color, #007bff);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  padding: 10px 15px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.interaction-card {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 15px;
  border-left: 3px solid #007bff;
}

.interaction-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.interaction-type {
  font-weight: 600;
  text-transform: capitalize;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.interaction-type.email {
  background-color: #c5e1a5;
}
.interaction-type.call {
  background-color: #bbdefb;
}
.interaction-type.meeting {
  background-color: #ffcc80;
}
.interaction-type.message {
  background-color: #e1bee7;
}

.interaction-date {
  color: #6c757d;
  font-size: 14px;
}

.interaction-content {
  margin-bottom: 10px;
  line-height: 1.5;
}

.interaction-followup {
  font-size: 12px;
  color: #6c757d;
  margin-bottom: 10px;
}

.interaction-actions {
  display: flex;
  gap: 10px;
}

.edit-btn {
  padding: 5px 10px;
  background-color: #17a2b8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.delete-btn {
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.loading,
.error-message,
.no-data {
  padding: 20px;
  text-align: center;
  color: #6c757d;
}

.error-message {
  color: #dc3545;
}

@media (max-width: 768px) {
  .interaction-container {
    grid-template-columns: 1fr;
  }
}
</style>
