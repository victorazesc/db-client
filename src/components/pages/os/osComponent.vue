<template>
  <section>
    <SpinnerComponent v-if="spinner" />
    <b-modal id="delete-os" v-model="deleteModal" size="lg" centered title="Excluir Serviço" hide-footer>
      <div>
        <br />
        <h5 class="text-center">
          Você realmente deseja excluir <strong>{{ service.service_name }}</strong> e todos os dados ligados a
          ele?
        </h5>
        <br />

        <b-button type="submit" variant="dark" @click.prevent="deleteModal = false">Fechar</b-button>{{ '' }}
        <b-button type="submit" @click.prevent="deleteOs(service)" variant="primary">Deletar</b-button>
      </div>
    </b-modal>

    <b-modal id="edit-service" v-model="formEditModal" size="md" title="Editar Serviço" hide-footer>
      <div>
        <b-form action="#" @submit.prevent="submitService(service.id)">
          <b-form-row>
            <label for="">Nome*</label>
            <input type="text" name="name" v-model="service.service_name" class="form-control" required>
          </b-form-row>

          <b-form-row>
            <label for="">Preço*</label>
            <money class="form-control" v-model="service.amount" required></money>
          </b-form-row>

          <b-form-row>
            <label for="">Descrição</label>
            <textarea rows="4" cols="" class="form-control" v-model="service.service_description"></textarea>
          </b-form-row>
          <br>

          <b-button type="submit" variant="dark" @click.prevent="formEditModal = false">Fechar</b-button>{{ '' }}
          <b-button type="submit" variant="primary">Salvar</b-button>
        </b-form>
      </div>
    </b-modal>

    <b-modal id="filter" size="md" centered v-model="modalFilter" title="Filtrar Propostas" hide-footer>
      <b-form action="#" @submit.prevent="basicFilter()">
        <b-form-row>
          <b-col md="12" sm="12">
            <b-form-group id="client_name" label="Cliente:">
              <b-form-input v-model="filter.name_client" placeholder="Nome"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group id="create_date_final" label="Data:" label-for="create_date_final">
              <b-form-datepicker id="example-created_at" v-model="filter.created_at" class="mb-2"
                placeholder="DD/MM/AAAA" locale="pt-BR"
                :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                aria-controls="example-input"> </b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group id="value" label="Valor:" label-for="amount_initial">
              <money type="text" name="value" v-model="filter.amount" id="amount" class="form-control" />
            </b-form-group>
          </b-col>

        </b-form-row>

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
          <h4 class="d-block d-sm-none">{{ $route.meta.mobileTitle }}</h4>
        </b-col>
        <b-col cols="7" class="text-right">
          <template v-if="$resize && $mq.below(750)">
            <b-dropdown right>
              <template #button-content>
                <i class="fa fa-stream"></i>
              </template>
              <b-dropdown-item @click.prevent="modalFilter = true">Filtrar</b-dropdown-item>
              <b-dropdown-item :to="{ name: 'osCreate' }">Novo</b-dropdown-item>
              <b-dropdown-item @click.prevent="goBack()">Voltar</b-dropdown-item>
            </b-dropdown>
          </template>
          <template v-else>
            <b-button @click.prevent="modalFilter = true" variant="dark"><i class="fa fa-filter"></i></b-button>
            <router-link class="btn btn-success" :to="{ name: 'osCreate' }" variant="success">Novo</router-link>
            <b-button @click.prevent="goBack()" variant="primary">Voltar</b-button>
          </template>

        </b-col>
      </b-row>

      <b-row>
        <div class="container-fluid">
          <span v-for="(field, index) in filter" :key="index">
            <template v-if="field && field.length > 0">
              <button class="btn btn-danger btn-sm" @click.prevent="delete filter[index], basicFilter()">
                <i class="fa fa-times"></i><b> {{ index | translate }}: </b>
                {{ field }}
              </button>
            </template>
          </span>
        </div>
      </b-row>

      <b-card-body class="table-responsive" v-if="$resize && $mq.above(750)">
        <b-skeleton-table v-if="!getOs.data" animation="wave" :rows="5" :columns="6"
          :table-props="{ bordered: false, striped: false }"></b-skeleton-table>
        <div v-else>
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Valor</th>
                <th>Data de Criação</th>
                <th>Ações</th>

              </tr>
            </thead>
            <tbody v-if="getOs.data.length > 0">
              <tr v-for="s in  getOs.data" :key="s.id">
                <td>{{ s.id }}</td>
                <td>{{ s.client.name_client }}</td>
                <td v-if="s.amount">
                  <money class="viewOnly" style="position: absolute" v-bind="money" v-model="s.amount" disabled></money>
                </td>
                <td v-else>R$ 0,00</td>
                <td>{{ s.created_at | dateTime }}</td>
                <td>
                  <b-button-group size="sm">
                    <router-link class="btn btn-warning" type="button" :to="'edit/' + s.id"><i class="fas fa-pen"></i>
                    </router-link>
                    <button class="btn btn-danger" type="button" @click="openModal(s, 'delete')"><i
                        class="fas fa-trash"></i></button>
                    <b-button @click.prevent="downloadPdf(s)" variant="dark"
                      style="font-size: 17px; padding: 2px 10px;"><i class="fas fa-file-pdf"></i></b-button>
                  </b-button-group>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="5" class="text-center">
                  Não a registros a serem mostrados
                </td>
              </tr>
            </tbody>

          </table>
        </div>

      </b-card-body>

      <div v-if="$resize && $mq.below(750)">

        <div v-if="!getOs.data" style="padding-top: 30px; padding-bottom: 30px;">

          <b-skeleton-table animation="wave" :rows="5" :columns="1" :table-props="{ bordered: false, striped: false }">
          </b-skeleton-table>

        </div>

        <div v-else style="padding-top: 30px; padding-bottom: 30px;">
          <div v-if="getOs.data.length > 0">
            <div class="accordion" role="tablist" v-for="s in getOs.data" :key="s.id">
              <div class="mb-1" style="border-bottom: 1px solid #dee2e6">
                <div header-tag="header" class="p-1" role="tab">
                  <div block v-b-toggle="s.id + 'a'" class="text-left responsive-table" variant="default">
                    <p>
                      <b>#{{ s.id }}</b> - {{ s.client.name_client }}
                    </p>
                    <span style="position: absolute; top: 5px; right: 5px">
                      <i class="fas fa-ellipsis-v"></i>
                    </span>
                  </div>
                </div>
                <b-collapse :id="s.id + 'a'" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <p><b>Nome:</b> {{ s.client.name_client }}</p>
                    <p v-if="s.amount"><b>Valor:</b>
                      <money class="viewOnly" v-model="s.amount" disabled></money>
                    </p>
                    <p v-else><b>Valor:</b>R$ 00,00 </p>
                    <p v-if="s.service_description"><b>Descrição:</b>{{ s.service_description }}</p>
                    <p class="text-center">

                      <b-button-group size="sm">
                        <router-link class="btn btn-warning" type="button" :to="'edit/' + s.id"><i
                            class="fas fa-pen"></i></router-link>
                        <button class="btn btn-danger" type="button" @click="openModal(s, 'delete')"><i
                            class="fas fa-trash"></i></button>
                        <b-button @click.prevent="downloadPdf(s)" variant="dark"
                          style="font-size: 17px; padding: 2px 10px;"><i class="fas fa-file-pdf"></i></b-button>
                      </b-button-group>

                    </p>
                  </b-card-body>
                </b-collapse>
              </div>
            </div>
          </div>
          <div class="text-center" v-else> Não há registros a serem mostrados</div>
        </div>
      </div>

      <div class="text-center">
        <pagination :limit="1" :align="'center'" :data="getOs" @pagination-change-page="getResults"></pagination>
      </div>
    </b-card>
  </section>
</template>

<script>
import moment from "moment";
import SpinnerComponent from '../../spinnerComponent.vue';
export default {
  name: "servicesComponents",
  components: {
    SpinnerComponent
  },
  data() {
    return {
      formAddModal: false,
      modalFilter: false,
      formEditModal: false,
      deleteModal: false,
      Services: false,
      service: {},
      filter: {},
      spinner: false,
      newService: {},
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false
      }
    }
  },

  created() {
    this.$store.dispatch('getOs')
  },

  computed: {
    getOs() {
      return this.$store.getters.os
    },
    created_date() {
      return moment(this.filter.created_at).format('DD/MM/YYYY');
    },
  },
  methods: {
    downloadPdf(os) {
      this.spinner = true;

      this.$store.dispatch('osPdf', { id: os.id }).then(response => {
        window.open(response.data.url, '_blank').focus();
        setTimeout(() =>
          this.$store.dispatch('deleteFile', { name: response.data.name }).then(() => {
          })
          , 4000);
        this.spinner = false
      })

    },

    basicFilter() {

      let created_at = null


      if (this.filter.created_at) {
        created_at = this.filter.created_at
        this.filter.created_at = moment(this.filter.created_at).format('YYYY-MM-DD')
      }


      let data = {
        apiUrl: 'os',
        filter: this.filter
      }

      this.$store.dispatch("filter", data)
      this.modalFilter = false

      if (this.filter.created_at) {
        this.filter.created_at = created_at
      }

      this.filter = { ...this.filter }

    },


    alert(title, variant, action, data) {
      this.toastCount++;
      this.$bvToast.toast(
        'O Serviço ' + data.service_name + ' foi ' + action + ' com sucesso',
        {
          title: title,
          autoHideDelay: 3000,
          variant: variant,
          appendToast: true,
        }
      );
    },


    submitService(id) {

      if (id) {
        this.$store.dispatch('updateOs', this.service).then(() => {
          this.formEditModal = false
          this.$store.dispatch('getOs').then(() => {
            this.alert('Serviço Editado com sucesso', 'success', 'editado', this.service)
          })

        })
      } else {
        this.$store.dispatch('addService', this.newService).then(() => {
          this.formAddModal = false
          this.$store.dispatch('getOs')
        })
      }


    },

    deleteOs(service) {
      this.spinner = true
      this.$store.dispatch('deleteOs', service.id).then(
        this.alert('Serviço Excluido com sucesso', 'success', 'excluido', service),
        this.$store.dispatch('getOs'),
        this.spinner = false,
        this.deleteModal = false
      )
    },


    openModal(data, action) {
      if (action === 'update') {
        this.service = data
        this.formEditModal = true
      }

      if (action === 'delete') {
        this.service = data
        this.deleteModal = true
      }

    },
    goBack() {
      return this.$router.go(-1)
    },
    getResults(page = 1) {
      let data = {
        page: page,
        filter: this.filter,
        apiUrl: 'os'
      }
      this.$store.dispatch('filter', data)
    },
  }
}
</script>

<style scoped>
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