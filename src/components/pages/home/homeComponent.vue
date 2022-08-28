<template>
  <div class="main">
    <div class="sidebar">
      <sidebarComponent v-if="getUser.profile_id"></sidebarComponent>
    </div>
    <div class="content-right">

      <navbarComponent></navbarComponent>

      <div class="pages">
        <h1 v-if="loaded && getUser && !getUser.profile_id">Contate um administrador para solicitar acesso <a href="#"
            @click="loggout()">Sair</a>
        </h1>
        <router-view v-else />
      </div>
    </div>
  </div>
</template>

<script>

import sidebarComponent from "./components/sidebarComponent";
import navbarComponent from "./components/navbarComponent";

export default {

  name: "homeComponent",
  components: {
    sidebarComponent,
    navbarComponent,

  },

  data() {
    return {
      loaded: false,
    }
  },

  computed: {
    getUser() {
      return this.$store.getters.user
    }
  },
  methods: {
    loggout() {
      this.spinner = true

      this.$store.dispatch('destroyToken').then(response => {

        if (response.status === 200) {
          // return false
          this.$router.push({ name: 'login' })
        }

      })
    }
  },
  mounted() {
    this.$store.dispatch('getUser').then(() => {
      this.loaded = true
    })
  }
}
</script>

<style lang="scss" src="./style.scss" scoped>
</style>
