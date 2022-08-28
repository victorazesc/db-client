<template>
  <div class="main">
    <div class="login area">
      <div class="content-login">
        <div class="form">
          <h2 class="text-center">Registro</h2>

          <b-form @submit.prevent="register()">
            <b-row>
              <b-col md="6">
                <b-form-group id="input-group-1" label="Nome:" label-for="input-1">
                  <b-form-input id="input-1" v-model="form.first_name" type="text" placeholder="Nome..." required>
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col md="6">
                <b-form-group id="input-group-2" label="Sobrenome:" label-for="input-2">
                  <b-form-input id="input-2" v-model="form.last_name" placeholder="Sobrenome..." required>
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">

                <b-form-group id="document_client" label="CPF/CNPJ:">
                  <b-form-input id="document_client" v-mask="['###.###.###-##']" v-model="form.document"
                    placeholder="CPF/CNPJ" :state="isvalid" @change="cpfValidate"
                    aria-describedby="input-live-help input-live-feedback" trim></b-form-input>

                  <b-form-invalid-feedback id="input-live-feedback">
                    Entre com um CPF verdadeiro
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group id="input-group-2" label="E-mail:" label-for="input-2">
                  <b-form-input id="input-2" v-model="form.email" placeholder="email@mail.com" required></b-form-input>
                </b-form-group>
              </b-col>

              <b-col md="6">
                <b-form-group id="input-group-2" label="Senha:" label-for="input-2">
                  <b-form-input autocomplete v-if="!form.id" id="input-2" placeholder="******" type="password"
                    v-model="form.password" required></b-form-input>
                  <button class="btn btn-warning btn-block" v-if="form.id" @click.prevent="resetPassword()">Resetar
                    Senha</button>
                  <small v-if="form.id">A senha padrão é o documento cadastrado</small>
                </b-form-group>
              </b-col>

            </b-row>
            <hr />
            <div class="text-left">
              <b-button type="submit" variant="primary">{{
                  form.id ? "Editar" : "Adicionar"
              }}</b-button>
              <router-link :to="'login'" class="btn btn-dark">Já tenho acesso</router-link>
            </div>
          </b-form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cpf } from "cpf-cnpj-validator";
export default {
  data() {
    return {
      form: {},
      isvalid: null,
    }
  },
  methods: {
    cpfValidate() {
      if (this.form.document.length < 15) {
        this.isvalid = cpf.isValid(this.form.document);
      }
    },
    register() {
      this.$store.dispatch('register',
        { ... this.form }
      ).then(
        this.$router.push({ name: 'login' })
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("./style.css");

.login .content-login {
  max-width: 600px !important;
  width: 600px !important;
}

h1 {
  color: red;
}
</style>