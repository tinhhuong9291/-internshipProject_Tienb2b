<template>
  <div class="profile-list">
    <div class="profiles-grid">
      <div
        v-for="(profile, index) in profiles"
        :key="index"
        class="profile-card"
      >
        <div class="profile-avatar">
          {{ profile.name.charAt(0).toUpperCase() }}
        </div>
        <div class="profile-info">
          <h3>{{ profile.name }}</h3>
          <p class="email">{{ profile.email }}</p>
          <router-link :to="`/edit-customer/${profile._id}`" class="edit-button">
            Edit
          </router-link>
          <button @click="$emit('delete-profile', index)" class="delete-button">
            Delete
          </button>
          <router-link
            :to="`/interactions/${profile._id}`"
            class="interaction-btn"
          >
            View Interactions
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profiles: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.profile-list {
  display: flex;
  flex-direction: column;
}

.profiles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.profile-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  transition: transform 0.2s;
}

.profile-card:hover {
  transform: scale(1.05);
}

.profile-avatar {
  font-size: 24px;
  font-weight: bold;
  background-color: #007bff;
  color: white;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-bottom: 8px;
}

.profile-info h3 {
  margin: 0;
  font-size: 18px;
}

.profile-info .email {
  color: #666;
  font-size: 14px;
}

.edit-button {
  margin-top: 8px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  background-color: #007bff;
  color: white;
  display: inline-block;
  text-decoration: none;
  text-align: center;
}

.edit-button:hover {
  background-color: #0056b3;
}

.delete-button {
  margin-top: 8px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  background-color: #f44336;
  color: white;
}

.delete-button:hover {
  background-color: #d32f2f;
}

.interaction-btn {
  display: inline-block;
  margin-top: 8px;
  padding: 8px 12px;
  background: #10b981;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  transition: background 0.2s;
}

.interaction-btn:hover {
  background: #059669;
}
</style>
