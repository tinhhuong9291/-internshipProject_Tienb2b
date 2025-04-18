<template>
  <div class="add-profile">
    <div class="form-card">
      <h2>Add New Profile</h2>
      <form @submit.prevent="addProfile">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            type="text"
            id="name"
            v-model="profile.name"
            placeholder="Enter full name"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            type="email"
            id="email"
            v-model="profile.email"
            placeholder="Enter email address"
            required
          />
        </div>

        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            v-model="profile.phone"
            placeholder="Enter phone number"
            required
          />
        </div>

        <button type="submit" class="submit-btn">
          <i class="fas fa-plus"></i>
          Add Profile
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profile: {
        name: "",
        email: "",
        phone: "",
      },
    };
  },
  methods: {
    addProfile() {
      this.$emit("add-profile", { ...this.profile });
      this.profile = { name: "", email: "", phone: "" };
    },
  },
};
</script>

<style scoped>
.add-profile {
  margin: 2rem 0;
}

.form-card {
  background-color: var(--card-background);
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  max-width: 500px;
  margin: 0 auto;
}

h2 {
  color: var(--text-primary);
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
}

input {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background-color: var(--background-color);
  color: var(--text-primary);
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

input::placeholder {
  color: var(--text-secondary);
  opacity: 0.7;
}

.submit-btn {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-btn:hover {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
}

.submit-btn i {
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .form-card {
    margin: 0 1rem;
    padding: 1.5rem;
  }
}
</style>
