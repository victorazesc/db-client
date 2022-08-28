<template>
  <section class="section section-lg pt-lg-0 section-contact-us">

    <SpinnerComponent v-if="spinner" />

    <div class="container">
      <div class="row justify-content-center mt--300">
        <div class="col-lg-8">
          <div class="card bg-gradient-secondary shadow">
            <div>
              <div class="card-body p-lg-5">
                <h4 class="mb-1">Você quer trabalhar conosco?</h4>
                <p class="mt-0">Seu projeto é muito importante para nós.</p>

                <div class="alert" :class="'bg-' + bg" v-if="alert">
                  <p>{{ alert_message }}</p>
                </div>

                <form @submit.prevent="sendEmail()">
                  <div class="form-group mt-5">
                    <div class="input-group input-group-alternative">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="ni ni-user-run"></i></span>
                      </div>
                      <input class="form-control" v-model="contact_form.name" name="name" placeholder="Qual é seu nome?"
                        type="text" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group input-group-alternative">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                      </div>
                      <input class="form-control" placeholder="Endereço de E-mail" type="email"
                        v-model="contact_form.email" name="email" required>
                    </div>
                  </div>
                  <div class="form-group mb-4">
                    <textarea class="form-control form-control-alternative" name="mensagem"
                      v-model="contact_form.message" rows="4" cols="80" placeholder="Escreva sua mensagem ..." required>

                    </textarea>
                  </div>
                  <div>
                    <button :disabled="Object.keys(this.contact_form).length < 3" type="submit"
                      class="btn btn-warning btn-round btn-block btn-lg">Enviar Mensagem</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


</template>

<script>

import SpinnerComponent from '../../spinnerComponent.vue';

export default {
  name: "form-contact",
  components: {
    SpinnerComponent,
  },
  data() {
    return {
      contact_form: {},
      spinner: false,
      alert: false,
      alert_message: '',
      bg: ''
    }
  },

  methods: {
    sendEmail() {
      this.spinner = true
      this.$store.dispatch('contact', this.contact_form).then(response => {

        this.alert = true;

        console.log(status)
        if (response.status === 200) {
          this.alert_message = 'E-mail enviado com sucesso, aguarde que logo entraremos em contato.'
          this.bg = 'success'
        } else {
          this.alert_message = 'Ops Algo não se saiu muito bem!, entre em contato conos via telefone ou email "contato@db-assuntosregulatorios.com" .'
          this.bg = 'danger'
        }

        this.spinner = false

      })
    }
  },
};


</script>

<style lang="scss" src="./argon.scss" scoped>