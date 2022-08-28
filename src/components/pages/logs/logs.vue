<template>

  <section>

    <SpinnerComponent v-if="spinner" />

    <b-modal id="filter" size="lg" centered v-model="modalFilter" title="Filtrar Logs" hide-footer>

      <b-form @submit.prevent="basicFilter()">

        <b-form-group id="input-group-2" label="Nome:" label-for="input-2">
          <b-form-input id="input-2" v-model="filter.first_name" placeholder="Entre com o nome"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Sobrenome:" label-for="input-2">
          <b-form-input id="input-2" v-model="filter.last_name" placeholder="Entre com o sobrenome"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Ação:" label-for="input-3">
          <b-form-select id="input-3" v-model="filter.action" :options="actions"></b-form-select>
        </b-form-group>

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
              <template #button-content><i class="fa fa-stream"></i></template>
              <b-dropdown-item @click.prevent="modalFilter = true">Filtrar</b-dropdown-item>
              <b-dropdown-item>
                <download-excel :class="logs.data.length > 0 ? '' : 'disabled'" :data="logs.data">Baixar Excel
                </download-excel>
              </b-dropdown-item>
              <b-dropdown-item @click.prevent="downloadPdf()">Baixar PDF</b-dropdown-item>
              <b-dropdown-item @click.prevent="goBack()">Voltar</b-dropdown-item>
            </b-dropdown>
          </template>
          <template v-else>
            <div class="btn-group mr-2" role="group" aria-label="Second group">
              <download-excel class="btn btn-dark" :class="logs.data.length > 0 ? '' : 'disabled'" :data="logs.data">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 172 172"
                  style=" fill:#ffffff;">
                  <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                    stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                    font-family="none" font-weight="none" font-size="none" text-anchor="none"
                    style="mix-blend-mode: normal">
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <g fill="#ffffff">
                      <path
                        d="M44.79167,14.33333c-8.89025,0 -16.125,7.23475 -16.125,16.125v111.08333c0,8.89025 7.23475,16.125 16.125,16.125h82.41667c8.89025,0 16.125,-7.23475 16.125,-16.125v-69.875h-41.20833c-8.89025,0 -16.125,-7.23475 -16.125,-16.125v-41.20833zM96.75,17.48275v38.05892c0,2.96342 2.41158,5.375 5.375,5.375h38.05892zM73.59831,89.58333c1.72501,0.04602 3.39857,0.91683 4.39518,2.48454l8.00651,12.58366l8.00651,-12.57666c1.59817,-2.50833 4.92103,-3.24269 7.41862,-1.65169c2.50117,1.59458 3.24269,4.92087 1.65169,7.42562l-10.70801,16.81787l10.70801,16.81787c1.591,2.50475 0.84948,5.83104 -1.65169,7.42562c-0.89225,0.56975 -1.88747,0.83984 -2.87647,0.83984c-1.77375,0 -3.51374,-0.88262 -4.54215,-2.49153l-8.00651,-12.57666l-8.00651,12.58366c-1.02125,1.60533 -2.7684,2.48454 -4.54215,2.48454c-0.989,0 -1.98763,-0.27368 -2.88347,-0.83984c-2.50117,-1.59458 -3.23569,-4.91387 -1.64469,-7.41862l10.70801,-16.82487l-10.70801,-16.82487c-1.591,-2.50475 -0.85647,-5.82404 1.64469,-7.41862c0.93794,-0.59528 1.99544,-0.86745 3.03044,-0.83984z">
                      </path>
                    </g>
                  </g>
                </svg>
              </download-excel>
              <b-button @click.prevent="downloadPdf()" :disabled="logs.length < 1" variant="success">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 172 172"
                  style=" fill:#ffffff;">
                  <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                    stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                    font-family="none" font-weight="none" font-size="none" text-anchor="none"
                    style="mix-blend-mode: normal">
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <g fill="#ffffff">
                      <path
                        d="M40.13333,17.2c-6.33533,0 -11.46667,5.13133 -11.46667,11.46667v120.4c0,6.33533 5.13133,11.46667 11.46667,11.46667h91.73333c6.33533,0 11.46667,-5.13133 11.46667,-11.46667v-88.86667c0,-1.51933 -0.60182,-2.97578 -1.67969,-4.05365l-37.26667,-37.26667c-1.07787,-1.07787 -2.53431,-1.67969 -4.05364,-1.67969zM97.46667,28.11797l34.9487,34.9487h-29.21536c-3.1648,0 -5.73333,-2.56853 -5.73333,-5.73333zM80.71458,70.52448c3.1132,0 5.7233,1.31571 7.34583,3.70651c1.3072,1.91493 1.93724,4.37713 1.93724,7.5362c0,5.418 -2.42538,13.92385 -6.20365,23.03411c1.8232,4.13373 3.95018,8.22724 6.21485,11.94817c5.2632,0.0344 12.49857,0.5134 18.39817,2.49714c8.49107,2.84373 10.27969,7.52303 10.27969,10.95156c-0.00573,4.9364 -4.00975,10.26849 -12.81042,10.26849c-6.50733,0 -13.76108,-6.60203 -20.02188,-15.64349c-4.56373,0.14907 -8.89867,0.59456 -12.8776,1.26537c-7.2928,11.93106 -15.5574,21.26484 -21.85834,21.26484c-6.92587,0 -9.26068,-6.84148 -9.26068,-9.96614c0,-9.8212 12.42154,-15.62737 26.14713,-18.46536c2.59147,-4.42041 5.10025,-9.19994 7.26745,-13.94141c-3.19347,-7.91773 -5.16224,-15.65988 -5.16224,-21.41042c0,-3.6464 0.74919,-6.59996 2.22839,-8.80156c1.84613,-2.74053 4.82711,-4.24401 8.37604,-4.24401zM80.70339,78.54219c-1.24413,0 -1.52408,0.42454 -1.71328,0.70547c-0.32107,0.47587 -0.86224,1.67359 -0.86224,4.32239c0,2.93547 0.5865,6.36946 1.6013,10.04453c1.50213,-4.68987 2.35998,-8.95744 2.23958,-12.34011c-0.09173,-2.72907 -0.74936,-2.73229 -1.26536,-2.73229zM95.77578,125.01354c3.68653,4.51787 7.29146,7.42421 10.08933,7.42421c3.3024,0 4.78151,-1.12705 4.78151,-2.25078c0.00573,-1.05493 -1.87444,-2.36777 -4.79271,-3.34817c-2.6488,-0.88867 -6.11066,-1.50419 -10.07813,-1.82526zM61.62214,128.85442c-7.25267,2.44813 -11.74662,5.63201 -11.74662,8.52162c0.00573,0 0.3259,1.94843 1.23177,1.94843c2.17867,-0.1548 6.14604,-4.31245 10.51484,-10.47005z">
                      </path>
                    </g>
                  </g>
                </svg>
              </b-button>

              <div class="btn-group" role="group" aria-label="Second group">
                <b-button @click.prevent="modalFilter = true" variant="dark"><i class="fa fa-filter"></i></b-button>
              </div>
              <div class="btn-group" role="group" aria-label="Second group">
                <b-button @click.prevent="goBack()" variant="primary">Voltar</b-button>
              </div>
            </div>
          </template>

        </b-col>
        <b-col>
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

        </b-col>
      </b-row>
      <b-card-body class="d-none d-sm-block" v-if="$resize && $mq.above(750)">
        <div class="table-responsive">
          <table class="table table-sm table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Ação</th>
                <th>Descrição</th>
                <th>Usuário</th>
                <th>Data</th>
                <th>Identificador</th>
                <th>Pagina</th>
              </tr>
            </thead>
            <tbody v-if="logs.data.length > 0">
              <tr v-for="(log, index) in logs.data" :key="index">
                <td>{{ log.id }}</td>
                <td>
                  <span v-if="log.action === 'delete'" class="badge bg-danger text-light">{{ log.action }}</span>
                  <span v-else-if="log.action === 'update'" class="badge bg-warning text-light">{{ log.action }}</span>
                  <span v-else-if="log.action === 'create'" class="badge bg-success text-light">{{ log.action }}</span>
                </td>
                <td>{{ log.extra_info }}</td>
                <td>{{ log.user.first_name }} {{ log.user.last_name }}</td>
                <td>{{ log.created_at | dateTime }}</td>
                <td>{{ log.send_id }}</td>
                <td>
                  <router-link :to="log.route">{{ log.route }}</router-link>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="7" class="text-center">
                  Não há registros a serem mostrados
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-card-body>

      <div v-if="$resize && $mq.below(750)">
        <div style="padding-top: 30px; padding-bottom: 30px">
          <div v-if="logs.data.length > 0">
            <div class="accordion" role="tablist" v-for="log in logs.data" :key="log.id">
              <div class="mb-1" style="border-bottom: 1px solid #dee2e6">
                <div header-tag="header" class="p-1" role="tab">
                  <div block v-b-toggle="log.id + 'a'" class="text-left responsive-table" variant="default">
                    <p><b> <span v-if="log.action === 'delete'" class="badge bg-danger text-light">{{ log.action
                    }}</span>
                        <span v-else-if="log.action === 'update'" class="badge bg-warning text-light">{{ log.action
                        }}</span>
                        <span v-else-if="log.action === 'create'" class="badge bg-success text-light">{{ log.action
                        }}</span></b> - {{ log.extra_info }}</p>
                    <span style="position: absolute; top: 5px; right: 5px">
                      <i class="fas fa-ellipsis-v"></i>
                    </span>
                  </div>
                </div>
                <b-collapse :id="log.id + 'a'" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <p><b>Usuário:</b> {{ log.user.first_name }} {{ log.user.last_name }}</p>
                    <p><b>Data:</b> {{ log.created_at | dateTime }}</p>
                    <p><b>Identificador:</b> {{ log.send_id }}</p>
                    <p><b>Pagina:</b>
                      <router-link :to="log.route">{{ log.route }}</router-link>
                    </p>
                  </b-card-body>
                </b-collapse>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center" style="width: 100%">
        <div>
          <pagination :limit="1" :align="'center'" :data="logs" @pagination-change-page="getResults"></pagination>
        </div>
      </div>
    </b-card>
  </section>
</template>

<script>
import SpinnerComponent from '../../spinnerComponent.vue';
export default {
  name: "Logs",
  components: {
    SpinnerComponent
  },
  data() {
    return {
      filter: {},
      modalFilter: false,
      spinner: false,
      apiDomain: '',
      actions: ['Criar', 'Editar', 'Deletar']
    }
  },
  computed: {
    logs() {
      return this.$store.getters.logs;
    },
  },
  methods: {
    goBack() {
      return this.$router.go(-1);
    },
    getResults(page = 1) {
      let data = {
        page: page,
        filter: this.filter,
        apiUrl: 'logs'
      }
      this.$store.dispatch('filter', data)
    },

    basicFilter() {
      let data = {
        apiUrl: 'logs',
        filter: this.filter
      }
      this.$store.dispatch("filter", data)
      this.$router.replace({ name: 'logs', query: this.filter })
      this.modalFilter = false
    },

    clearLogs() {
      this.spinner = true
      this.$store.dispatch('clearLogs').then(response => {
        this.spinner = false
        this.$bvToast.toast(response.data.message, {
          autoHideDelay: 4000,
          variant: response.data.type,
          appendToast: true,
          noCloseButton: true,
          toaster: this.$resize && this.$mq.below(768) ? 'b-toaster-bottom-full' : 'b-toaster-top-right'
        })

        this.$store.dispatch("getLogs").then((resp) => {
          this.logs = resp;
        })
      })
    },

    downloadPdf() {
      this.spinner = true
      this.$store.dispatch('downloadPdf').then(response => {
        window.open(response.data.url, '_blank').focus();
        setTimeout(() =>
          this.$store.dispatch('deleteFile', { name: response.data.name }).then(() => {
          })
          , 4000);
        this.spinner = false

      })
    }
  },
  created() {
    this.getResults()

    if (window.location.hostname === 'localhost') {
      this.apiDomain = 'http://' + window.location.hostname + ':8000/'
    } else {
      this.apiDomain = 'https://azevedoseg.com/db/public/'
    }

  },
};
</script>

<style>
</style>