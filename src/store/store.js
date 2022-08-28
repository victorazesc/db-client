import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
let webRoute = "";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

if (window.location.hostname === "localhost") {
  axios.defaults.baseURL = "http://" + window.location.hostname + ":8000/api";
  webRoute = "http://" + window.location.hostname + ":8000/";
} else {
  axios.defaults.baseURL = "https://db.azevedoseg.com/api/";
  webRoute = "https://db.azevedoseg.com/";
}

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem("access_token") || null,
    products: [],
    clients: [],
    helps: [],
    logs: [],
    os: [],
    client: [],
    notification: {},
    notifications: [],
    notificationsList: [],
    services: [],
    certificates: [],
    receipts: [],
    dashboard: [],
    user: [],
    files: [],
    topBarNotifications: [],
  },

  getters: {
    notification(state) {
      return state.notification;
    },
    notifications(state) {
      return state.notifications;
    },
    topBarNotifications(state) {
      return state.topBarNotifications;
    },
    notificationsList(state) {
      return state.notificationsList;
    },
    isLoggedIn(state) {
      return state.token;
    },
    products(state) {
      return state.products;
    },
    helps(state) {
      return state.helps;
    },
    logs(state) {
      return state.logs;
    },
    clients(state) {
      return state.clients;
    },
    os(state) {
      return state.os;
    },
    client(state) {
      return state.client;
    },
    product(state) {
      return state.product;
    },
    services(state) {
      return state.services;
    },
    receipts(state) {
      return state.receipts;
    },
    dashboard(state) {
      return state.dashboard;
    },
    certificates(state) {
      return state.certificates;
    },
    user(state) {
      return state.user;
    },
    cep(state) {
      return state.cep;
    },
    files(state) {
      return state.files;
    },
  },
  mutations: {
    getCep(state, cep) {
      state.cep = cep;
    },
    alterTopbarNotifications(state, notification) {
      for (let i in state.notifications) {
        if (state.notifications[i].id === notification.id) {
          if (notification.status === 0) {
            state.notifications.splice(i, 1);
          }
        }
      }

      if (notification.status === 1) {
        state.notifications.unshift(notification);
      }
    },
    retrieveToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null;
    },
    getProducts(state, products) {
      state.products = products;
    },
    getClients(state, clients) {
      state.clients = clients;
    },
    getOs(state, os) {
      state.os = os;
    },
    getClientById(state, client) {
      state.client = client;
    },
    getProductById(state, product) {
      state.product = product;
    },
    getServices(state, services) {
      state.services = services;
    },
    getCertificates(state, certificates) {
      state.certificates = certificates;
    },
    getReceipts(state, receipts) {
      state.receipts = receipts;
    },
    getDashboard(state, dashboard) {
      state.dashboard = dashboard;
    },
    getUser(state, user) {
      state.user = user;
    },
    getLogs(state, logs) {
      state.logs = logs;
    },
    getHelps(state, helps) {
      state.helps = helps;
    },
    getNotifications(state, notifications) {
      state.notifications = notifications;
    },
    setNotifications(state, notifications) {
      state.notifications = notifications;
    },
    setNotificationsList(state, notificationsList) {
      state.notificationsList = notificationsList;
    },
    openNotification(state, notification) {
      state.notification = notification;
    },
    getFiles(state, files) {
      state.files = files;
    },
  },
  actions: {
    contact(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            "/send-email?email=" +
              data.email +
              "& name=" +
              data.name +
              "&message=" +
              data.message
          )
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/Auth/register", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    sendHelp(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/send-help", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    addHelp(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/add-help", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    editHelp(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/edit-help", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteHelp(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/delete-help", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    responseHelpQuestion(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/response-help", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getProfiles() {
      return new Promise((resolve, reject) => {
        axios
          .get("/profiles")
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getLogs(context, params) {
      return new Promise((resolve, reject) => {
        axios
          .get("/logs", { params })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getHelps(context, data) {
      return new Promise((resolve, reject) => {
        if (data && data.page) {
          axios
            .get("/helps?page=" + data.page)
            .then((response) => {
              context.commit("getHelps", response.data);
              resolve(response.data);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          axios
            .get("/helps", data)
            .then((response) => {
              context.commit("getHelps", response.data);
              resolve(response.data);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    },

    destroyToken(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;

      if (context.getters.isLoggedIn) {
        return new Promise((resolve, reject) => {
          axios
            .post("/Auth/logout")
            .then((response) => {
              localStorage.removeItem("access_token");
              context.commit("destroyToken");
              resolve(response);
            })
            .catch((error) => {
              localStorage.removeItem("access_token");
              context.commit("destroyToken");
              reject(error);
            });
        });
      }
    },

    getUser(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .get("/user")
          .then((response) => {
            context.commit("getUser", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    openNotification(context, data) {
      context.commit("openNotification", data);
    },

    getNotificationsList(context, page) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        if (page) {
          axios
            .get("/get-notifications-list?page=" + page.page)
            .then((response) => {
              resolve(response.data);
              context.commit("setNotificationsList", response.data);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          axios
            .get("/get-notifications-list")
            .then((response) => {
              resolve(response.data);
              context.commit("setNotifications", response.data);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    },

    alterStatusNotification(context, data) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .post("/alter-status-notification", data)
          .then((response) => {
            context.commit("alterTopbarNotifications", data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getNotifications(context, data) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        if (data.page) {
          axios
            .get("/get-notifications?page=" + data.page)
            .then((response) => {
              resolve(response.data);
            })
            .catch((error) => {
              reject(error);
            });
        } else if (data.topbar) {
          axios
            .get("/get-notifications?topbar=true")
            .then((response) => {
              resolve(response.data);
              context.commit("setNotifications", response.data);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    },

    getCertificates(context, page) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        if (page) {
          axios
            .get("/certificates?page=" + page.page)
            .then((response) => {
              resolve(response.data);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          axios
            .get("/certificates")
            .then((response) => {
              resolve(response.data);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    },

    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("/Auth/login", {
            email: credentials.email,
            password: credentials.password,
          })

          .then((response) => {
            const token = response.data.access_token;
            localStorage.setItem("access_token", token);
            context.commit("retrieveToken", token);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },

    getProducts(context, page) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;

      if (page) {
        axios
          .get("/products?page=" + page.page)
          .then((response) => {
            context.commit("getProducts", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .get("/products")
          .then((response) => {
            context.commit("getProducts", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    addCertificate(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/addCertificate", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editCertificate(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/editCertificate", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteCertificate(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/deleteCertificate", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteService(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/deleteService", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteOs(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/deleteOs/${data}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    downloadPdf(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .get(webRoute + "generatePdf", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    osPdf(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .get(webRoute + "os-viewPdf", { params: data })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteFile(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/deleteFile", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    clearLogs(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/clearLogs", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    filter(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .get("/" + data.apiUrl, { params: data })
          .then((response) => {
            resolve(response);
            context.commit(
              "get" + capitalizeFirstLetter(data.apiUrl),
              response.data
            );
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getProductById(context, data) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve) => {
        axios
          .get("/product?id=" + data)
          .then((response) => {
            context.commit("getProductById", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },

    updateService(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/editService", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    editProduct(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/editProduct", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    editUser(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/editUser", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteUser(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/deleteUser", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    resetPassword(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/resetPassword", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    changePassword(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/change-password", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getAuth(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      axios
        .get("/isAuth")
        .then((response) => {
          context.commit("getAuth", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getClients(context, page) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;

      if (page) {
        axios
          .get("/clients?page=" + page.page)
          .then((response) => {
            context.commit("getClients", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .get("/clients")
          .then((response) => {
            context.commit("getClients", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    getAllClients(context, data) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve) => {
        axios
          .get("/clients?all=true&data=" + data)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },

    getAllServices(context, data) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve) => {
        axios
          .get("/services?all=true", { params: data })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },

    getAllUsers(context, data) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve) => {
        axios
          .get("/users?all=true&data=" + data)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },

    getStatusOs(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve) => {
        axios
          .get("/getStatusOs")
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },

    addOs(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/add-os", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getOs(context, page) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;

      if (page) {
        axios
          .get("/os?page=" + page.page)
          .then((response) => {
            context.commit("getOs", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .get("/os")
          .then((response) => {
            context.commit("getOs", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    getOsById(context, data) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .get("/os/" + data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getClientById(context, data) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;

      axios
        .get("/client?id=" + data)
        .then((response) => {
          context.commit("getClientById", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editClient(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/editClient", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    editOs(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/editOs", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    addProduct(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/addProduct", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    addService(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/addService", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    addClient(context, data) {
      console.log(data);
      return new Promise((resolve, reject) => {
        axios
          .post("/addClient", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    uploadFile(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/store-file", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getFiles(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      axios.get("/store-file").then((response) => {
        context.commit("getFiles", response.data);
      });
    },

    deleteClient(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/deleteClient", {
            id: data.id,
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getServices(context, page) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;

      if (page) {
        axios
          .get("/services?page=" + page.page)
          .then((response) => {
            context.commit("getServices", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .get("/services")
          .then((response) => {
            context.commit("getServices", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    getReceipts(context, page) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;

      if (page) {
        axios
          .get("/receipts?page=" + page.page)
          .then((response) => {
            context.commit("getReceipts", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .get("/receipts")
          .then((response) => {
            context.commit("getReceipts", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    getDashboard(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;

      axios
        .get("/dashboard")
        .then((response) => {
          context.commit("getDashboard", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
