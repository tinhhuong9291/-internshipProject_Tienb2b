<template>
  <div class="profile-list">
    <div class="profiles-grid">
      <div
        v-for="(profile, index) in profiles"
        :key="index"
        class="profile-card"
        :class="{ active: selectedProfileIndex === index }"
        @click="selectProfile(index)"
      >
        <div class="profile-avatar">
          {{ profile.name.charAt(0).toUpperCase() }}
        </div>
        <div class="profile-info">
          <h3>{{ profile.name }}</h3>
          <p class="email">{{ profile.email }}</p>
          <div class="profile-meta">
            <span class="timezone">
              <i class="fas fa-clock"></i>
              {{ profile.timezone || "N/A" }}
            </span>
            <span class="last-signin">
              <i class="fas fa-sign-in-alt"></i>
              {{ profile.signInAt || "N/A" }}
            </span>
          </div>
        </div>
        <div class="profile-actions">
          <button class="edit-btn" @click.stop="$emit('edit-profile', index)">
            <i class="fas fa-edit"></i>
          </button>
          <button class="delete-btn" @click.stop="$emit('delete-profile', index)">
            <i class="fas fa-trash"></i>
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
  data() {
    return {
      selectedProfileIndex: null,
    };
  },
  computed: {
    selectedProfile() {
      return this.profiles[this.selectedProfileIndex] || null;
    },
  },
  methods: {
    selectProfile(index) {
      this.selectedProfileIndex = index;
    },
  },
};
</script>

<style scoped>
.profile-list {
  margin-top: 2rem;
}

.profiles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.profile-card {
  background-color: var(--card-background);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  transition: all 0.2s ease;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.profile-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

.profile-card.active {
  border: 2px solid var(--primary-color);
}

.profile-avatar {
  width: 48px;
  height: 48px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 600;
}

.profile-info {
  flex: 1;
}

.profile-info h3 {
  margin: 0;
  font-size: 1.125rem;
  color: var(--text-primary);
}

.email {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0.25rem 0;
}

.profile-meta {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.profile-meta span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.profile-actions {
  display: flex;
  gap: 0.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.profile-card:hover .profile-actions {
  opacity: 1;
}

.edit-btn, .delete-btn {
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-btn {
  background-color: var(--primary-color);
  color: white;
}

.delete-btn {
  background-color: var(--danger-color);
  color: white;
}

.edit-btn:hover, .delete-btn:hover {
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .profiles-grid {
    grid-template-columns: 1fr;
  }
  
  .profile-actions {
    opacity: 1;
  }
}
</style>
