<template>
  <div class="edit-profile">
    <h2>Editing Profile: {{ profile.name }}</h2>
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
        <button type="submit" class="btn btn-save">Save</button>
        <button type="button" class="btn btn-cancel" @click="$emit('close')">
          Cancel
        </button>
      </div>
    </form>
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
          // `${import.meta.env.VITE_API_URL}/customers/${this.editableProfile._id}`,
          `https://internshipproject-tienb2b.onrender.com/api/customers/${this.editableProfile._id}` ||
            `http://localhost:8080/api/customers/${this.editableProfile._id}`,
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
        this.$emit("profile-updated", updatedProfile); // Phát sự kiện với profile đã cập nhật
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    },
  },
};
</script>

<!-- <style scoped>
.edit-profile {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.edit-profile h2 {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-group input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-save {
  background-color: #007bff;
  color: white;
}

.btn-save:hover {
  background-color: #0056b3;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
}

.btn-cancel:hover {
  background-color: #d32f2f;
}
</style> -->
