<script>
import AddProfile from "./components/AddProfile.vue";
import ProfileList from "./components/ProfileList.vue";

export default {
  components: {
    AddProfile,
    ProfileList,
  },
  data() {
    return {
      profiles: [],
      searchQuery: "",
      isLoading: false,
      errorMessage: "",
    };
  },
  computed: {
    filteredProfiles() {
      const query = this.searchQuery.toLowerCase();
      return this.profiles.filter(
        (profile) =>
          profile.name.toLowerCase().includes(query) ||
          profile.email.toLowerCase().includes(query) ||
          profile.phone?.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    async fetchProfiles() {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        const response = await fetch("http://localhost:8080/api/customers");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        this.profiles = await response.json();
      } catch (error) {
        this.errorMessage = "Failed to fetch profiles. Please try again later.";
        console.error("Error fetching profiles:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async addProfile(profile) {
      this.errorMessage = "";
      try {
        const response = await fetch("http://localhost:8080/api/customers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const newProfile = await response.json();
        this.profiles.push(newProfile);
      } catch (error) {
        this.errorMessage = "Failed to add profile. Please try again.";
        console.error("Error adding profile:", error);
      }
    },
    async deleteProfile(index) {
      const profile = this.profiles[index];
      this.errorMessage = "";
      try {
        const response = await fetch(
          `http://localhost:8080/api/customers/${profile._id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        this.profiles.splice(index, 1);
      } catch (error) {
        this.errorMessage = "Failed to delete profile. Please try again.";
        console.error("Error deleting profile:", error);
      }
    },
    handleSearchInput(event) {
      this.searchQuery = event.target.value;
    },
  },
  mounted() {
    this.fetchProfiles();
  },
};
</script>

<template>
  <div id="app">
    <header>
      <h1>Customer Management</h1>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search profiles..."
        @input="handleSearchInput"
      />
    </header>
    <main>
      <AddProfile @add-profile="addProfile" />
      <ProfileList
        :profiles="filteredProfiles"
        @delete-profile="deleteProfile"
      />
      <div v-if="isLoading" class="loading">Loading profiles...</div>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </main>
  </div>
</template>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

header input {
  padding: 8px;
  font-size: 16px;
  width: 300px;
}

.loading {
  color: blue;
  font-weight: bold;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
