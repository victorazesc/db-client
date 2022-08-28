<template>
  <div class="clients">
    <SpinnerComponent v-if="spinner" />
    <b-modal id="add-service" v-model="formAddModal" size="md" title="Adicionar Serviço" hide-footer>
      <div>
        <b-form action="#" @submit.prevent="submitService()">
          <b-form-row>
            <label for="">Serviço*</label>
            <textarea name="name" style="height: 80px;" v-model="newService.service_name" class="form-control" required />
          </b-form-row>

          <!-- <b-form-row>
            <label for="">Descrição</label>
            <textarea rows="4" cols="" class="form-control" v-model="newService.service_description"></textarea>
          </b-form-row>
          <b-form-row>
            <label for="">Observação</label>
            <textarea rows="4" cols="" class="form-control" v-model="newService.obs"></textarea>
          </b-form-row> -->
          <br />
          <b-button type="submit" class="float-right" variant="primary">Salvar</b-button>
          <b-button type="submit" class="float-right" variant="dark" @click.prevent="formAddModal = false">Fechar</b-button>{{ "" }}
        </b-form>
      </div>
    </b-modal>

    <b-modal id="edit-service" v-model="formEditModal" size="md" title="Editar Serviço" hide-footer>
      <div>
        <b-form action="#" @submit.prevent="submitService(service.id)">
          <b-form-row>
            <label for="">Serviço*</label>
            <textarea name="name" style="height: 80px;" v-model="service.service_name" class="form-control" required />
          </b-form-row>

          <!-- <b-form-row>
            <label for="">Descrição</label>
            <textarea rows="4" cols="" class="form-control" v-model="service.service_description"></textarea>
          </b-form-row>
          <b-form-row>
            <label for="">Observação</label>
            <textarea rows="4" cols="" class="form-control" v-model="service.obs"></textarea>
          </b-form-row> -->
          <br />

          <b-button type="submit" variant="danger" @click.prevent="deleteService(service)"><i class="fa fa-trash"></i></b-button>{{ "" }}
          <b-button type="submit" class="float-right" variant="primary">Salvar</b-button>
          <b-button type="submit" class="float-right" variant="dark" @click.prevent="formEditModal = false">Fechar</b-button>{{ "" }}
        </b-form>
      </div>
    </b-modal>

    <b-card border-variant="white">
      <b-row>
        <b-col cols="8" class="text-left">
          <h4>{{ $route.meta.title }}</h4>
        </b-col>
        <b-col cols="4" class="text-right">
          <b-button @click.prevent="goBack()" variant="primary">Voltar</b-button>
        </b-col>
      </b-row>
      <b-card-body>
        <b-row>

          <b-col md="7">
            <b-form action="#" @submit.prevent="submitOs()">
              <b-form-row>
                <b-col cols="12" md="12">
                  <b-form-group id="name_client" label="Cliente:">
                    <div>
                      <multiselect v-model="os.client" id="ajax" label="name_client" track-by="id" selectLabel="Selecionar" deselectLabel="Remover" selectedLabel="Selecionado" placeholder="Digite para pesquisar" open-direction="bottom" :options="clientsFounds" :preserve-search="true" :multiple="false" :searchable="true" :loading="isLoadingClient" :internal-search="false" :clear-on-select="false" :close-on-select="true" :show-no-results="true" :hide-selected="false" :custom-label="clientNameWithDocument" @search-change="searchClient">

                        <span slot="noOptions">A lista esta vazia.</span>
                        <span slot="noResult">Oops! Nada foi encontrado. Considere mudar a sua busca.</span>
                      </multiselect>
                      <span class="required" v-if="valid_client">Campo obrigatório</span>
                    </div>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="12">
                  <p>Objeto da Proposta:</p>

                  <div style="min-height:150px;">
                    <ul style="list-style: auto inside;font-size: 17px;font-weight: 600;color: #444;">
                      <li v-for="(selected, key) in os.selected_services" :key="key + 'a'" style="padding: 5px;position: relative;" :style="key%2 ? 'background: rgb(0 0 0 / 3%);' : ''">
                        <span>
                          {{selected.service_name}} <button @click.prevent="removeService(key)" class="btn btn-link" style="position: absolute;right: 5px;top: 3px;">
                            <b-icon icon="trash" scale="1" variant="danger"></b-icon>
                          </button>
                          <br>
                          <a href="#" v-if="selected.service_value === null" @click.prevent="updateValue(key, 1)" :key="valueReload + 'link'">Inserir Valor</a>
                        </span>
           
                        <!-- Using components -->
                        <b-input-group class="mt-3" v-if="selected.service_value !== null ">
                          <money type="text" name="name" @blur.native="calcOsValue(key)" v-model="selected.service_value" :key="valueReload + 'input'" class="form-control" required />
                          <b-input-group-append>
                            <b-button variant="danger" style="margin: 0px" @click.prevent="updateValue(key, 0)">Remover Valor</b-button>
                          </b-input-group-append>
                        </b-input-group>
 <br>
                      </li>

                    </ul>
                    <p class="text-center" style="padding-top: 60px;color: #555;" v-if="!os.selected_services || os.selected_services.length < 1">Nenhum Serviço adicionado a proposta</p>
                  </div>
                  <br>
                </b-col>
              </b-form-row>
              <b-form-row>
                <b-col md="12">
                  <b-form-group id="comments" label="Valor da Proposta:">
                    <money type="text" name="name" v-model="os.amount" :key="valueReload + 'amount'" class="form-control" required />
                    <span class="required" v-if="valid_client">Campo obrigatório</span>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row>
                <b-col md="12">
                  <b-form-checkbox id="checkbox-1" v-model="os.monthly" name="checkbox-1" value="0" unchecked-value="1">
                    Valor único !
                  </b-form-checkbox>
                </b-col>
              </b-form-row>
              <br>
              <b-form-row>
                <b-col cols="6" md="12">
                  <b-form-group id="comments" label="Observações:">
                    <b-form-textarea id="comments" v-model="os.comments" placeholder="Escreva Algo..." rows="6" max-rows="12"></b-form-textarea>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <hr />
              <div class="text-left">
                <b-button type="submit" variant="success" :disabled="validation || (os.selected_services && os.selected_services.length === 0)">Confirmar</b-button>
              </div>
            </b-form>
          </b-col>

          <b-col md="5">
            <b-card-body>
              <h4 class="text-center">Serviços</h4>

              <br>

              <b-input-group>
                <b-input-group-append>
                  <b-button variant="success" @click.prevent="formAddModal = true" style="margin: 0px"><i class="fa fa-plus"></i></b-button>
                </b-input-group-append>
                <b-form-input placeholder="Buscar" v-model="search" @keyup="searchService()"></b-form-input>
              </b-input-group>

              <br>
              <div style="max-height: 500px; overflow-y: scroll">
                <div v-for="(s, index) in services" :key="index" class="btn-service">
                  <span style="display: block" @click.prevent="selectService(index)">{{s.service_name}}</span>

                  <button class="btn btn-sm btn-primary" @click="service = s, formEditModal = true"><i class="fa fa-pen"></i></button>
                </div>
              </div>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import SpinnerComponent from '../../spinnerComponent.vue';
import { cpf, cnpj } from 'cpf-cnpj-validator'
// import Datetime from '../../plugins/datetime/Datetime.vue'
// import { Datetime } from 'vue-datetime';
export default {
  name: "clientsEditComponent",
  props: ["data"],
  components: {
    Multiselect,
    // datetime: Datetime
    SpinnerComponent
  },
  data () {
    return {
      status: null,
      isvalid: null,
      services: [],
      files: [],
      os: {},
      finalDate: null,
      initialDate: null,
      isLoadingUser: false,
      isLoadingClient: false,
      ClientSelected: null,
      newService: {},
      service: {},
      UserSelected: null,
      readonly: true,
      ModalDelete: false,
      formEditModal: false,
      formClient: false,
      formAddModal: false,
      statusOs: {},
      spinner: false,
      selected_services: [],
      clientsFounds: [],
      valueReload: 0,
      search: '',
      usersFounds: [],
      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 38, first_name: "Jami", last_name: "Carney" },
      ],
    };
  },

  computed: {

    valid_client () {
      if (this.os.client) return false
      else return true
    },
    valid_amount () {
      if (this.os.amount > 0) return false
      else return true
    },

    validation () {
      if (this.valid_client) return true
      else if (this.valid_amount) return true
      else return false
    },
    client () {
      return this.$store.getters.client
    },

    filesall () {
      return this.$store.getters.files
    },

    getUser () {
      return this.$store.getters.user
    }
  },

  created () {
    this.$store.dispatch("getClientById", this.$route.params.id);
    this.$store.dispatch("getAllServices").then(resp => {
      this.services = resp
    });
    this.$store.dispatch("getStatusOs").then(resp => (


      this.statusOs = JSON.parse(JSON.stringify(resp))
    ))
  },


  methods: {

    deleteService (service) {
      this.spinner = true;
      this.$store
        .dispatch("deleteService", service)
        .then(
          this.$bvToast.toast('Serviço deletado com sucesso', {
            autoHideDelay: 4000,
            variant: 'success',
            appendToast: true,
            noCloseButton: true,
            toaster: this.$resize && this.$mq.below(768) ? 'b-toaster-bottom-full' : 'b-toaster-top-right'
          }),
          this.$store.dispatch("getAllServices").then(resp => {
            this.services = resp
            this.removeServicesIn()
          }),
          (this.spinner = false),
          (this.formEditModal = false)
        );
    },
    calcOsValue () {
      this.valueReload++
      this.os.amount = 0

      for (let service of this.os.selected_services) {
        this.os.amount += service.service_value
      }

    },

    searchService () {
      this.$store.dispatch("getAllServices", { search: this.search }).then(resp => {
        this.services = resp
        this.removeServicesIn()
      });
    },

    submitService (id) {
      if (id) {
        this.$store.dispatch("updateService", this.service).then(() => {
          this.formEditModal = false;
          this.$store.dispatch("getServices").then(() => {
            this.$bvToast.toast('Serviço editado com sucesso', {
              autoHideDelay: 4000,
              variant: 'success',
              appendToast: true,
              noCloseButton: true,
              toaster: this.$resize && this.$mq.below(768) ? 'b-toaster-bottom-full' : 'b-toaster-top-right'
            })
          });
        });
      } else {
        this.$store.dispatch("addService", this.newService).then(() => {
          this.$bvToast.toast('Serviço criado com sucesso', {
            autoHideDelay: 4000,
            variant: 'success',
            appendToast: true,
            noCloseButton: true,
            toaster: this.$resize && this.$mq.below(768) ? 'b-toaster-bottom-full' : 'b-toaster-top-right'
          })
          this.formAddModal = false;
          this.$store.dispatch("getAllServices").then(resp => {
            this.services = resp
            this.removeServicesIn()
          });
        });
      }
    },

    selectService (index) {
      this.os.selected_services = this.os.selected_services ? this.os.selected_services : []
      this.os.selected_services.unshift(this.services[index])
      this.services.splice(index, 1)
      this.calcOsValue()

    },

    updateValue (index, type) {
      this.valueReload++

      if (type) {
        this.os.selected_services[index].service_value = 0
      } else {
        this.os.selected_services[index].service_value = null
      }
      this.calcOsValue()
    },

    removeService (index) {
      this.services.unshift(this.os.selected_services[index])
      this.os.selected_services.splice(index, 1)
      this.calcOsValue()
    },

    updateServices () {

      for (let ser of this.services) {
        if (ser.selected) {
          this.os.selected_services.push(ser)
        }
      }
    },

    searchClient (query) {
      console.log(query)
      this.isLoadingClient = true
      if (query.length > 3) {
        this.$store.dispatch("getAllClients", query).then(resp => (
          this.clientsFounds = resp,
          this.isLoadingClient = false
        ));
      } else {
        this.clientsFounds = []
      }
    },

    clientNameWithDocument ({ name_client, document_client }) {
      return `${name_client} — ${document_client}`
    },

    userNameFull ({ first_name, last_name }) {
      return `${first_name} ${last_name}`
    },

    removeServicesIn () {
      let remove = []
      for (let selected of this.os.selected_services) {
        remove.push(selected.id)
      }

      let intersection = this.services.filter(x => !remove.includes(x.id))

      this.services = intersection

    },

    searchUser (query) {
      if (query.length > 3) {
        this.$store.dispatch("getAllUsers", query).then(resp => (
          this.usersFounds = resp,
          this.isLoadingUser = false
        ));
      } else {
        this.usersFounds = []
      }
    },

    submitOs () {
      this.spinner = true;
      let client = { ...this.os.client }
      this.os.client = client ? client.id : null
      this.$store.dispatch("addOs", this.os).then(resp => {
        this.$bvToast.toast(resp.data.message, {
          autoHideDelay: 4000,
          variant: resp.data.type,
          appendToast: true,
          noCloseButton: true,
          toaster: this.$resize && this.$mq.below(768) ? 'b-toaster-bottom-full' : 'b-toaster-top-right'
        })
        this.$router.push('/proposal/edit/' + resp.data.os.id)
      });
      this.os.client = client
      this.spinner = false;
    },



    //função atual


    cpfValidate () {

      if (this.client.document_client.length < 15) {
        console.log(this.client.document_client.length)
        this.isvalid = cpf.isValid(this.client.document_client)
      } else {
        console.log(this.client.document_client.length)
        this.isvalid = cnpj.isValid(this.client.document_client)
      }
    },

    goBack () {
      return this.$router.go(-1);
    },

    searchCep () {
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
            // this.newclient.cep_client = null
            this.client.street_client = response.data.logradouro
            this.client.district_client = response.data.bairro
            this.client.state_client = response.data.uf
            this.client.city_client = response.data.localidade
            // document.getElementById('form-user-numero_' + this.historical.address.id).focus()
            this.readonly = true
          }
        })
      } else {
        this.readonly = false
        // this.newclient.cep_client = null
        this.client.street_client = null
        this.client.district_client = null
        this.client.state_client = null
        this.client.city_client = null
      }
    },



    openModal (data, action) {
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

    deleteClient (id) {
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

    getResults (page = 1) {
      this.$store.dispatch("getClients", {
        page: page,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.fade {
  opacity: 1 !important;
  transition: opacity 0.15s linear;
}

.required {
  font-size: 12px;
  color: #f5365c;
}

.multiselect__tags {
  height: calc(1.5em + 0.75rem + 2px);
  display: block;
  font-weight: 400;
  line-height: 1.5;
  font-size: 1rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
  background: #fff;
  font-size: 14px;
  color: #495057;
}

.btn-service {
  padding: 10px;
  position: relative;
  box-shadow: rgb(0 0 0 / 5%) 1px 1px 17px 1px;
  margin: 10px;
  padding-right: 40px;
  border-radius: 5px;
  cursor: pointer;

  .btn {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}

.btn-service:hover {
  background: rgb(0 0 0 / 1.5%);
}
</style>
<!-- <style src="vue-multiselect/dist/vue-multiselect.min.css"></style> -->