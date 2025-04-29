<template>
  <div class="add-profile">
    <div class="form-card">
      <h2>Thêm khách hàng mới</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Họ tên</label>
          <input
            type="text"
            id="name"
            v-model="profile.name"
            placeholder="Nhập họ tên"
            required
            :class="{ 'error': formErrors.name }"
          />
          <span class="error-message" v-if="formErrors.name">{{ formErrors.name }}</span>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="profile.email"
            placeholder="Nhập email"
            required
            :class="{ 'error': formErrors.email }"
          />
          <span class="error-message" v-if="formErrors.email">{{ formErrors.email }}</span>
        </div>

        <div class="form-group">
          <label for="phone">Số điện thoại</label>
          <input
            type="tel"
            id="phone"
            v-model="profile.phone"
            placeholder="Nhập số điện thoại"
            required
            :class="{ 'error': formErrors.phone }"
          />
          <span class="error-message" v-if="formErrors.phone">{{ formErrors.phone }}</span>
        </div>

        <div class="form-group">
          <label for="address">Địa chỉ</label>
          <input
            type="text"
            id="address"
            v-model="profile.address"
            placeholder="Nhập địa chỉ"
          />
        </div>

        <div class="form-group">
          <label for="type">Loại khách hàng</label>
          <select id="type" v-model="profile.type">
            <option value="freelance">Freelance</option>
            <option value="partner">Đối tác</option>
            <option value="friend">Bạn bè</option>
            <option value="other">Khác</option>
          </select>
        </div>

        <div class="form-group">
          <label for="tags">Tags</label>
          <div class="tags-input">
            <input
              type="text"
              id="tagInput"
              v-model="tagInput"
              @keyup.enter="addTag"
              placeholder="Nhập tag và nhấn Enter"
            />
            <div class="tags-container">
              <span class="tag" v-for="(tag, index) in profile.tags" :key="index">
                {{ tag }}
                <span class="tag-remove" @click="removeTag(index)">&times;</span>
              </span>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="notes">Ghi chú</label>
          <textarea
            id="notes"
            v-model="profile.notes"
            rows="3"
            placeholder="Nhập ghi chú"
          ></textarea>
        </div>

        <div v-if="errorMessage" class="error-message general-error">
          {{ errorMessage }}
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="cancelForm">
            Hủy
          </button>
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <i class="fas fa-save"></i>
            {{ isSubmitting ? 'Đang lưu...' : 'Lưu' }}
          </button>
        </div>
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
        address: "",
        type: "other", // Giá trị mặc định
        tags: [],
        notes: ""
      },
      tagInput: "",
      formErrors: {
        name: '',
        email: '',
        phone: ''
      },
      errorMessage: '',
      isSubmitting: false
    };
  },
  watch: {
    'profile.name'() {
      this.formErrors.name = '';
      this.errorMessage = '';
    },
    'profile.email'() {
      this.formErrors.email = '';
      this.errorMessage = '';
    },
    'profile.phone'() {
      this.formErrors.phone = '';
      this.errorMessage = '';
    }
  },
  methods: {
    addTag() {
      const tag = this.tagInput.trim();
      if (tag && !this.profile.tags.includes(tag)) {
        this.profile.tags.push(tag);
      }
      this.tagInput = "";
    },
    removeTag(index) {
      this.profile.tags.splice(index, 1);
    },
    validateForm() {
      let isValid = true;
      this.resetErrors();

      // Kiểm tra tên (chỉ chữ cái và khoảng trắng, 3-50 ký tự)
      if (!this.profile.name) {
        this.formErrors.name = "Vui lòng nhập họ tên";
        isValid = false;
      } else if (!/^[A-Za-z\s]+$/.test(this.profile.name)) {
        this.formErrors.name = "Tên chỉ được chứa chữ";
        isValid = false;
      } else if (this.profile.name.length < 3 || this.profile.name.length > 50) {
        this.formErrors.name = "Tên phải có 3-50 ký tự";
        isValid = false;
      }

      // Kiểm tra email
      if (!this.profile.email) {
        this.formErrors.email = "Vui lòng nhập email";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.profile.email)) {
        this.formErrors.email = "Email không hợp lệ";
        isValid = false;
      }

      // Kiểm tra số điện thoại (chỉ số, 10-11 số)
      if (!this.profile.phone) {
        this.formErrors.phone = "Vui lòng nhập số điện thoại";
        isValid = false;
      } else if (!/^[0-9]+$/.test(this.profile.phone)) {
        this.formErrors.phone = "Số điện thoại chỉ được chứa số";
        isValid = false;
      } else if (this.profile.phone.length < 10 || this.profile.phone.length > 11) {
        this.formErrors.phone = "Số điện thoại phải có 10-11 số";
        isValid = false;
      }

      return isValid;
    },
    resetErrors() {
      this.formErrors = {
        name: '',
        email: '',
        phone: ''
      };
      this.errorMessage = '';
    },
    async submitForm() {
      if (!this.validateForm()) {
        this.errorMessage = "Vui lòng kiểm tra lại các trường bên dưới";
        return;
      }

      this.isSubmitting = true;
      try {
        // Thêm tag cuối cùng nếu còn đang nhập
        if (this.tagInput.trim()) {
          this.addTag();
        }
        
        this.$emit("add-profile", { ...this.profile });
        this.resetForm();
      } catch (error) {
        this.errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại.";
        console.error("Error submitting form:", error);
      } finally {
        this.isSubmitting = false;
      }
    },
    cancelForm() {
      this.resetForm();
      this.$emit("cancel");
    },
    resetForm() {
      this.profile = {
        name: "",
        email: "",
        phone: "",
        address: "",
        type: "other",
        tags: [],
        notes: ""
      };
      this.tagInput = "";
      this.resetErrors();
    },
  },
};
</script>

<style scoped>
.add-profile {
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.form-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.form-card h2 {
  color: #374151;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #374151;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.625rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.9rem;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.cancel-btn,
.submit-btn {
  padding: 0.5rem 1.25rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
  border: none;
}

.cancel-btn {
  background-color: #f3f4f6;
  color: #4b5563;
}

.cancel-btn:hover {
  background-color: #e5e7eb;
}

.submit-btn {
  background-color: #4f46e5;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.submit-btn:hover {
  background-color: #4338ca;
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.general-error {
  background-color: #fee2e2;
  border: 1px solid #dc2626;
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}

input.error {
  border-color: #dc2626;
}

input.error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Styles cho tags */
.tags-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  background-color: #e0e7ff;
  color: #4f46e5;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.875rem;
}

.tag-remove {
  cursor: pointer;
  margin-left: 0.25rem;
  font-weight: bold;
}

.tag-remove:hover {
  color: #dc2626;
}
</style>