<script>
import AddProfile from "./components/AddProfile.vue";
import ProfileList from "./components/ProfileList.vue";
import EditProfile from "./components/EditProfile.vue";

export default {
  components: {
    AddProfile,
    ProfileList,
    EditProfile,
  },
  data() {
    return {
      profiles: [],
      searchQuery: "",
      isLoading: false,
      errorMessage: "",
      selectedProfile: null,
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
        // const response = await fetch("http://localhost:8080/api/customers");
        const response = await fetch(
          "https://internshipproject-tienb2b.onrender.com/api/customers"
        );
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
        // const response = await fetch("http://localhost:8080/api/customers",
        const response = await fetch(
          "https://internshipproject-tienb2b.onrender.com/api/customers",

          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(profile),
          }
        );
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
          // `http://localhost:8080/api/customers/${profile._id}`,
          `https://internshipproject-tienb2b.onrender.com/api/customers/${profile._id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(profile),
          },
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
    handleSelectProfile(profile) {
      this.selectedProfile = profile;
    },
    updateProfile(updatedProfile) {
      const index = this.profiles.findIndex(
        (profile) => profile._id === updatedProfile._id
      );
      if (index !== -1) {
        this.profiles.splice(index, 1, updatedProfile);
      }
      this.selectedProfile = null;
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
      <label for="searchQuery">Search Profiles:</label>
      <input
        type="text"
        id="searchQuery"
        name="searchQuery"
        v-model="searchQuery"
        placeholder="Search profiles..."
        autocomplete="off"
        @keyup.enter="handleSearchInput"
      />
    </header>
    <main>
      <AddProfile @add-profile="addProfile" />
      <ProfileList
        :profiles="filteredProfiles"
        @delete-profile="deleteProfile"
        @select-profile="handleSelectProfile"
      />
      <div v-if="isLoading" class="loading">Loading profiles...</div>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </main>

    <EditProfile
      v-if="selectedProfile"
      :profile="selectedProfile"
      @profile-updated="updateProfile"
      @close="selectedProfile = null"
    />
    <div v-if="!filteredProfiles.length && !isLoading && !errorMessage">
      <p>No profiles found.</p>
    </div>
  </div>
</template>
