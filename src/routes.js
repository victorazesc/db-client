import Login from "./components/pages/auth/loginComponent";
import landing from "./components/pages/landing/landing";
import about from "./components/pages/landing/about";
import landing_services from "./components/pages/landing/services";
import contact from "./components/pages/landing/contact";
import logs from "./components/pages/logs/logs";
import Dashboard from "./components/pages/dashboard/dashboardComponent";
import certificates from "./components/pages/certificates/certificatesComponent";
import notifications from "./components/pages/notifications/notificationComponent";
import Home from "./components/pages/home/homeComponent";
import Os from "./components/pages/os/osComponent";
import Help from "./components/pages/help/helpComponent";
import HelpPublic from "./components/pages/landing/help";
import osCreate from "./components/pages/os/create";
import osEdit from "./components/pages/os/edit";
import notfound from "./components/404";
import osView from "./components/pages/os/view";
import Products from "./components/pages/products/productsComponent";
import ProductsView from "./components/pages/products/view";
import ProductsEdit from "./components/pages/products/edit";
import Clients from "./components/pages/clients/clientsComponent";
import Users from "./components/pages/users/usersComponent";
import Profiles from "./components/pages/profiles/profilesComponent";
import profile from "./components/pages/profile/profileComponent";
import ClientsView from "./components/pages/clients/view";
import ClientsEdit from "./components/pages/clients/edit";
import Services from "./components/pages/services/servicesComponent";
import Receipts from "./components/pages/receipts/receiptsComponent";
import Logout from "./components/pages/auth/logoutComponent";
import Register from "./components/pages/auth/registerComponent";

const routes = [
  {
    path: "/",
    name: "landing",
    component: landing,
  },
  {
    path: "/sobre",
    name: "about",
    component: about,
  },
  {
    path: "/servicos",
    name: "landing-services",
    component: landing_services,
  },
  {
    path: "/contato",
    name: "contact",
    component: contact,
  },
  {
    path: "/ajuda",
    name: "help",
    component: HelpPublic,
  },

  {
    path: "/home",
    name: "home",
    component: Home,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {
          requiresAuth: true,
        },
      },

      {
        path: "/products",
        component: Products,
        children: [
          {
            path: "/",
            component: Products,
            name: "products",
            meta: {
              requiresAuth: true,
              title: "Tabela de produtos",
              mobileTitle: "Produtos",
              description: "Versão Beta",
            },
          },
        ],
      },
      {
        path: "/products/:id",
        name: "ProductsView",
        component: ProductsView,
        meta: {
          title: "Visualização de produto",
          description: "Versão Beta",
          requiresAuth: true,
        },
      },
      {
        path: "/products/edit/:id",
        name: "ProductsEdit",
        component: ProductsEdit,
        meta: {
          title: "Edição de Produto",
          description: "Versão Beta",
          requiresAuth: true,
        },
      },

      {
        path: "/clients",
        component: Clients,
        children: [
          {
            path: "/",
            component: Clients,
            name: "clients",
            meta: {
              requiresAuth: true,
              title: "Tabela de Clientes",
              mobileTitle: "Clientes",
              description: "Versão Beta",
            },
          },
        ],
      },
      {
        path: "/user",
        component: Users,
        children: [
          {
            path: "/",
            component: Users,
            name: "users",
            meta: {
              requiresAuth: true,
              title: "Tabela de Usuarios",
              mobileTitle: "Usuarios",
              description: "Versão Beta",
            },
          },
        ],
      },
      {
        path: "/profiles",
        component: Profiles,
        children: [
          {
            path: "/",
            component: Profiles,
            name: "profiles",
            meta: {
              requiresAuth: true,
              title: "Tabela de Perfis",
              mobileTitle: "Perfis",
              description: "Versão Beta",
            },
          },
        ],
      },
      {
        path: "/clients/:id",
        name: "clientsView",
        component: ClientsView,
        meta: {
          title: "Visualização de Cliente",
          description: "Versão Beta",
          requiresAuth: true,
        },
      },
      {
        path: "/clients/edit/:id",
        name: "ClientsEdit",
        component: ClientsEdit,
        meta: {
          title: "Edição de Cliente",
          description: "Versão Beta",
          requiresAuth: true,
        },
      },

      {
        path: "/services",
        name: "services",
        component: Services,
        meta: {
          title: "Tabela de Serviços",
          mobileTitle: "Serviços",
          description: "Versão Beta",
          requiresAuth: true,
        },
      },
      {
        path: "/help",
        name: "helpAndSupport",
        component: Help,
        meta: {
          title: "Ajuda e Suporte",
          mobileTitle: "Ajuda",
          description: "Versão Beta",
          requiresAuth: true,
        },
      },
      {
        path: "/notifications",
        name: "notifications",
        component: notifications,
        meta: {
          title: "Notificações",
          mobileTitle: "Notificações",
          description: "Versão Beta",
          requiresAuth: true,
        },
      },

      {
        path: "/receipts",
        name: "receipts",
        component: Receipts,
        meta: {
          requiresAuth: true,
        },
      },

      {
        path: "/certificates",
        name: "certificates",
        component: certificates,
        meta: {
          title: "Registros de Certidões",
          mobileTitle: "Certidões",
          description: "Versão Beta",
          requiresAuth: true,
        },
      },

      {
        path: "/proposal",
        component: Os,
        children: [
          {
            path: "/",
            component: Os,
            name: "proposal",
            meta: {
              requiresAuth: true,
              title: "Tabela de Ordens de Serviço",
              mobileTitle: "Os",
              description: "Versão Beta",
            },
          },
        ],
      },
      {
        path: "/proposal/create",
        name: "osCreate",
        component: osCreate,
        meta: {
          title: "Cadastrar Ordem de Serviço",
          description: "Versão Beta",
          requiresAuth: true,
        },
      },
      {
        path: "/proposal/:id",
        name: "osView",
        component: osView,
        meta: {
          title: "Visualização de Os",
          description: "Versão Beta",
          requiresAuth: true,
        },
      },
      {
        path: "/proposal/edit/:id",
        name: "osEdit",
        component: osEdit,
        meta: {
          title: "Edição de Cliente",
          description: "Versão Beta",
          requiresAuth: true,
        },
      },

      {
        path: "/logout",
        name: "logout",
        component: Logout,
        meta: {
          requiresAuth: true,
        },
      },

      {
        path: "/logs",
        name: "logs",
        component: logs,
        meta: {
          title: "Logs de Modificaçoes",
          mobileTitle: "Logs",
          description: "Versão Beta",
          requiresAuth: true,
        },
      },

      {
        path: "/my-profile",
        name: "my-profile",
        component: profile,
        meta: {
          title: "Meu perfil",
          mobileTitle: "Perfil",
          description: "Versão Beta",
          requiresAuth: true,
        },
      },
    ],
  },

  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: "*",
    name: "404",
    component: notfound,
    meta: {
      requiresVisitor: true,
    },
  },
];

export default routes;
