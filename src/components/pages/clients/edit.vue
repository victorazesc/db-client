<template>
  <div class="clients">
    <b-card border-variant="white">
      <b-row>
        <b-col cols="8" class="text-left"></b-col>
        <h4>{{ $route.meta.title }}</h4>
        <b-col cols="4" class="text-right">
          <b-button @click.prevent="goBack()" variant="primary">Voltar</b-button>
        </b-col>
      </b-row>
      <b-card-body>
        <b-form action="#" @submit.prevent="submitClient(client.id)">

          <b-form-row>
            <b-col cols="12" md="8">
              <b-form-group id="name_client" label="Nome:">
                <b-form-input v-model="client.name_client" placeholder="Nome" required=""></b-form-input>
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group id="document_client" label="CPF/CNPJ:">
                <b-form-input id="document_client" v-mask="['###.###.###-##', '##.###.###/####-##']"
                  v-model="client.document_client" placeholder="CPF/CNPJ" :state="isvalid" @change="cpfValidate"
                  aria-describedby="input-live-help input-live-feedback" trim></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">
                  Entre com um CPF ou CNPJ verdadeiros
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col cols="6" md="4">
              <b-form-group id="telephone_client" label="Telefone:">
                <b-form-input v-mask="['(##) ####-####', '(##) #####-####']" v-model="client.telephone_client"
                  placeholder="Telefone"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6" md="4">
              <b-form-group id="cellphone_client" label="Celular:">
                <b-form-input v-mask="['(##) ####-####', '(##) #####-####']" v-model="client.cellphone_client"
                  placeholder="Celular"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="email_client" label="Email:">
                <b-form-input v-model="client.email_client" placeholder="Email" type="email"></b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col cols="6" md="4">
              <b-form-group id="cep_client" label="CEP:">
                <b-form-input v-mask="'#####-###'" @keyup="searchCep()" v-model="client.cep_client" placeholder="CEP">
                </b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="6" md="4">
              <b-form-group id="city_client" label="Cidade:">
                <b-form-input :readonly="readonly" v-model="client.city_client" placeholder="Cidade"></b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="4">
              <b-form-group id="street_client" label="Rua:">
                <b-form-input :readonly="readonly" v-model="client.street_client" placeholder="Rua"></b-form-input>
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group id="district_client" label="Bairro:">
                <b-form-input :readonly="readonly" v-model="client.district_client" placeholder="Bairro"></b-form-input>
              </b-form-group>
            </b-col>


            <b-col>
              <b-form-group id="state_client" label="Estado:">
                <b-form-input :readonly="readonly" v-model="client.state_client" placeholder="Estado"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="number_client" label="Numero:">
                <b-form-input v-model="client.number_client" placeholder="Numero"></b-form-input>
              </b-form-group>
            </b-col>

          </b-form-row>
          <hr />
          <div class="text-left">
            <b-button type="submit" variant="success">Confirmar</b-button>
          </div>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { cpf, cnpj } from 'cpf-cnpj-validator'
export default {
  name: "clientsEditComponent",
  props: ["data"],
  data() {
    return {
      isvalid: null,
      files: [],
      readonly: true,
      ModalDelete: false,
      formClient: false,
      spinner: false,
      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 38, first_name: "Jami", last_name: "Carney" },
      ],
    };
  },

  computed: {
    client() {
      return this.$store.getters.client;
    },

    filesall() {
      return this.$store.getters.files
    },

    getUser() {
      return this.$store.getters.user
    }
  },

  created() {
    this.$store.dispatch("getClientById", this.$route.params.id);
    this.$store.dispatch("getFiles");
  },

  methods: {

    cpfValidate() {

      if (this.client.document_client.length < 15) {
        console.log(this.client.document_client.length)
        this.isvalid = cpf.isValid(this.client.document_client)
      } else {
        console.log(this.client.document_client.length)
        this.isvalid = cnpj.isValid(this.client.document_client)
      }
    },

    goBack() {
      return this.$router.go(-1);
    },

    searchCep() {
      let cep = this.client.cep_client.replace(/[^0-9]/gi, '')
      this.readonly = 'readonly'
      if (cep.length === 8) {
        this.$http.get('https://viacep.com.br/ws/' + cep + '/json/').then(response => {
          if (response.body.erro === true) {
            this.modal = true
            this.client.cep_client = null
            this.client.street_client = null
            this.client.district_client = null
            this.client.state_client = null
            this.client.city_client = null

          } else {

            this.client.street_client = response.data.logradouro
            this.client.district_client = response.data.bairro
            this.client.state_client = response.data.uf
            this.client.city_client = response.data.localidade

            this.readonly = true
          }
        })
      } else {
        this.readonly = false

        this.client.street_client = null
        this.client.district_client = null
        this.client.state_client = null
        this.client.city_client = null
      }
    },

    submitClient() {
      this.spinner = true;
      this.$store.dispatch("editClient", this.client).then(
        this.$bvModal.hide("edit-client"),
        this.$toast.open('Cliente Editado com sucesso!')
      );
      this.spinner = false;
    },

    openModal(data, action) {
      if (action === "delete") {
        this.ModalDelete = true;
      }
      if (action === "update") {
        this.formClient = true;
      }
      if (action === "add") {
        this.clearRegisters();
        this.formClient = true;
      }
      this.client = data;
    },

    deleteClient(id) {
      this.spinner = true;
      this.$store
        .dispatch("deleteClient", {
          id: id,
        })
        .then(
          this.$store.dispatch("getClients"),
          (this.spinner = false),
          (this.ModalDelete = false)
        );
    },

    getResults(page = 1) {
      this.$store.dispatch("getClients", {
        page: page,
      });
    },
  },
};
</script>

<style scoped  lang="scss" src="../../../assets/scss/_main.scss">
.fade {
  opacity: 1 !important;
  transition: opacity 0.15s linear;
}
</style>