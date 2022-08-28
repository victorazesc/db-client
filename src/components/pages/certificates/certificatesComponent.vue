<template>
  <div class="clients">
    <SpinnerComponent v-if="spinner" />

    <b-modal id="delete-certificado" v-model="ModalDelete" title="Deletar Certidão" size="md ">
      <template>
        <div>
          <b-row>
            <b-col md="12" class="text-center">
              <h5>Você tem certeza que deseja excluir esse certificado ?</h5>
            </b-col>
          </b-row>
        </div>
      </template>
      <template #modal-footer>
        <b-button b-button @click.prevent="
          $bvModal.hide('delete-certificado'), (certificateData = {})
        " variant="dark" style="margin-right: 5px">Cancel</b-button>
        <b-button type="submit" @click.prevent="deleteCertificate()" variant="danger">Deletar</b-button>
      </template>
    </b-modal>

    <b-modal id="add-certificate" v-model="editCertificate"
      :title="formCertificate.id ? 'Editar Certidão' : 'Adicionar Certidão'" size="xl" hide-footer>
      <template>
        <div>
          <b-form @submit.prevent="submitCertificate()">
            <b-row>
              <b-col md="3">
                <b-form-group id="emission_date" label="Data de Emissão:" label-for="emission_date">
                  <b-form-datepicker id="example-emission_date" required v-model="formCertificate.emission_date"
                    class="mb-2" placeholder="DD/MM/AAAA" locale="pt-BR"
                    :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                    aria-controls="example-input"> </b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col md="9">
                <b-form-group id="emission_date" label="Cliente:" label-for="emission_date">
                  <multiselect required v-model="formCertificate.client" id="ajax" label="name_client" track-by="id"
                    selectLabel="Selecionar" deselectLabel="Remover" selectedLabel="Selecionado"
                    placeholder="Digite para pesquisar" open-direction="bottom" :options="clientsFounds"
                    :preserve-search="true" :multiple="false" :searchable="true" :loading="isLoadingClient"
                    :internal-search="false" :clear-on-select="false" :close-on-select="true" :show-no-results="true"
                    :hide-selected="false" :custom-label="clientNameWithDocument" @search-change="searchClient">
                    <span slot="noOptions">A lista esta vazia.</span>
                    <span slot="noResult">Oops! Nada foi encontrado. Considere mudar a sua
                      busca.</span>
                  </multiselect>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group id="certificate_number" label="Numero da Certidão:" label-for="certificate_number">
                  <b-form-input id="certificate_number" v-model="formCertificate.certificate_number"
                    placeholder="Digite um numero para a certidão" required></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="9">
                <b-form-group id="certificate_name" label="Nome da Certidão:" label-for="certificate_name">
                  <b-form-input id="certificate_name" v-model="formCertificate.certificate_name"
                    placeholder="Digite um nome para certidão" required></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group id="alert_days" label="Dias para Vencimento:" label-for="alert_days">
                  <b-form-input id="alert_days" v-model="formCertificate.alert_days"
                    placeholder="Digite quantos dias para o aviso" required></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group id="emission_date" label="Data de Vencimento:" label-for="due_date">
                  <b-form-datepicker id="example-due_date" required v-model="formCertificate.due_date" class="mb-2"
                    placeholder="DD/MM/AAAA" locale="pt-BR"
                    :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                    aria-controls="example-input"> </b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Deseja ser notificado(a) por email ?" v-slot="{ ariaDescribedby }">
                  <b-form-radio-group id="radio-group-2" v-model="formCertificate.email_notification"
                    :aria-describedby="ariaDescribedby" required name="radio-sub-component">
                    <b-form-radio checked="1" value="1">Sim</b-form-radio>
                    <b-form-radio value="0">Não</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Observação:">
                  <b-form-textarea id="textarea" v-model="formCertificate.obs" placeholder="Observação..." rows="3"
                    max-rows="6"></b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>
            <hr />
            <div class="float-right">
              <b-button @click.prevent="
                $bvModal.hide('add-certificate'), (formCertificate = {})
              " variant="dark" style="margin-right: 5px">Cancel</b-button>
              <b-button type="submit" variant="primary">{{
                  formCertificate.id ? "Editar" : "Adicionar"
              }}</b-button>
            </div>
          </b-form>
        </div>
      </template>
    </b-modal>

    <b-modal id="filter" size="lg" centered v-model="modalFilter" title="Filtrar Certidões" hide-footer>
      <b-form action="#" @submit.prevent="basicFilter()">
        <b-row>
          <b-col md="4">
            <b-form-group id="emission_date" label="Data de Emissão:" label-for="emission_date">
              <b-form-datepicker id="emission_date-datepicker" v-model="filter.emission_date" class="mb-2"
                placeholder="DD/MM/AAAA" locale="pt-BR"
                :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                aria-controls="example-input"> </b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group id="emission_date" label="Data de Vencimento:" label-for="due_date">
              <b-form-datepicker id="due_date-datepicker" v-model="filter.due_date" class="mb-2"
                placeholder="DD/MM/AAAA" locale="pt-BR"
                :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                aria-controls="example-input"> </b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group id="alert_days" label="Dias para Vencimento:" label-for="alert_days">
              <b-form-input id="alert_days" v-model="filter.alert_days" placeholder="Digite quantos dias para o aviso">
              </b-form-input>
            </b-form-group>
          </b-col>

          <b-col md="12">
            <b-form-group id="emission_date" label="Cliente:" label-for="emission_date">
              <multiselect v-model="filter.client" id="ajax" label="name_client" track-by="id" selectLabel="Selecionar"
                deselectLabel="Remover" selectedLabel="Selecionado" placeholder="Digite para pesquisar"
                open-direction="bottom" :options="clientsFounds" :preserve-search="true" :multiple="false"
                :searchable="true" :loading="isLoadingClient" :internal-search="false" :clear-on-select="false"
                :close-on-select="true" :show-no-results="true" :hide-selected="false"
                :custom-label="clientNameWithDocument" @search-change="searchClient">
                <span slot="noOptions">A lista esta vazia.</span>
                <span slot="noResult">Oops! Nada foi encontrado. Considere mudar a sua
                  busca.</span>
              </multiselect>
            </b-form-group>
          </b-col>
          <b-col md="8">
            <b-form-group id="certificate_name" label="Nome da Certidão:" label-for="certificate_name">
              <b-form-input id="certificate_name" v-model="filter.certificate_name"
                placeholder="Digite um nome para certidão"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group id="certificate_number" label="Numero da Certidão:" label-for="certificate_number">
              <b-form-input id="certificate_number" v-model="filter.certificate_number"
                placeholder="Digite um numero para a certidão"></b-form-input>
            </b-form-group>
          </b-col>

        </b-row>
        <hr />
        <div class="text-right">
          <b-button @click.prevent="modalFilter = false, filter = {}, getResults()" variant="dark"
            style="margin-right: 5px">Cancel</b-button>
          <b-button type="submit" variant="primary">Filtrar</b-button>
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
              <b-dropdown-item @click.prevent="modalFilter = true">Filtrar</b-dropdown-item>
              <b-dropdown-item v-b-modal="'add-certificate'">Novo</b-dropdown-item>
              <b-dropdown-item @click.prevent="goBack()">Voltar</b-dropdown-item>
            </b-dropdown>
          </template>
          <template v-else>
            <b-button @click.prevent="modalFilter = true" variant="dark"><i class="fa fa-filter"></i></b-button>
            <b-button v-b-modal="'add-certificate'" variant="success">Novo</b-button>
            <b-button @click.prevent="goBack()" variant="primary">Voltar</b-button>
          </template>

        </b-col>
      </b-row>

      <!-- campos Filtrados -->
      <b-row>
        <div class="container-fluid">
          <span v-for="(field, index) in filter" :key="index">
            <template v-if="field && field.length > 0">
              <button class="btn btn-danger btn-sm" @click.prevent="delete filter[index], basicFilter()">
                <i class="fa fa-times"></i><b> {{ index | translate }}: </b>
                {{ index === 'emission_date' ? emission_date : index === 'due_date' ? due_date : field }}
              </button>
            </template>

            <template v-if="index === 'client' && field.name_client">
              <button class="btn btn-danger btn-sm" @click.prevent="delete filter[index], basicFilter()">
                <i class="fa fa-times"></i><b> {{ index | translate }}: </b>
                {{ field.name_client }}
              </button>
            </template>
          </span>
        </div>
      </b-row>

      <b-card-body class="d-none d-sm-block" v-if="$resize && $mq.above(750)">
        <b-skeleton-table v-if="!certificates.data" animation="wave" :rows="5" :columns="6"
          :table-props="{ bordered: false, striped: false }"></b-skeleton-table>
        <div v-else class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Nome da Certidão</th>
                <th>Nome do Cliente</th>
                <th>Data de Emissão</th>
                <th>Data de Vencimento</th>
                <th>Grau de Complexidade</th>
                <th>status</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody v-if="certificates.data.length > 0">
              <tr v-for="certificate in certificates.data" :key="certificate.id">
                <td>{{ certificate.certificate_name }}</td>
                <td>{{ certificate.client.name_client }}</td>
                <td>{{ certificate.emission_date | date }}</td>
                <td>{{ certificate.due_date | date }}</td>
                <td>
                  {{ certificate.alert_days }}
                  Dias (
                  <span v-if="certificate.alert_days >= '30'">Alta Complexidade</span>
                  <span v-else-if="certificate.alert_days < '30'">Média Complexidade</span>
                  <span v-else-if="certificate.alert_days <= '10'">Baixa Complexidade</span>
                  )
                </td>
                <td>
                  <h5 v-if="certificate.status === 'Vencido'">
                    <b-badge pill variant="danger">{{
                        certificate.status
                    }}</b-badge>
                  </h5>
                  <h5 v-else-if="certificate.status === 'Vigente'">
                    <b-badge pill variant="success">{{
                        certificate.status
                    }}</b-badge>
                  </h5>
                  <h5 v-else-if="certificate.status === 'A Vencer'">
                    <b-badge pill variant="warning">{{
                        certificate.status
                    }}</b-badge>
                  </h5>
                </td>
                <td>
                  <b-button-group size="sm">
                    <b-button variant="warning" @click.prevent="openModal(certificate, 2)"><i class="fas fa-pen"></i>
                    </b-button>
                    <b-button variant="danger" @click.prevent="openModal(certificate, 3)"><i class="fas fa-trash"></i>
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
        <div v-if="!certificates.data" style="padding-top: 30px; padding-bottom: 30px">
          <b-skeleton-table animation="wave" :rows="5" :columns="1" :table-props="{ bordered: false, striped: false }">
          </b-skeleton-table>
        </div>
        <div v-else style="padding-top: 30px; padding-bottom: 30px">
          <div v-if="certificates.data.length > 0">
            <div class="accordion" role="tablist" v-for="certificate in certificates.data" :key="certificate.id">
              <div class="mb-1" style="border-bottom: 1px solid #dee2e6">
                <div header-tag="header" class="p-1" role="tab">
                  <div block v-b-toggle="certificate.id + 'a'" class="text-left responsive-table" variant="default">
                    <p>
                      <b>#{{ certificate.id }}</b> -
                      {{ certificate.certificate_name }}
                    </p>
                    <span style="position: absolute; top: 5px; right: 5px">
                      <i class="fas fa-ellipsis-v"></i>
                    </span>
                  </div>
                </div>
                <b-collapse :id="certificate.id + 'a'" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <p>
                      <b>Nome da Certidão:</b>{{ certificate.certificate_name }}
                    </p>
                    <p>
                      <b>Nome do Cliente:</b>{{ certificate.client.name_client }}
                    </p>
                    <p>
                      <b>Data de Emissão:</b>{{ certificate.emission_date | date }}
                    </p>
                    <p>
                      <b>Data de Vencimento:</b>{{ certificate.due_date | date }}
                    </p>
                    <p>
                      <b>Grau de Complexidade:</b>
                      {{ certificate.alert_days }}
                      Dias (
                      <span v-if="certificate.alert_days >= '30'">Alta Complexidade</span>
                      <span v-else-if="certificate.alert_days < '30'">Média Complexidade</span>
                      <span v-else-if="certificate.alert_days <= '10'">Baixa Complexidade</span>
                      )
                    </p>
                    <span>
                      <b>Status:</b>
                      <h5 v-if="certificate.status === 'Vencido'">
                        <b-badge pill variant="danger">{{
                            certificate.status
                        }}</b-badge>
                      </h5>
                      <h5 v-else-if="certificate.status === 'Vigente'">
                        <b-badge pill variant="success">{{
                            certificate.status
                        }}</b-badge>
                      </h5>
                      <h5 v-else-if="certificate.status === 'A Vencer'">
                        <b-badge pill variant="warning">{{
                            certificate.status
                        }}</b-badge>
                      </h5>
                    </span>
                    <p class="text-center">
                      <b-button-group size="sm">
                        <b-button variant="warning" @click.prevent="openModal(certificate, 2)"><i
                            class="fas fa-pen"></i></b-button>
                        <b-button variant="danger" @click.prevent="openModal(certificate, 3)"><i
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
          <pagination :limit="1" :align="'center'" :data="certificates" @pagination-change-page="getResults">
          </pagination>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import moment from "moment";
import SpinnerComponent from "../../spinnerComponent.vue";
export default {
  name: "clientsComponents",
  props: ["data"],
  components: {
    Multiselect,
    SpinnerComponent,
  },
  data() {
    return {
      date: new Date(),
      modalFilter: false,
      filter: {},
      cepError: false,
      isvalid: null,
      readonly: true,
      newCertificate: false,
      editCertificate: false,
      ModalDelete: false,
      formCertificate: {},
      clientsFounds: [],
      isLoadingClient: false,
      ClientSelected: null,
      spinner: false,
      today: "",
      certificateData: {},
      formClient: {},
    };
  },

  computed: {
    certificates() {
      return this.$store.getters.certificates;
    },
    emission_date() {
      return moment(this.filter.emission_date).format('DD/MM/YYYY');
    },
    due_date() {
      return moment(this.filter.due_date).format('DD/MM/YYYY');
    }
  },

  methods: {
    basicFilter() {
      let client = null
      let emission_date = null

      if (this.filter.client) {
        client = this.filter.client
        this.filter.client = this.filter.client.id
      }
      if (this.filter.emission_date) {
        emission_date = this.filter.emission_date
        this.filter.emission_date = moment(this.filter.emission_date).format('YYYY-MM-DD')
      }


      let data = {
        apiUrl: 'certificates',
        filter: this.filter
      }

      this.$store.dispatch("filter", data)
      this.modalFilter = false

      if (this.filter.emission_date) {
        this.filter.emission_date = emission_date
      }

      if (this.filter.client) {
        this.filter.client = client
      }

    },

    deleteCertificate() {
      this.ModalDelete = false;
      this.spinner = true;
      this.$store
        .dispatch("deleteCertificate", this.certificateData)
        .then((response) => {
          this.spinner = false;
          this.getResults()
          if (response.status === 200) {
            this.$bvToast.toast("O certificado foi Excluido com sucesso", {
              autoHideDelay: 3000,
              variant: "success",
              noCloseButton: true,
              appendToast: true,
            });
          } else {
            this.$bvToast.toast("Erro ao Excluir certificado", {
              autoHideDelay: 3000,
              variant: "danger",
              noCloseButton: true,
              appendToast: true,
            });
          }
        });
    },

    searchClient(query) {
      this.isLoadingClient = true;
      if (query.length > 3) {
        this.$store
          .dispatch("getAllClients", query)
          .then(
            (resp) => (
              (this.clientsFounds = resp), (this.isLoadingClient = false)
            )
          );
      } else {
        this.clientsFounds = [];
      }
    },

    clientNameWithDocument({ name_client, document_client }) {
      return `${name_client} — ${document_client}`;
    },

    getResults(page = 1) {
      let data = {
        page: page,
        filter: this.filter,
        apiUrl: 'certificates'
      }
      this.$store.dispatch('filter', data)
    },
    openModal(data = null, type) {
      if (type === 1) {
        this.newCertificate = true;
      } else if (type === 2) {
        this.editCertificate = true;
        this.formCertificate = { ...data };
      } else if (type === 3) {
        this.ModalDelete = true;
        this.certificateData = data;
      }
    },


    submitCertificate() {
      this.spinner = true;
      this.$bvModal.hide("add-certificate");
      this.$store.dispatch(this.formCertificate.id ? "editCertificate" : "addCertificate", this.formCertificate).then(response => {
        this.$bvToast.toast(response.data.message, {
          autoHideDelay: 4000,
          variant: response.data.type,
          appendToast: true,
          noCloseButton: true,
          toaster:
            this.$resize && this.$mq.below(768)
              ? "b-toaster-bottom-full"
              : "b-toaster-top-right",
        });
        this.getResults()
        this.formCertificate = {};
        this.spinner = false;

      });
    },
  },

  created() {
    this.today = moment().format("YYYY-MM-DD h:mm:ss");
    this.getResults()
  },
};
</script>

<style scoped  lang="css">
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