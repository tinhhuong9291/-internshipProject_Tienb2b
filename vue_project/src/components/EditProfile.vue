<template>
  <div class="edit-profile-overlay">
    <div class="edit-profile-popup">
      <div class="popup-header">
        <h2>Edit Customer Information</h2>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>

      <form @submit.prevent="saveChanges">
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            id="name"
            v-model="editableProfile.name"
            type="text"
            placeholder="Enter name"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input
            id="email"
            v-model="editableProfile.email"
            type="email"
            placeholder="Enter email"
            required
          />
        </div>

        <div class="form-group">
          <label for="phone">Phone:</label>
          <input
            id="phone"
            v-model="editableProfile.phone"
            type="tel"
            placeholder="Enter phone number"
          />
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-cancel" @click="$emit('close')">
            Cancel
          </button>
          <button type="submit" class="btn btn-confirm">
            Confirm
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["profile"],
  data() {
    return {
      editableProfile: {},
    };
  },
  watch: {
    profile: {
      handler(newVal) {
        this.editableProfile = { ...newVal };
      },
      immediate: true,
    },
  },
  methods: {
    async saveChanges() {
      try {
        const response = await fetch(
          `https://internshipproject-tienb2b.onrender.com/api/customers/${this.editableProfile._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.editableProfile),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update profile");
        }
        const updatedProfile = await response.json();
        this.$emit("profile-updated", updatedProfile);
        this.$emit("close");
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    },
  },
};
</script>

<style scoped>
.edit-profile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.edit-profile-popup {
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.popup-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-primary);
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.close-btn:hover {
  color: var(--text-primary);
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-primary);
}

.form-group input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.form-group input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  outline: none;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel {
  background-color: var(--secondary-color);
  color: white;
  border: none;
}

.btn-cancel:hover {
  opacity: 0.9;
}

.btn-confirm {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.btn-confirm:hover {
  background-color: var(--primary-hover);
}
</style>
