const { contextBridge, ipcRenderer } = require("electron");
const axios = require("axios");

const url = "http://212.1.213.32:8080";

contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel, title, body) => {
    const validChannels = ["send-notification"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, { title, body });
    }
  },
});
/*
contextBridge.exposeInMainWorld("guarderia", {
  getById: async (id) => {
    try {
      // Realizar la petición GET con Axios
      const response = await axios.get(`${url}/guarderia/${id}`);
      // Manejar la respuesta
      return response.data; // Devuelve los datos al renderizador
    } catch (error) {
      console.error("Error en la petición GET:", error);
      return { error: "Error en la petición" }; // Maneja el error
    }
  },
  getAll: async () => {
    try {
      // Realizar la petición GET con Axios
      const response = await axios.get(`${url}/guarderia/all`);
      // Manejar la respuesta
      return response.data; // Devuelve los datos al renderizador
    } catch (error) {
      console.error("Error en la petición GET:", error);
      return { error: "Error en la petición" }; // Maneja el error
    }
  },
  add: async (guarderiaJson) => {
    try {
      // Realizar la petición GET con Axios
      const response = await axios.post(`${url}/guarderia/add`, guarderiaJson);

      // Manejar la respuesta
      return response.data; // Devuelve los datos al renderizador
    } catch (error) {
      console.error("Error en la petición GET:", error);
      return { error: "Error en la petición" }; // Maneja el error
    }
  },
});*/

contextBridge.exposeInMainWorld("authentication", {
  login: async (username, password) => {
    try {
      const user = { username: username, password: password };
      const response = await axios.post(`${url}/auth/login`, user);
      return response.data;
    } catch (error) {
      return error;
    }
  },
});
/*
contextBridge.exposeInMainWorld("documento", {
  modifica: async () => {
    try {
      const reponst = await axios.post;
    } catch (error) {}
  },
  getAll: async () => {
    try {
      const reponst = await axios.post;
    } catch (error) {}
  },
});

contextBridge.exposeInMainWorld("contrato", {
  getById: async () => {
    try {
      const reponst = await axios.post;
    } catch (error) {}
  },
});*/
