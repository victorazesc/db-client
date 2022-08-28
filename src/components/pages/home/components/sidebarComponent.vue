<template>
  <div>

    <b-sidebar class="visible-xs" id="sidebar-backdrop-notifications" :backdrop-variant="variant" backdrop shadow
      no-header-close>
      <div class="logo">
        <img src="../../../../../static/logo.svg" alt="">
      </div>
      <div class="sidebar-menu">
        <ul>
          <li>
            <b-card v-for="(notification, index) in notifications" :key="index" no-body img-left style="align-content: center; align-items: center; padding: 5px;
    border: none; border-bottom: 1px solid #ededed !important;" @click.prevent="readNotification(notification)">
              <div class="notification-image" style="padding-left: 10px;">
                <img width="40x" :src="notification.icon | icon" alt="">
              </div>
              <div style="padding-left: 10px; line-height: 20px;">
                <p style="margin-bottom: 0px;">{{ notification.subject }}</p>
                <small>{{ notification.message }}</small>
              </div>
            </b-card>

            <p v-if="notifications.length < 1"> Você não possui nenhuma notificação recente</p>
          </li>

          <div v-if="notifications.length > 0">
            <router-link to="/notifications" class="btn btn-dark btn-block" block>Ver Todas</router-link>
          </div>

        </ul>

      </div>
    </b-sidebar>

    <b-sidebar class="visible-xs" id="sidebar-backdrop1" :backdrop-variant="variant" backdrop shadow no-header-close>
      <div class="logo">
        <img src="../../../../../static/logo.svg" alt="">
      </div>
      <div class="sidebar-menu">
        <ul>
          <li>
            <b-card class="text-center" border-variant="white">
              <b-card-body border-variant="white">
                <div>
                  <b-skeleton animation="wave" width="85%"></b-skeleton>
                  <b-skeleton animation="wave" width="55%"></b-skeleton>
                  <b-skeleton animation="wave" width="70%"></b-skeleton>
                </div>
              </b-card-body>
              <b-card-body border-variant="white">
                <div>
                  <b-skeleton animation="wave" width="85%"></b-skeleton>
                  <b-skeleton animation="wave" width="55%"></b-skeleton>
                  <b-skeleton animation="wave" width="70%"></b-skeleton>
                </div>
              </b-card-body>
            </b-card>
          </li>
        </ul>

      </div>
    </b-sidebar>

    <b-sidebar id="sidebar-backdrop" :backdrop-variant="variant" backdrop shadow no-header-close>
      <div class="logo">
        <img src="../../../../../static/logo.svg" alt="">
      </div>
      <div class="sidebar-menu">
        <ul>
          <li>
            <router-link :to="{ name: 'dashboard' }"><i class="fa fa-bolt"></i>Dashboard</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'clients' }"><i class="fa fa-users"></i>Clientes</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'services' }"><i class="fa fa-shopping-cart"></i>Serviços</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'proposal' }"><i class="fa fa-scroll"></i>Propostas</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'certificates' }"><i class="fa fa-bell"></i>Certidões</router-link>
          </li>
          <li>
            <router-link to="/help"><i class="fa fa-question-circle"></i>Ajuda e Suporte</router-link>
          </li>
        </ul>
        <div class="sidebar-separated" v-if="user.profile_id === 1">
          <span>Acesso Administrativo</span>
          <hr>
        </div>
        <ul v-if="user.profile_id === 1">
          <li>
            <router-link :to="{ name: 'users' }"><i class="fa fa-users"></i>Usuários</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'profiles' }"><i class="fa fa-user-shield"></i>Perfis</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'logs' }"><i class="fa fa-user-shield"></i>Logs</router-link>
          </li>

        </ul>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "sidebarComponent",
  data() {
    return {
      variant: 'dark',
      profile: '',
      variants: [
        'transparent',
        'white',
        'light',
        'dark',
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
      ]
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      notifications: state => state.notifications,
    })
  },

  methods: {
    readNotification(data) {
      if (data.link === this.$route.path) {
        return false
      } else {
        this.$router.push(data.link + '?id=' + data.ref_id)
        console.log(this.$route.path)
      }
    }
  },
  created() {

  }
}
</script>

<style lang="scss" src="./../style.scss" scoped>
</style>