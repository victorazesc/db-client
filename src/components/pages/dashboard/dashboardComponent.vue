<template>
  <div>

    <div class="container-fluid">

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
                  Dias
                  (
                  <span v-if="certificate.alert_days >= '30'">Alta Complexidade</span>
                  <span v-else-if="certificate.alert_days < '30'">Média Complexidade</span>
                  <span v-else-if="certificate.alert_days <= '10'">Baixa Complexidade</span>
                  )
                </td>
                <td>
                  <h5 v-if="certificate.status === 'Vencido'">
                    <b-badge pill variant="danger">{{ certificate.status }}</b-badge>
                  </h5>
                  <h5 v-else-if="certificate.status === 'Vigente'">
                    <b-badge pill variant="success">{{ certificate.status }}</b-badge>
                  </h5>
                  <h5 v-else-if="certificate.status === 'A Vencer'">
                    <b-badge pill variant="warning">{{ certificate.status }}</b-badge>
                  </h5>
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
        <div v-if="!certificates.data" style="padding-top: 30px; padding-bottom: 30px;">
          <b-skeleton-table animation="wave" :rows="5" :columns="1" :table-props="{ bordered: false, striped: false }">
          </b-skeleton-table>
        </div>
        <div v-else style="padding-top: 30px; padding-bottom: 30px;">
          <div v-if="certificates.data.length > 0">
            <div class="accordion" role="tablist" v-for="certificate in certificates.data" :key="certificate.id">
              <div class="mb-1" style="border-bottom: 1px solid #dee2e6">
                <div header-tag="header" class="p-1" role="tab">
                  <div block v-b-toggle="certificate.id + 'a'" class="text-left responsive-table" variant="default">
                    <p>
                      <b>#{{ certificate.id }}</b> - {{ certificate.certificate_name }}
                    </p>
                    <span style="position: absolute; top: 5px; right: 5px">
                      <i class="fas fa-ellipsis-v"></i>
                    </span>
                  </div>
                </div>
                <b-collapse :id="certificate.id + 'a'" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <p><b>Nome da Certidão:</b>{{ certificate.certificate_name }}</p>
                    <p><b>Nome do Cliente:</b>{{ certificate.client.name_client }}</p>
                    <p><b>Data de Emissão:</b>{{ certificate.emission_date | date }}</p>
                    <p><b>Data de Vencimento:</b>{{ certificate.due_date | date }}</p>
                    <p>
                      <b>Grau de Complexidade:</b>
                      {{ certificate.alert_days }}
                      Dias
                      (
                      <span v-if="certificate.alert_days >= '30'">Alta Complexidade</span>
                      <span v-else-if="certificate.alert_days < '30'">Média Complexidade</span>
                      <span v-else-if="certificate.alert_days <= '10'">Baixa Complexidade</span>
                      )
                    </p>
                    <span>
                      <b>Status:</b>
                      <h5 v-if="certificate.status === 'Vencido'">
                        <b-badge pill variant="danger">{{ certificate.status }}</b-badge>
                      </h5>
                      <h5 v-else-if="certificate.status === 'Vigente'">
                        <b-badge pill variant="success">{{ certificate.status }}</b-badge>
                      </h5>
                      <h5 v-else-if="certificate.status === 'A Vencer'">
                        <b-badge pill variant="warning">{{ certificate.status }}</b-badge>
                      </h5>
                    </span>
                  </b-card-body>
                </b-collapse>
              </div>
            </div>
          </div>
          <div class="text-center" v-else> Não há registros a serem mostrados</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: "dashboardComponent",
  data() {
    return {
      value: '',
      certificates: [],
      products: false,
      context: null,
      showDecadeNav: false,
      hideHeader: true,
      locale: 'pt-BR',
      weekday: 0,

    }
  },

  methods: {

    onContext(ctx) {
      this.context = ctx
    }
  },
  computed: {
    dashboard() {
      return this.$store.getters.dashboard
    }
  },

  created() {
    this.today = moment().format('YYYY-MM-DD h:mm:ss')
    this.$store.dispatch('getCertificates').then(response => {
      this.certificates = response
    })

  },
}
</script>

<style lang="scss" scoped>
.cards {
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 35px;

  .card-item {
    border-radius: 5px !important;
  }
}

@media (max-width: 768px) {

  .top-page {

    color: #333;

    .header {
      text-align: center;
    }

    .sub-header {
      text-align: center;
      line-height: 5px;
    }

    .earnings {
      font-size: 30px !important;
      font-weight: lighter;
      text-align: center;
      padding-top: 25px;
      line-height: 25px;

    }

    .earnings-text {
      font-size: 19px !important;
      font-weight: lighter;
      text-align: center;


      line-height: 5px;

    }
  }
}


.top-page {

  color: #333;

  .header {
    font-size: 40px;
  }

  .sub-header {
    font-size: 25px;
    font-weight: lighter;
    text-transform: capitalize;

    line-height: 5px;

  }

  .earnings {
    font-size: 35px;
    font-weight: lighter;
  }

  .earnings-text {
    font-size: 23px;
    font-weight: lighter;


    line-height: 5px;

  }
}
</style>