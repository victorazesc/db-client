<template>
  <div class="clients">
    <b-modal
      id="edit-client"
      v-model="ModalDelete"
      size="lg"
      centered
      title="Editar Cliente"
      hide-footer
    >
      <div>
        <br />
        <h5 class="text-center">
          Você realmente deseja excluir
          <strong>{{ client.name_client }}</strong> e todos os dados ligados a
          ele?
        </h5>
        <br />

        <b-button
          type="submit"
          variant="dark"
          @click.prevent="ModalDelete = false"
          >Fechar</b-button
        >{{ "" }}
        <b-button
          type="submit"
          @click.prevent="deleteClient(client.id)"
          variant="primary"
          >Deletar</b-button
        >
      </div>
    </b-modal>

    <b-card border-variant="white">
      
      <div style="position: relative; min-height: 45px" class="page-header-mobile" v-if="$resize && $mq.below(750)">
        <span data-v-1320ad47=""><h4 style="position: absolute;padding: 10px;">Cliente</h4></span>
        <span style="position: absolute; right: 0px">
          <b-dropdown size="lg"  variant="link" right toggle-class="text-decoration-none" no-caret>
            <template #button-content>
              <i class="fas fa-ellipsis-v"></i>
            </template>
            <b-dropdown-item :to="{ name: 'ClientsEdit', params: { id: $route.params.id } }">
              <span class="ico"><i class="fas fa-pen"></i></span>  {{ " " }}Editar
            </b-dropdown-item>
            <b-dropdown-item @click.prevent="openModal('delete')">
              <span class="ico"><i class="fas fa-trash" ></i></span>{{ "  " }}Excluir
            </b-dropdown-item>
            <b-dropdown-item @click.prevent="goBack()">
              <span  style="padding-right: 15px;"><i class="fas fa-chevron-left" ></i></span> {{ " " }}Voltar
            </b-dropdown-item>
          </b-dropdown>
        </span>
      </div>


      <b-row v-if="$resize && $mq.above(750)">
        <b-col cols="8" class="text-left"
          ><h4 >{{ $route.meta.title }}</h4></b-col
        >

        <b-col class="text-right">
          <b-button variant="danger" @click.prevent="openModal('delete')"
            >Excluir</b-button
          >
          {{ " " }}
          <b-button
            :to="{ name: 'ClientsEdit', params: { id: $route.params.id } }"
            variant="success"
            >Editar</b-button
          >
          {{ " " }}

          <b-button @click.prevent="goBack()" variant="primary"
            >Voltar</b-button
          >
        </b-col>
      </b-row>


      <b-card-body v-if="client">
        <div>
          <b-tabs pills content-class="mt-3" justified>
            <b-tab variant="dark" title="Dados" active>
            <br>
              <b-row>
                <b-col  cols="12" md="4">
                  <h5>Dados Pessoais</h5>
                  <hr />
                  <p><strong>Nome: </strong>{{ getClientById.name_client }}</p>
                  <p>
                    <strong>Documento: </strong
                    >{{ getClientById.document_client }}
                  </p>
                  <p>
                    <strong>Data de Cadastro: </strong
                    >{{ getClientById.created_at }}
                  </p>
                </b-col>

                <b-col  cols="12" md="4">
                  <h5>Contato</h5>
                  <hr />
                  <p>
                    <strong>Telefone: </strong
                    >{{ getClientById.telephone_client }}
                  </p>
                  <p>
                    <strong>Celular: </strong
                    >{{ getClientById.cellphone_client }}
                  </p>
                  <p>
                    <strong>Email: </strong>{{ getClientById.email_client }}
                  </p></b-col
                >

                <b-col cols="12" md="4">
                  <h5>Endereço</h5>
                  <hr />
                  <p><strong>Rua: </strong>{{ getClientById.street_client }}</p>
                  <p>
                    <strong>Numero: </strong>{{ getClientById.number_client }}
                  </p>
                  <p>
                    <strong>Bairro: </strong>{{ getClientById.district_client }}
                  </p>
                  <p>
                    <strong>Cidade: </strong>{{ getClientById.city_client }}
                  </p>
                  <p>
                    <strong>CEP: </strong>{{ getClientById.cep_client }}
                  </p></b-col
                >
              </b-row>
            </b-tab>
            <b-tab title="Ordens">
              <b-table striped hover :items="items"></b-table>
            </b-tab>
          </b-tabs>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
// import axios from "axios";
// import SpinnerComponent from '../../spinnerComponent.vue';

export default {
  name: "clientsViewComponent",
  props: ["data"],
  components: {
    //  SpinnerComponent
  },
  data() {
    return {
      ModalDelete: false,
      formClient: false,
      spinner: false,
      clientData: "",

      client: [],
      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 38, first_name: "Jami", last_name: "Carney" },
      ],
    };
  },

  computed: {
    getClientById() {
      return this.$store.getters.client;
    },
  },

  created() {


    this.$store.dispatch("getClientById", this.$route.params.id);
    //this.$store.dispatch("getCep", "88318265");
  },

  methods: {

    goBack() {
      return this.$router.go(-1);
    },

    openModal(action) {
      if (action === "delete") {
        this.ModalDelete = true;
      }
    },

    deleteClient() {
      this.spinner = true;
      this.$store
        .dispatch("deleteClient", { id: this.getClientById.id })
        .then(
          this.$store.dispatch("getClients"),
          (this.spinner = false),
          (this.ModalDelete = false)
        );
    }
  }
  }
</script>

<style scoped  lang="scss" src="../../../assets/scss/_main.scss">
.fade {
  opacity: 1 !important;
  transition: opacity 0.15s linear;
}
</style>