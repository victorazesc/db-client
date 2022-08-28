<template>
  <dashboardComponent>
    <b-card border-variant="white">
      <b-row>
        <b-col cols='8' class="text-left">
          <h4>Tabela de Produtos</h4>
        </b-col>
        <b-col cols='4' class="text-right">
          <b-button @click.prevent="goBack()" variant="primary">Voltar</b-button>
        </b-col>
      </b-row>
      <b-card-body>
        <b-skeleton-table v-if="!getReceipts.data" animation="wave" :rows="5" :columns="6"
          :table-props="{ bordered: false, striped: false }"></b-skeleton-table>
        <div v-else>
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome Cliente</th>
                <th>Valor</th>
                <th>Descrição</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="receipt in getReceipts.data" :key="receipt.id">
                <td>{{ receipt.id }}</td>
                <td>{{ receipt.name_client }}</td>
                <td>{{ receipt.receipt_value }}</td>
                <td>{{ receipt.receipt_reference }}</td>
                <td>{{ receipt.receipt_date }}</td>

              </tr>
            </tbody>

          </table>
        </div>
        <div class="text-center">
          <pagination :limit="1" :align="center" :data="getReceipts" @pagination-change-page="getResults"></pagination>
        </div>
      </b-card-body>
    </b-card>
  </dashboardComponent>
</template>

<script>

import dashboardComponent from "../dashboard/dashboardComponent";


export default {
  name: "receiptsComponents",
  components: {
    dashboardComponent
  },
  data() {
    return {
      Receipts: false,
    }
  },

  created() {
    this.$store.dispatch('getReceipts')
  },
  computed: {
    getReceipts() {
      return this.$store.getters.receipts
    },
  },
  methods: {
    goBack() {
      return this.$router.go(-1)
    },
    getResults(page = 1) {
      this.$store.dispatch('getReceipts', {
        'page': page
      })
    }
  }
}
</script>

<style scoped>
</style>