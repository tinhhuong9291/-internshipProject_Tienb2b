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
          <button @click="$emit('select-profile', profile)" class="edit-button">
            Edit
          </button>
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.edit-button:hover {
  background-color: #0056b3;
}
</style>
