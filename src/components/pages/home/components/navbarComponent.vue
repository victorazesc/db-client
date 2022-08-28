<template>
  <div>
    <SpinnerComponent v-if="spinner" />
    <b-navbar toggleable="lg">
      <b-navbar-nav>
        <b-nav-item v-if="getUser && getUser.profile_id" href="#" v-b-toggle.sidebar-backdrop>
          <i class="fa fa-bars"></i>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">

        <b-nav-item class="d-block" v-if="$resize && $mq.below(750) && getUser.profile_id" href="#"
          v-b-toggle.sidebar-backdrop-notifications>
          <i class="fa fa-bell"></i><span class="badge bg-danger" v-if="notifications && notifications.length">{{
              notifications.length
          }}</span>
        </b-nav-item>

        <b-nav-item-dropdown v-if="$resize && $mq.above(750) && getUser.profile_id" class="d-none d-sm-block"
          style="max-width:350px" no-caret toggle-class="nav-link-custom" right>
          <template #button-content>
            <i class="fa fa-bell"></i><span class="badge bg-danger">{{ notifications.length > 0 ? notifications.length :
                notifications.length > 9 ? '9+' : ''
            }}</span>
          </template>

          <b-dropdown-item v-for="(notification, index) in notifications" :key="index"
            style="border-bottom: 1px solid #ededed;" class="notification">
            <b-row>
              <b-card no-body border-variant="white" img-left style="align-content: center; align-items: center;"
                @click.prevent="readNotification(notification)">
                <div class="notification-image fa-3x">
                  <img width="40x" :src="notification.icon | icon" alt="">
                </div>
                <div style="padding-left: 10px; line-height: 20px;">
                  <p style="margin-bottom: 0px;">{{ notification.subject }}</p>
                  <small>{{ notification.message }}</small>
                </div>
              </b-card>
            </b-row>
          </b-dropdown-item>

          <b-dropdown-item href="#" v-if="notifications.length < 1">Você não possui nenhuma notificação recente
          </b-dropdown-item>

          <b-dropdown-item href="#">
            <router-link to="/notifications" class="btn btn-dark btn-block">Ver Todas</router-link>
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown no-caret right>
          <template #button-content>
            <b-skeleton v-if="!getUser.profile_photo_url" animation="throb" type="avatar"></b-skeleton>
            <b-avatar v-else :src="getUser.profile_photo_url" size="3rem"></b-avatar>

          </template>
          <b-dropdown-item v-if="getUser && getUser.profile_id"
            @click.prevent="$router.replace({ name: 'my-profile' })">Meu Perfil</b-dropdown-item>
          <b-dropdown-item @click.prevent="loggout()">Sair</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-navbar>
  </div>

</template>

<script>

import SpinnerComponent from '../../../spinnerComponent.vue';


export default


  {
    name: "navbarComponent",
    components: {
      SpinnerComponent,
    },
    data() {

      return {
        spinner: false,
        dropdown: false,
        props: ['sidebarToggled']


      }
    },
    computed: {

      notifications() {
        return this.$store.getters.notifications
      },

      getUser() {
        return this.$store.getters.user
      }

    },
    methods: {
      loggout() {
        this.spinner = true
        this.$store.dispatch('destroyToken').then(response => {

          if (response.status === 200) {
            this.$router.push({ name: 'login' })
          }

        })
      },

      lauchDropdown() {
        this.dropdown = !this.dropdown
      },

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
      this.$store.dispatch('getNotifications', { topbar: true })
    }
  }

</script>

<style lang="scss" src="./../style.scss" scoped>
</style>