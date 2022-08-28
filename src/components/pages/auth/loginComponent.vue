<template>

  <div class="main">

    <SpinnerComponent v-if="spinner" />

    <b-toast id="my-toast" variant="warning" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">Oops!</strong>
          <small class="text-muted mr-2">42 seconds ago</small>
        </div>
      </template>
      This is the content of the toast.
      It is short and to the point.
    </b-toast>

    <div class="login area">
      <div class="content-login">
        <header class="logo">
          <img src="../../../../static/logo.svg" alt="" width="80px" />
        </header>
        <div class="form">
          <form @submit.prevent="login">
            <div class="form-group">
              <input type="email" name="email" id="email" class="form-control" placeholder="E-mail" v-model="email" />
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="Senha" name="password" id="password"
                v-model="password" />
              <small id="emailHelp" class="form-text text-muted">Nunca compartilhe sua senha com estranhos.</small>
            </div>
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">Lembrar de Mim</label>
            </div>
            <div class="buttons">
              <b-button block size="lg" type="submit" variant="primary">Login</b-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import SpinnerComponent from '../../spinnerComponent.vue';

export default {
  name: "login",
  components: {
    SpinnerComponent,
  },
  data() {
    return {
      email: "",
      password: "",
      spinner: false,
      error: false
    };
  },
  methods: {

    makeToast() {
      this.$bvToast.show('my-toast')
    },

    login() {
      this.spinner = true
      var _this = this

      if (!this.email) {
        this.$toast.error('Insira um email válido para login')
        this.spinner = false
        return false
      }

      if (!this.password) {
        this.$toast.error('Sua senha esta vazia')
        this.spinner = false
        return false
      }

      let self = this
      this.$store.dispatch("retrieveToken", { email: this.email, password: this.password, })
        .then(response => {

          if (response.status === 200) {
            this.$router.push('dashboard')
          }
        })
        .catch(function (error) {

          if (error.response) {
            if (error.response.status === 401) {
              self.spinner = false
              _this.$toast.error('Login ou senha invalidos')
            }
          }
        })
    },
  }
}
</script>

<style lang="scss" src="./style.scss" scoped>
.login {
  width: 100%;
  height: 100vh;
}


h1 {
  color: red;
}
</style>