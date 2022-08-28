<template>
  <section>
    <heading></heading>

    <b-modal size="lg" id="modal-1" title="Seja acessorado !!" hide-footer>
      <div v-if="!success">
        <h5 class="text-center">Precisamos de algumas informações:</h5>
        <b-form @submit.prevent="register()">
          <b-form-group id="input-group-2" label="Qual seu nome?" label-for="input-2">
            <b-form-input id="input-2" v-model="form.name" placeholder="João da silva" required></b-form-input>
          </b-form-group>

          <div class="row">
            <div class="col-6">
              <b-form-group id="input-group-2" label="Telefone para contato?" label-for="input-2">
                <b-form-input id="input-2" v-model="form.phone" placeholder="(47) 9 9999-9999" required></b-form-input>
              </b-form-group>
            </div>
            <div class="col-6">
              <b-form-group id="input-group-2" label="Telefone para contato?" label-for="input-2">
                <b-form-input type="email" id="input-2" v-model="form.email"
                  placeholder="joaodasilva@db-assuntosregulatorios.com" required></b-form-input>
              </b-form-group>
            </div>
          </div>
          <label for="textarea">Qual é sua duvida?</label>
          <b-form-textarea id="textarea" v-model="question" placeholder="Escreva sua resposta..." rows="3" max-rows="6">
          </b-form-textarea>
          <br>

          <div class="text-right">
            <b-button type="reset" @click="$bvModal.hide('modal-1')" variant="dark">Cancelar</b-button>
            <b-button type="submit" variant="warning">Enviar</b-button>
          </div>

        </b-form>
      </div>
      <div v-if="success">
        <div class="text-center bg-success rounded">
          <br>
          <h3 class="text-white"><i class="fa fa-check"></i></h3>
          <br>
          <h4 class="text-white">Sua solicitação de acessoria foi enviada com sucesso,
            agora é só aguardar que logo entraremos em contato.</h4>
          <br>
        </div>
        <br>
        <div class="text-right">
          <b-button type="submit" @click="$bvModal.hide('modal-1'), form = {}, success = false" variant="warning">Ok
          </b-button>
        </div>
      </div>
    </b-modal>

    <main>
      <section class="bg-gradient-default" style="padding-bottom: 6rem;">
        <div class="container">
          <div>
            <br /><br /><br />
            <br /><br /><br />
            <br /><br /><br />
            <h2 class="text-white text-center">Olá, como podemos te ajudar?</h2>
            <br />
            <div class="row row-grid justify-content-center">
              <div class="col-lg-12 text-center">
                <b-form-input size="lg" v-model="question" placeholder="Como podemos ajuda-lo?"></b-form-input>
                <br>
                <div class="row">
                  <div class="col-lg-6">
                    <b-button variant="light" class="btn-block" @click="sendHelp">Pesquisar</b-button>
                  </div>

                  <div class="col-lg-6">
                    <br v-if="$resize && $mq.below(750)">
                    <b-button variant="warning" class="btn-block" v-b-modal.modal-1>Receber Acessoria</b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section section-lg">
        <div class="container">
          <div class="row row-grid justify-content-center">
            <div class="col-lg-12">
              <div>

                <div v-if="questions && !questions.none">
                  <h4 class="text-center">Talvez aqui abaixo você encontrara sua resposta: </h4>
                  <br>
                  <br>
                  <div v-if="questions">
                    <div class="accordion" role="tablist" v-for="(question, index) in questions" :key="index">
                      <b-card no-body class="mb-1" v-if="question.response">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                          <b-button block v-b-toggle="'' + question.id" variant="white">{{ question.question }}</b-button>
                        </b-card-header>
                        <b-collapse :id="'' + question.id">
                          <b-card-body>
                            <b-card-text>{{ question.response }}</b-card-text>
                          </b-card-body>
                        </b-collapse>
                      </b-card>
                    </div>
                  </div>
                </div>
                <h3 v-if="questions && questions.none" class="text-center">
                  Nada foi encontrado
                </h3>
                <br>
                <h5 v-if="questions && questions.none">
                  Ops! Não encontramos nada com o(s) termo(s) {{ question }}
                </h5>


                <div v-if="!questions">
                  <div v-if="helps.length > 0">
                    <h3 class="display-4 text-center">
                      Perguntas mais frequentes:
                    </h3>
                    <br />
                    <br />
                    <div>
                      <div class="accordion" role="tablist" v-for="(question, index) in helps" :key="index">
                        <b-card no-body class="mb-1">
                          <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-button class="text-left" block v-b-toggle="'' + question.id" variant="white">{{
                                question.question
                            }}</b-button>
                          </b-card-header>
                          <b-collapse :id="'' + question.id">
                            <b-card-body>
                              <b-card-text>{{ question.response }}</b-card-text>
                            </b-card-body>
                          </b-collapse>
                        </b-card>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <p class="text-center">Ainda nao temos perguntas cadastradas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footered></footered>
  </section>
</template>

<script>
import heading from "./heading";
import footered from "./footer";

export default {
  name: "help",
  components: {
    heading,
    footered,
  },
  data() {
    return {
      form: {},
      question: "",
      helps: null,
      questions: null,
      success: false,
    };
  },

  methods: {
    sendHelp() {
      let data = {
        question: this.question,
      };
      this.$store.dispatch("sendHelp", data).then((resp) => {
        console.log(resp);
        this.questions = resp.data;
      });
    },

    register() {
      this.$parent.spinner = true
      let data = {
        client_name: this.form.name,
        client_email: this.form.email,
        client_phone: this.form.phone,
        restrict: true,
        question: this.question,
      };
      this.$store.dispatch("sendHelp", data).then(() => {
        this.success = true
        this.$parent.spinner = false
      });
    },
  },
  created() {
    let params = {
      params: {
        frequent: true,
      },
    };
    this.$store.dispatch("getHelps", params).then((resp) => {
      this.helps = resp;
    });
  },
};
</script>


<style lang="scss" src="./argon.scss" scoped>