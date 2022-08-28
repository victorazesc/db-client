<template>
  <section>
    <b-card border-variant="white">
      <b-row>
        <b-col cols="7" class="text-left">
          <h4 class="d-none d-sm-block">{{ $route.meta.title }}</h4>
          <h4 class="d-block d-sm-none">{{ $route.meta.mobileTitle }}</h4>
        </b-col>
        <b-col cols="5" class="text-right">
          <b-button @click.prevent="goBack()" variant="primary">Voltar</b-button>
        </b-col>
      </b-row>
      <b-card-body class="table-responsive" v-if="$resize && $mq.above(750)">
        <b-skeleton-table v-if="!notifications" animation="wave" :rows="5" :columns="6"
          :table-props="{ bordered: false, striped: false }"></b-skeleton-table>
        <div v-else>
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Notificação</th>
                <th>Recebida em:</th>
                <th>Mensagem</th>
                <th class="text-right">Status</th>
              </tr>
            </thead>
            <tbody v-if="notifications.length > 0">
              <tr v-for="(h, index ) in notifications" :key="h.id">
                <td><img width="40x" :src="h.icon | icon" alt=""></td>
                <td>{{ h.subject }}</td>
                <td>{{ h.created_at | dateTime }}</td>
                <td>{{ h.message }}</td>
                <td class="text-right">

                  <button v-if="h.status === 1" class="btn btn-dark" @click="alterStatus(h, index)" type="button">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25"
                        viewBox="0 0 172 172" style=" fill:#000000;">
                        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                          stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                          font-family="none" font-weight="none" font-size="none" text-anchor="none"
                          style="mix-blend-mode: normal">
                          <path d="M0,172v-172h172v172z" fill="none"></path>
                          <g fill="#ffffff">
                            <path
                              d="M86,0c-1.39543,0 -2.76503,0.36178 -3.92788,1.24038c-82.07212,60.83053 -82.07212,67.80769 -82.07212,71.52885v79.38462c0,10.93089 8.91526,19.84615 19.84615,19.84615h132.30769c10.93089,0 19.84615,-8.91526 19.84615,-19.84615v-79.38462c0,-3.72115 -0.02584,-10.69831 -82.07212,-71.52885c-1.16286,-0.87861 -2.53245,-1.24038 -3.92788,-1.24038zM33.07692,46.30769h105.84615v36.59135l27.90865,-11.16346l-51.26923,39.89904l42.37981,43.41346l-51.68269,-36.79808l-20.25962,13.02404l-20.25962,-13.02404l-51.68269,36.79808l42.37981,-43.41346l-51.26923,-39.89904l27.90865,11.16346zM52.92308,59.53846v13.23077h66.15385v-13.23077zM52.92308,79.38462v13.23077h46.30769v-13.23077z">
                            </path>
                          </g>
                        </g>
                      </svg>
                    </span>
                  </button>
                  <button v-else class="btn btn-primary" @click="alterStatus(h, index)" type="button">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25"
                        viewBox="0 0 172 172" style=" fill:#000000;">
                        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                          stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                          font-family="none" font-weight="none" font-size="none" text-anchor="none"
                          style="mix-blend-mode: normal">
                          <path d="M0,172v-172h172v172z" fill="none"></path>
                          <g fill="#ffffff">
                            <path
                              d="M152.15385,26.46154h-132.30769c-11.24099,0 -19.84615,8.60517 -19.84615,19.84615v79.38462c0,11.24099 8.60517,19.84615 19.84615,19.84615h132.30769c11.24099,0 19.84615,-8.60517 19.84615,-19.84615v-79.38462c0,-11.24099 -8.60517,-19.84615 -19.84615,-19.84615zM157.45132,128.32813l-51.60517,-37.03065l-19.84615,13.23077l-20.51803,-13.23077l-50.93329,37.03065l41.68209,-43l-50.93329,-39.69231l80.70253,43.67187l80.05649,-43l-50.28726,39.69231z">
                            </path>
                          </g>
                        </g>
                      </svg>
                    </span>
                  </button>
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
        <div v-if="!notifications" style="padding-top: 30px; padding-bottom: 30px">
          <b-skeleton-table animation="wave" :rows="5" :columns="1" :table-props="{ bordered: false, striped: false }">
          </b-skeleton-table>
        </div>
        <div v-else style="padding-top: 30px; padding-bottom: 30px">
          <div v-if="notifications.length > 0">
            <div class="accordion" role="tablist" v-for="h in notifications" :key="h.id">
              <div class="mb-1" style="border-bottom: 1px solid #dee2e6">
                <div header-tag="header" class="p-1" role="tab">
                  <div block v-b-toggle="h.id + 'a'" class="text-left responsive-table" variant="default">
                    <p>
                      <span style="padding-right: 15px"><img width="30x" :src="h.icon | icon" alt=""></span>{{ h.subject
                      }}
                    </p>
                    <span style="position: absolute; top: 5px; right: 5px">
                      <i class="fas fa-ellipsis-v"></i>
                    </span>
                  </div>
                </div>
                <b-collapse :id="h.id + 'a'" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <p><b>Pergunta:</b> {{ h.subject }}</p>
                    <p><b>Recebida em:</b> {{ h.created_at | dateTime }}</p>
                    <p>
                      <b>Mensagem:</b> {{ h.message }}
                    </p>
                    <p class="text-center">
                      <button v-if="h.status === 1" class="btn btn-dark" @click="alterStatus(h, index)" type="button">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25"
                            viewBox="0 0 172 172" style=" fill:#000000;">
                            <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                              stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                              font-family="none" font-weight="none" font-size="none" text-anchor="none"
                              style="mix-blend-mode: normal">
                              <path d="M0,172v-172h172v172z" fill="none"></path>
                              <g fill="#ffffff">
                                <path
                                  d="M86,0c-1.39543,0 -2.76503,0.36178 -3.92788,1.24038c-82.07212,60.83053 -82.07212,67.80769 -82.07212,71.52885v79.38462c0,10.93089 8.91526,19.84615 19.84615,19.84615h132.30769c10.93089,0 19.84615,-8.91526 19.84615,-19.84615v-79.38462c0,-3.72115 -0.02584,-10.69831 -82.07212,-71.52885c-1.16286,-0.87861 -2.53245,-1.24038 -3.92788,-1.24038zM33.07692,46.30769h105.84615v36.59135l27.90865,-11.16346l-51.26923,39.89904l42.37981,43.41346l-51.68269,-36.79808l-20.25962,13.02404l-20.25962,-13.02404l-51.68269,36.79808l42.37981,-43.41346l-51.26923,-39.89904l27.90865,11.16346zM52.92308,59.53846v13.23077h66.15385v-13.23077zM52.92308,79.38462v13.23077h46.30769v-13.23077z">
                                </path>
                              </g>
                            </g>
                          </svg>
                        </span>
                      </button>
                      <button v-else class="btn btn-primary" @click="alterStatus(h, index)" type="button">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25"
                            viewBox="0 0 172 172" style=" fill:#000000;">
                            <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                              stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                              font-family="none" font-weight="none" font-size="none" text-anchor="none"
                              style="mix-blend-mode: normal">
                              <path d="M0,172v-172h172v172z" fill="none"></path>
                              <g fill="#ffffff">
                                <path
                                  d="M152.15385,26.46154h-132.30769c-11.24099,0 -19.84615,8.60517 -19.84615,19.84615v79.38462c0,11.24099 8.60517,19.84615 19.84615,19.84615h132.30769c11.24099,0 19.84615,-8.60517 19.84615,-19.84615v-79.38462c0,-11.24099 -8.60517,-19.84615 -19.84615,-19.84615zM157.45132,128.32813l-51.60517,-37.03065l-19.84615,13.23077l-20.51803,-13.23077l-50.93329,37.03065l41.68209,-43l-50.93329,-39.69231l80.70253,43.67187l80.05649,-43l-50.28726,39.69231z">
                                </path>
                              </g>
                            </g>
                          </svg>
                        </span>
                      </button>
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
          <pagination :limit="1" :align="'center'" :data="notificationsPaginate" @pagination-change-page="getResults">
          </pagination>
        </div>
      </div>
    </b-card>
  </section>
</template>

<script>
export default {
  name: "Notifications",

  computed: {
    notifications() {
      return this.$store.getters.notificationsList.data
    },
    notificationsPaginate() {
      return this.$store.getters.notificationsList
    }
  },

  methods: {
    getResults(page = 1) {
      this.$store.dispatch("getNotificationsList", {
        page: page,
      });
    },

    goBack() {
      return this.$router.go(-1);
    },

    alterStatus(data, index) {
      this.$store.dispatch("alterStatusNotification", data).then(resp => {
        this.notifications[index].status = resp.status
      })
    }
  },
  created() {
    this.getResults()
  },
};
</script>

<style>
</style>