import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || null,
    contacts: [],
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
    getContacts: (state) => state.contacts,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_CONTACTS(state, contacts) {
      state.contacts = contacts;
    },
    ADD_CONTACT(state, contact) {
      state.contacts.push(contact);
    },
    UPDATE_CONTACT(state, updatedContact) {
      const index = state.contacts.findIndex(
        (c) => c._id === updatedContact._id
      );
      if (index !== -1) {
        state.contacts.splice(index, 1, updatedContact);
      }
    },
    DELETE_CONTACT(state, id) {
      state.contacts = state.contacts.filter((contact) => contact._id !== id);
    },
    LOGOUT(state) {
      state.token = "";
      state.user = null;
      state.contacts = [];
    },
  },
  actions: {
    // Auth actions
    async register({ commit }, userData) {
      const response = await axios.post("/api/users/register", userData);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        commit("SET_TOKEN", response.data.token);
        commit("SET_USER", response.data.user);
      }

      return response;
    },

    async login({ commit }, userData) {
      const response = await axios.post("/api/users/login", userData);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        commit("SET_TOKEN", response.data.token);
        commit("SET_USER", response.data.user);
      }

      return response;
    },

    logout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      commit("LOGOUT");
    },

    // Contact actions
    async fetchContacts({ commit, state }) {
      const response = await axios.get("/api/contacts", {
        headers: { "x-auth-token": state.token },
      });

      commit("SET_CONTACTS", response.data);
      return response;
    },

    async getContact({ state }, id) {
      return await axios.get(`/api/contacts/${id}`, {
        headers: { "x-auth-token": state.token },
      });
    },

    async createContact({ commit, state }, contactData) {
      const response = await axios.post("/api/contacts", contactData, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": state.token,
        },
      });

      commit("ADD_CONTACT", response.data);
      return response;
    },

    async updateContact({ commit, state }, { id, contactData }) {
      const response = await axios.put(`/api/contacts/${id}`, contactData, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": state.token,
        },
      });

      commit("UPDATE_CONTACT", response.data);
      return response;
    },

    async deleteContact({ commit, state }, id) {
      await axios.delete(`/api/contacts/${id}`, {
        headers: { "x-auth-token": state.token },
      });

      commit("DELETE_CONTACT", id);
    },

    async addInteraction({ commit, state }, { contactId, interactionData }) {
      const response = await axios.post(
        `/api/contacts/${contactId}/interactions`,
        interactionData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": state.token,
          },
        }
      );

      commit("UPDATE_CONTACT", response.data);
      return response;
    },
  },
});
