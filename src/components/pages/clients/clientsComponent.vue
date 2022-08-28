<template>
  <div class="clients">
    <SpinnerComponent v-if="spinner" />

    <b-modal id="edit-client" v-model="ModalDelete" size="lg" centered title="Deletar" hide-footer
      :hide-header="!!($resize && $mq.below(768))">
      <div>
        <br />
        <h5 class="text-center">
          Deseja excluir <strong>{{ client.name_client }}</strong> e todos os dados ligados a
          ele?
        </h5>
        <br />
        <div class="float-right">
          <b-button type="submit" variant="dark" @click.prevent="ModalDelete = false">Fechar</b-button>
          {{ "" }}
          <b-button type="submit" @click.prevent="deleteClient(client)" variant="primary">Deletar</b-button>
        </div>
      </div>
    </b-modal>

    <b-modal id="filter" size="lg" centered v-model="modalFilter" title="Filtrar Clientes" hide-footer>
      <b-form action="#" @submit.prevent="basicFilter()">
        <b-form-row>
          <b-col md="9" sm="12">
            <b-form-group id="name_client" label="Nome:">
              <b-form-input v-model="filter.name_client" placeholder="Nome"></b-form-input>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group id="document_client" label="CPF/CNPJ:">
              <b-form-input id="document_client" v-mask="['###.###.###-##', '##.###.###/####-##']"
                v-model="filter.document_client" placeholder="CPF/CNPJ" :state="isvalid" @change="cpfValidate"
                aria-describedby="input-live-help input-live-feedback" trim></b-form-input>
              <b-form-invalid-feedback id="input-live-feedback">
                Entre com um CPF ou CNPJ verdadeiros
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col cols="6">
            <b-form-group id="telephone_client" label="Telefone:">
              <b-form-input v-mask="['(##) ####-####', '(##) #####-####']" v-model="filter.telephone_client"
                placeholder="Telefone"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group id="cellphone_client" label="Celular:">
              <b-form-input v-mask="['(##) ####-####', '(##) #####-####']" v-model="filter.cellphone_client"
                placeholder="Celular"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="email_client" label="Email:">
              <b-form-input v-model="filter.email_client" placeholder="Email" type="email"></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>

        <transition name="fade">
          <div v-if="cepError" class="bg-danger p-3 text-light rounded-lg m-3">
            <h6 class="text-center">
              Cep não encontrado verifique o numero digitado
            </h6>
          </div>
        </transition>

        <b-form-row>
          <b-col cols="6">
            <b-form-group id="cep_client" label="CEP:">
              <b-form-input v-mask="'#####-###'" v-model="filter.cep_client" placeholder="CEP"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group id="city_client" label="Cidade:">
              <b-form-input v-model="filter.city_client" placeholder="Cidade"></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>
        <hr />
        <div class="text-right">
          <b-button @click.prevent="modalFilter = false, filter = {}, getResults()" variant="dark"
            style="margin-right: 5px">Cancel
          </b-button>
          <b-button type="submit" variant="primary">Filtrar</b-button>
        </div>
      </b-form>
    </b-modal>

    <b-modal id="add-client" size="lg" centered v-model="formAddClient" title="Adicionar Cliente" hide-footer>
      <b-form action="#" @submit.prevent="submitClient()">
        <b-form-row>
          <b-col md="9" sm="12">
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
          <b-col cols="6">
            <b-form-group id="telephone_client" label="Telefone:">
              <b-form-input v-mask="['(##) ####-####', '(##) #####-####']" v-model="client.telephone_client"
                placeholder="Telefone"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
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

        <transition name="fade">
          <div v-if="cepError" class="bg-danger p-3 text-light rounded-lg m-3">
            <h6 class="text-center">
              Cep não encontrado verifique o numero digitado
            </h6>
          </div>
        </transition>

        <b-form-row>
          <b-col cols="6">
            <b-form-group id="cep_client" label="CEP:">

              <b-form-input v-mask="'#####-###'" v-model="client.cep_client" @change="searchCep()" required
                placeholder="CEP"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group id="city_client" label="Cidade:">
              <b-form-input :readonly="enable" v-model="client.city_client" placeholder="Cidade"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group id="street_client" label="Rua:">
              <b-form-input :readonly="enable" v-model="client.street_client" placeholder="Rua"></b-form-input>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group id="district_client" label="Bairro:">
              <b-form-input :readonly="enable" v-model="client.district_client" placeholder="Bairro"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="state_client" label="Estado:">
              <b-form-input :readonly="enable" v-model="client.state_client" placeholder="Estado"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="number_client" label="Numero:">
              <b-form-input v-model="client.number_client" placeholder="Numero"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group label="Observação:">
              <b-form-textarea id="textarea" v-model="client.obs" placeholder="Observação..." rows="3" max-rows="6">
              </b-form-textarea>
            </b-form-group>
          </b-col>
        </b-form-row>
        <hr />
        <div class="text-right">
          <b-button @click.prevent="formAddClient = false" variant="dark" style="margin-right: 5px">Cancel</b-button>
          <b-button type="submit" variant="primary">{{
              client.id ? "Editar" : "Adicionar"
          }}
          </b-button>
        </div>
      </b-form>
    </b-modal>

    <b-modal id="edit-client" size="lg" centered v-model="formClient" title="Editar Cliente" hide-footer>
      <b-form action="#" @submit.prevent="submitClient(client.id)">
        <b-form-row>
          <b-col md="9" sm="12">
            <b-form-group id="name_client" label="Nome:">
              <b-form-input v-model="client.name_client" placeholder="Nome" required=""></b-form-input>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group id="document_client" label="CPF/CNPJ:">
              <b-form-input id="document_client" v-mask="['###.###.###-##', '##.###.###/####-##']"
                v-model="client.document_client" placeholder="CPF/CNPJ" :state="isvalid" @change="cpfValidate"
                aria-describedby="input-live-help input-live-feedback" trim></b-form-input>

              <!-- This will only be shown if the preceding input has an invalid state -->
              <b-form-invalid-feedback id="input-live-feedback">
                Entre com um CPF ou CNPJ verdadeiros
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col cols="6">
            <b-form-group id="telephone_client" label="Telefone:">
              <b-form-input v-mask="['(##) ####-####', '(##) #####-####']" v-model="client.telephone_client"
                placeholder="Telefone"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
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

        <transition name="fade">
          <div v-if="cepError" class="bg-danger p-3 text-light rounded-lg m-3">
            <h6 class="text-center">
              Cep não encontrado verifique o numero digitado
            </h6>
          </div>
        </transition>

        <b-form-row>
          <b-col cols="6">
            <b-form-group id="cep_client" label="CEP:">
              <span style="float: right; position: absolute; right: 10px; top: 0"><a href="#"
                  @click.prevent="enable = !enable">Digitar Endereço</a></span>
              <b-form-input v-mask="'#####-###'" v-model="client.cep_client" @change="searchCepOnEdit()"
                placeholder="CEP"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group id="city_client" label="Cidade:">
              <b-form-input :readonly="enable" v-model="client.city_client" placeholder="Cidade"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group id="street_client" label="Rua:">
              <b-form-input :readonly="enable" v-model="client.street_client" placeholder="Rua"></b-form-input>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group id="district_client" label="Bairro:">
              <b-form-input :readonly="enable" v-model="client.district_client" placeholder="Bairro"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="state_client" label="Estado:">
              <b-form-input :readonly="enable" v-model="client.state_client" placeholder="Estado"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="number_client" label="Numero:">
              <b-form-input v-model="client.number_client" placeholder="Numero"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="complement" label="Complemento:">
              <b-form-input v-model="client.complement" placeholder="Complemento"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group label="Observação:">
              <b-form-textarea id="textarea" v-model="client.obs" placeholder="Observação..." rows="3" max-rows="6">
              </b-form-textarea>
            </b-form-group>
          </b-col>
        </b-form-row>
        <hr />
        <div class="text-right">
          <b-button @click.prevent="formClient = false" variant="dark" style="margin-right: 5px">Cancel</b-button>
          <b-button type="submit" variant="primary">{{
              client.id ? "Editar" : "Adicionar"
          }}
          </b-button>
        </div>
      </b-form>
    </b-modal>

    <b-card border-variant="white">
      <b-row>
        <b-col cols="5" class="text-left">
          <h4 class="d-none d-sm-block">{{ $route.meta.title }}</h4>
          <h4 class="d-block d-sm-none">
            {{ $route.meta.mobileTitle }}
          </h4>
        </b-col>
        <b-col cols="7" class="text-right">
          <template v-if="$resize && $mq.below(750)">
            <b-dropdown right>
              <template #button-content>
                <i class="fa fa-stream"></i>
              </template>
              <b-dropdown-item @click.prevent="openModal(client, 'filter')">Filtrar</b-dropdown-item>
              <b-dropdown-item @click.prevent="openModal(client, 'add')">Novo</b-dropdown-item>
              <b-dropdown-item @click.prevent="goBack()">Voltar</b-dropdown-item>
            </b-dropdown>
          </template>
          <template v-else>
            <b-button @click.prevent="openModal(client, 'filter')" variant="dark"><i class="fa fa-filter"></i>
            </b-button>
            <b-button @click.prevent="openModal(client, 'add')" variant="success">Novo</b-button>
            <b-button @click.prevent="goBack()" variant="primary">Voltar</b-button>
          </template>

        </b-col>
      </b-row>

      <b-row>
        <div class="container-fluid">
          <span v-for="(field, index) in filter" :key="index">
            <template v-if="field.length > 0">
              <button class="btn btn-danger btn-sm" @click.prevent="filter[index] = '', basicFilter()">
                <i class="fa fa-times"></i><b> {{ index | translate }}: </b>{{ field }}
              </button>
            </template>
          </span>
        </div>
      </b-row>

      <b-card-body class="d-none d-sm-block" v-if="$resize && $mq.above(750)">
        <b-skeleton-table v-if="!getClients.data" animation="wave" :rows="5" :columns="6"
          :table-props="{ bordered: false, striped: false }"></b-skeleton-table>

        <div v-else class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome Cliente</th>
                <th>CPF/CNPJ</th>
                <th>Telefone</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody v-if="getClients.data.length > 0">
              <tr v-for="client in getClients.data" :key="client.id">
                <td>{{ client.id }}</td>
                <td>{{ client.name_client }}</td>
                <td>{{ client.document_client | document }}</td>
                <td>{{ client.telephone_client ? client.telephone_client : client.cellphone_client | phone }}</td>
                <td>
                  <b-button-group size="sm">
                    <b-button variant="warning" @click.prevent="openModal(client, 'update')"><i class="fas fa-pen"></i>
                    </b-button>

                    <b-button variant="danger" @click.prevent="openModal(client, 'delete')"><i class="fas fa-trash"></i>
                    </b-button>
                  </b-button-group>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="5" class="text-center">
                  Não há registros a serem mostrados
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-card-body>

      <div v-if="$resize && $mq.below(750)">
        <div v-if="!getClients.data" style="padding-top: 30px; padding-bottom: 30px">
          <b-skeleton-table animation="wave" :rows="5" :columns="1" :table-props="{ bordered: false, striped: false }">
          </b-skeleton-table>
        </div>

        <div v-else style="padding-top: 30px; padding-bottom: 30px">
          <div v-if="getClients.data.length > 0">
            <div class="accordion" role="tablist" v-for="client in getClients.data" :key="client.id">
              <div class="mb-1" style="border-bottom: 1px solid #dee2e6">
                <div header-tag="header" class="p-1" role="tab">
                  <div block v-b-toggle="client.id + 'a'" class="text-left responsive-table" variant="default">
                    <p>
                      <b>#{{ client.id }}</b> - {{ client.name_client }}
                    </p>
                    <span style="position: absolute; top: 5px; right: 5px">
                      <i class="fas fa-ellipsis-v"></i>
                    </span>
                  </div>
                </div>
                <b-collapse :id="client.id + 'a'" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <p><b>Telefone: </b>{{
                        client.telephone_client ? client.telephone_client : client.cellphone_client | phone
                    }}</p>
                    <p><b>CPF/CNPJ: </b>{{ client.document_client | document }}</p>
                    <p class="text-center">
                      <b-button-group size="sm">
                        <b-button variant="warning" @click.prevent="openModal(client, 'update')"><i
                            class="fas fa-pen"></i></b-button>

                        <b-button variant="danger" @click.prevent="openModal(client, 'delete')"><i
                            class="fas fa-trash"></i></b-button>
                      </b-button-group>
                    </p>
                  </b-card-body>
                </b-collapse>
              </div>
            </div>
          </div>
          <div class="text-center" v-else>
            Não há registros a serem mostrados
          </div>
        </div>
      </div>

      <div class="text-center" style="width: 100%">
        <div>
          <pagination :limit="1" :align="'center'" :data="getClients" @pagination-change-page="getResults"></pagination>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import SpinnerComponent from "../../spinnerComponent.vue";
import { cpf, cnpj } from "cpf-cnpj-validator";

export default {
  name: "clientsComponents",
  props: ["data"],
  components: {
    SpinnerComponent,
  },
  data() {
    return {
      cepError: false,
      isvalid: null,
      readonly: true,
      newclient: {},
      filter: {},
      modalFilter: false,
      ModalDelete: false,
      formClient: false,
      spinner: false,
      clientData: "",
      formAddClient: false,
      client: {},
      enable: true,
    };
  },

  created() {

    if (this.$route.query) {
      this.filter = this.$route.query
    }
    this.getResults()
  },
  computed: {
    getClients() {
      return this.$store.getters.clients;
    },
    getClientById() {
      return this.$store.getters.client;
    },
  },
  methods: {

    basicFilter() {
      let data = {
        apiUrl: 'clients',
        filter: this.filter
      }
      this.$store.dispatch("filter", data)
      this.$router.replace({ path: '/clients', query: this.filter })
      this.modalFilter = false
    },

    cpfValidate() {
      if (this.client.document_client.length < 15) {
        this.isvalid = cpf.isValid(this.client.document_client);
      } else {
        this.isvalid = cnpj.isValid(this.client.document_client);
      }
    },
    alert(title, variant, action, data = null) {
      this.toastCount++;
      if (data) {
        this.$bvToast.toast(
          "O cliente " + data.name_client + " foi " + action + " com sucesso",
          {
            title: title,
            autoHideDelay: 3000,
            variant: variant,
            appendToast: true,
          }
        );
      } else {
        this.$bvToast.toast(title, {
          title: title,
          autoHideDelay: 3000,
          variant: variant,
          appendToast: true,
        });
      }
    },

    goBack() {
      return this.$router.go(-1);
    },

    clearRegisters() {
      (this.newclient.id = ""),
        (this.newclient.name_client = ""),
        (this.newclient.document_client = ""),
        (this.newclient.telephone_client = ""),
        (this.newclient.cellphone_client = ""),
        (this.newclient.email_client = ""),
        (this.newclient.street_client = ""),
        (this.newclient.cep_client = ""),
        (this.newclient.city_client = ""),
        (this.newclient.district_client = ""),
        (this.newclient.juridic_person = ""),
        (this.newclient.number_client = ""),
        (this.newclient.state_client = "");
    },

    submitClient() {
      this.spinner = true;
      this.formClient = false;
      this.$store.dispatch(this.client.id ? "editClient" : "addClient", this.client).then(response => {
        this.client = {}
        this.spinner = false;
        this.$bvToast.toast(response.data.message, {
          autoHideDelay: 4000,
          variant: response.data.type,
          appendToast: true,
          noCloseButton: true,
          toaster: this.$resize && this.$mq.below(768) ? 'b-toaster-bottom-full' : 'b-toaster-top-right'
        })
        this.getResults()
      });
    },

    openModal(data, action) {

      switch (action) {
        case 'delete':
          this.ModalDelete = true;
          this.client = { ...data };
          break
        case 'update':
          this.formClient = true;
          this.client = { ...data };
          break
        case 'add':
          this.clearRegisters()
          this.client = {}
          this.formClient = true
          break
        case 'filter':
          this.modalFilter = true
          break

      }
    },

    searchCep() {
      this.readonly = false;
      let cep = this.client.cep_client.replace(/[^0-9]/gi, "");
      if (cep.length === 8) {
        this.$http
          .get("https://viacep.com.br/ws/" + cep + "/json/")
          .then((response) => {
            this.readonly = false;
            if (response.body.erro === true) {
              this.cepError = true;
              this.modal = true;
              this.client.cep_client = null;
              this.client.street_client = null;
              this.client.district_client = null;
              this.client.state_client = null;
              this.client.city_client = null;
            } else {
              this.cepError = false;
              this.client.street_client = response.data.logradouro;
              this.client.district_client = response.data.bairro;
              this.client.state_client = response.data.uf;
              this.client.city_client = response.data.localidade;
            }
            this.readonly = true;
          });
      } else {
        this.readonly = true;
        this.newclient.street_client = null;
        this.newclient.district_client = null;
        this.newclient.state_client = null;
        this.newclient.city_client = null;
      }
    },

    searchCepOnEdit() {
      this.readonly = false;
      let cep = this.client.cep_client.replace(/[^0-9]/gi, "");
      if (cep.length === 8) {
        this.$http
          .get("https://viacep.com.br/ws/" + cep + "/json/")
          .then((response) => {
            if (response.body.erro === true) {
              this.cepError = true;
              this.modal = true;
              this.client.cep_client = null;
              this.client.street_client = null;
              this.client.district_client = null;
              this.client.state_client = null;
              this.client.city_client = null;
            } else {
              this.cepError = false;
              // this.newclient.cep_client = null
              this.client.street_client = response.data.logradouro;
              this.client.district_client = response.data.bairro;
              this.client.state_client = response.data.uf;
              this.client.city_client = response.data.localidade;
              // document.getElementById('form-user-numero_' + this.historical.address.id).focus()
              this.readonly = true;
            }
          });
      } else {
        this.readonly = true;
        // this.newclient.cep_client = null
        this.client.street_client = null;
        this.client.district_client = null;
        this.client.state_client = null;
        this.client.city_client = null;
      }
    },

    deleteClient(client) {
      this.ModalDelete = false
      this.spinner = true;
      this.$store.dispatch("deleteClient", client).then(() => {
        this.$bvToast.toast("Cliente Excluido com sucesso", {
          autoHideDelay: 4000,
          variant: 'success',
          appendToast: true,
          noCloseButton: true,
          toaster: this.$resize && this.$mq.below(768) ? 'b-toaster-bottom-full' : 'b-toaster-top-right'
        })
        this.$store.dispatch("getClients")
        this.spinner = false
      });
    },

    getResults(page = 1) {
      let data = {
        page: page,
        filter: this.filter,
        apiUrl: 'clients'
      }
      this.$store.dispatch('filter', data)
    },
  }
};
</script>

<style scoped lang="css">
.fade {
  opacity: 1 !important;
  transition: opacity 0.15s linear;
}

.responsive-table {
  width: 100%;
  position: relative;
  padding-right: 30px;
}

.responsive-table p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>