<script>
import AddProfile from "./components/AddProfile.vue";
import ProfileList from "./components/ProfileList.vue";
import EditProfile from "./components/EditProfile.vue";
import Interactions from "./views/Interactions.vue";
export default {
  components: {
    AddProfile,
    ProfileList,
    EditProfile,
    Interactions,
  },
  data() {
    return {
      profiles: [],
      searchQuery: "",
      isLoading: false,
      errorMessage: "",
      selectedProfile: null,
      showAddForm: false,
      successMessage: "",
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
        const response = await fetch(
          "https://internshipproject-tienb2b.onrender.com/api/customers"
          // ||
          // "http://localhost:8080/api/customers"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();

        if (Array.isArray(data)) {
          this.profiles = data;
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        this.errorMessage = "Failed to fetch profiles. Please try again later.";
        console.error("Error fetching profiles:", error.message || error);
      } finally {
        this.isLoading = false;
      }
    },
    async addProfile(profile) {
      this.errorMessage = "";
      this.formErrors = {};

      try {
        const apiUrl =
          "https://internshipproject-tienb2b.onrender.com/api/customers/";

        const response = await fetch(`${apiUrl}/api/customers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        });

        const result = await response.json();

        if (!response.ok) {
          if (Array.isArray(result.errors)) {
            result.errors.forEach((error) => {
              this.formErrors[error.param] = error.msg;
            });
            this.errorMessage = "Vui lòng kiểm tra lại các trường bên dưới.";
          } else {
            this.errorMessage = result.message || "Không thể thêm profile.";
          }
          return;
        }

        // Cập nhật lại danh sách từ server để đảm bảo đồng bộ
        await this.fetchProfiles();
        this.showAddForm = false;

        this.successMessage = "Thêm khách hàng thành công!";
        setTimeout(() => {
          this.successMessage = "";
        }, 3000);
      } catch (error) {
        this.errorMessage = "Lỗi khi thêm profile. Vui lòng thử lại.";
        console.error("Error adding profile:", error);
      }
    },

    async deleteProfile(index) {
      const profile = this.profiles[index];
      this.errorMessage = "";
      try {
        const response = await fetch(
          `https://internshipproject-tienb2b.onrender.com/api/customers/${profile._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
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
    // update Profile
    async updateProfile(updatedProfile) {
      this.errorMessage = "";
      this.formErrors = {};

      if (!updatedProfile || !updatedProfile._id) {
        console.error("Không có _id trong updatedProfile:", updatedProfile);
        this.errorMessage = "Không thể cập nhật vì thiếu ID hồ sơ.";
        return;
      }

      try {
        const apiUrl = "https://internshipproject-tienb2b.onrender.com";
        const response = await fetch(
          `${apiUrl}/api/customers/${updatedProfile._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProfile),
          }
        );

        const result = await response.json();

        if (!response.ok) {
          if (Array.isArray(result.errors)) {
            result.errors.forEach((error) => {
              this.formErrors[error.param] = error.msg;
            });
            this.errorMessage = "Vui lòng kiểm tra lại các trường.";
          } else {
            this.errorMessage =
              result.message || "Không thể cập nhật thông tin.";
          }
          return;
        }

        // Sau khi cập nhật thành công, đồng bộ lại danh sách từ server
        await this.fetchProfiles();

        this.selectedProfile = null;
        this.successMessage = "Cập nhật thành công!";
        setTimeout(() => {
          this.successMessage = "";
        }, 3000);
      } catch (error) {
        console.error("Error updating profile:", error);
        this.errorMessage = "Lỗi khi cập nhật. Vui lòng thử lại.";
      }
    },

    handleSearchInput(event) {
      this.searchQuery = event.target.value;
    },
    handleSelectProfile(profile) {
      if (profile && profile._id) {
        this.selectedProfile = { ...profile };
      } else {
        console.error("Profile missing ID:", profile);
        this.errorMessage =
          "Không thể chỉnh sửa hồ sơ này vì thiếu thông tin ID";
      }
    },
    toggleAddForm() {
      this.showAddForm = !this.showAddForm;
    },
    handleProfileUpdated(updatedProfile) {
      console.log("Profile updated:", updatedProfile);
      // Cập nhật profile trong danh sách hiện tại
      const index = this.profiles.findIndex(
        (p) => p._id === updatedProfile._id
      );
      if (index !== -1) {
        // Cập nhật profile trong mảng
        this.profiles.splice(index, 1, updatedProfile);
      }

      // Hiển thị thông báo thành công
      this.successMessage = "Cập nhật thông tin khách hàng thành công!";
      setTimeout(() => {
        this.successMessage = "";
      }, 3000);

      // Đồng bộ lại toàn bộ danh sách từ server sau khi cập nhật
      this.fetchProfiles();
    },
    // Kiểm tra xem có profile đã cập nhật trong localStorage không
    checkForUpdatedProfile() {
      const updatedProfileJSON = localStorage.getItem("updatedProfile");
      if (updatedProfileJSON) {
        try {
          const updatedProfile = JSON.parse(updatedProfileJSON);
          console.log("Found updated profile in localStorage:", updatedProfile);

          // Cập nhật profile trong danh sách hiện tại
          const index = this.profiles.findIndex(
            (p) => p._id === updatedProfile._id
          );
          if (index !== -1) {
            // Cập nhật profile trong mảng
            this.profiles.splice(index, 1, updatedProfile);
          }

          // Hiển thị thông báo thành công
          this.successMessage = "Cập nhật thông tin khách hàng thành công!";
          setTimeout(() => {
            this.successMessage = "";
          }, 3000);

          // Xóa dữ liệu khỏi localStorage sau khi đã cập nhật
          localStorage.removeItem("updatedProfile");

          // Đồng bộ lại toàn bộ danh sách từ server
          this.fetchProfiles();
        } catch (error) {
          console.error(
            "Error parsing updated profile from localStorage:",
            error
          );
        }
      }
    },
  },
  mounted() {
    this.fetchProfiles();

    // Kiểm tra profile đã cập nhật khi component được mount
    this.checkForUpdatedProfile();
  },
  // Add router afterEach hook to check for updated profile after navigation
  watch: {
    $route(to, from) {
      // Nếu đang quay lại từ trang edit-customer, kiểm tra localStorage
      if (from.path.includes("/edit-customer/") && to.path === "/customers") {
        this.checkForUpdatedProfile();
      }
    },
  },
};
</script>

<template>
  <div id="app">
    <header>
      <div class="header-content">
        <h1>Customer Management</h1>
        <div class="header-actions">
          <router-link
            to="/dashboard"
            class="dashboard-link"
            custom
            v-slot="{ navigate, isActive }"
            v-if="$route.path !== '/dashboard'"
          >
            <div @click="navigate" :class="['nav-item', { active: isActive }]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
              <span>Dashboard</span>
            </div>
          </router-link>
          <!-- Thêm nút Search -->
          <div class="search-bar" v-if="$route.path !== '/dashboard'">
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search customers..."
              v-model="searchQuery"
              @input="handleSearch"
            />
          </div>

          <!-- Thêm điều kiện khi ở trang dashboard thì ẩn hiển thị nút "Add New Customer"  -->
          <button
            class="add-customer-btn"
            @click="toggleAddForm"
            v-if="$route.path !== '/dashboard'"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              viewBox="0 0 24 24"
              class="btn-icon"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add New Customer
          </button>
        </div>
      </div>
    </header>
    <main>
      <router-view
        v-if="
          $route.path === '/dashboard' ||
          $route.path.includes('/interactions/') ||
          $route.path.includes('/edit-customer/') ||
          $route.path.includes('/interactions-all/')
        "
      ></router-view>

      <div v-else>
        <AddProfile
          v-if="showAddForm"
          @add-profile="addProfile"
          @cancel="toggleAddForm"
        />

        <ProfileList
          v-if="!showAddForm"
          :profiles="filteredProfiles"
          @delete-profile="deleteProfile"
          @select-profile="handleSelectProfile"
        />

        <div v-if="isLoading" class="loading">Loading profiles...</div>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

        <div
          v-if="
            !filteredProfiles.length &&
            !isLoading &&
            !errorMessage &&
            !showAddForm
          "
        >
          <p>No profiles found.</p>
        </div>
      </div>
    </main>

    <EditProfile
      v-if="selectedProfile"
      :profile="selectedProfile"
      @profile-updated="updateProfile"
      @close="selectedProfile = null"
    />

    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
  </div>
</template>

<style scoped>
.header-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.add-customer-btn {
  display: flex;
  align-items: center;
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

.add-customer-btn:hover {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
}
</style>
