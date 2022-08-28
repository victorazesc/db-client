<template>
  <section>
    <b-modal id="delete-help" :hide-header="$resize && $mq.below(768) ? true : false" centered v-model="ModalDelete"
      size="lg" title="Deletar Pergunta">
      Tem certeza que deseja exluir esta Perguta?
      <template #modal-footer>
        <b-button type="submit" @click.prevent="ModalDelete = false" variant="success">Não</b-button>
        <b-button type="submit" @click.prevent="deleteHelp()" variant="danger">Sim</b-button>
      </template>
    </b-modal>

    <b-modal id="modal-lg" centered size="lg" v-model="ModalResponseQuestion" :title="'Pergunta'">
      <b-form class="question">
        <div v-if="form.client_email">
          <p><b>Dados do cliente:</b></p>
          <br>

          <p><b>Nome:</b> {{ form.client_name }}</p>
          <p><b>E-mail:</b> {{ form.client_email }}</p>
          <p><b>Telefone:</b> {{ form.client_phone }}</p>
          <small v-if="form.client" style="color: green">Cliente Cadastrado</small>
          <br>
          <br>
        </div>
        <p><b>Pergunta:</b></p>
        <p>{{ form.question }}</p>
        <br>
        <b-row>
          <b-col md="12">
            <b-form-group id="input-group-1" label="Resposta:" label-for="input-1">
              <div>
                <b-form-textarea id="textarea" v-model="form.response" placeholder="Escreva sua resposta..." rows="3"
                  max-rows="6"></b-form-textarea>
              </div>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
      <template #modal-footer v-if="form">
        <b-button type="submit" @click.prevent="ModalResponseQuestion = false, ModalDelete = true" variant="danger">
          Excluir</b-button>
        <b-button type="submit" @click.prevent="form = {}, ModalResponseQuestion = false" variant="dark">Cancelar
        </b-button>
        <b-button type="submit" v-if="form.client_email" :disabled="!form.response" v-b-modal="'reponseHelp'"
          variant="success">Responder</b-button>
        <b-button type="submit" @click.prevent="ModalResponseQuestion = false, ModalNewQuestion = true"
          variant="primary">Editar</b-button>
      </template>
    </b-modal>

    <b-modal id="filter" size="lg" centered v-model="modalFilter" title="Filtrar Mensagens" hide-footer>
      <b-form class="question" action="#" @submit.prevent="basicFilter()">
        <b-form-group id="input-group-1" label="Pergunta:" label-for="input-1">
          <div>
            <b-form-textarea id="textarea" v-model="filter.question" placeholder="Escreva sua pergunta..." rows="5"
              max-rows="6"></b-form-textarea>
          </div>
        </b-form-group>
        <b-row>
          <b-col md="12">
            <b-form-group id="input-group-1" label="Resposta:" label-for="input-1">
              <div>
                <b-form-textarea id="textarea" v-model="filter.response" placeholder="Escreva sua resposta..." rows="5"
                  max-rows="6"></b-form-textarea>
              </div>
            </b-form-group>
            <br>
            <b-form-group id="input-group-1" label="Restrição:" label-for="input-1">
              <b-form-select v-model="filter.restrict" class="mb-3" label="Resposta:">
                <b-form-select-option value="Todas">Todas</b-form-select-option>
                <b-form-select-option value="Restrita">Restrita</b-form-select-option>
                <b-form-select-option value="Pública">Pública</b-form-select-option>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <hr />
        <div class="text-right">
          <b-button @click.prevent="modalFilter = false, getResults()" variant="dark" style="margin-right: 5px">Cancel
          </b-button>
          <b-button type="submit" variant="primary">Filtrar</b-button>
        </div>
      </b-form>
    </b-modal>

    <b-modal id="reponseHelp" centered size="sm" title="Eviar mensagem?">
      Desja enviar a resposta ao cliente ?
      <template #modal-footer>
        <b-button type="submit" @click.prevent="response(false)" variant="danger">Não</b-button>
        <b-button type="submit" @click.prevent="response(true)" variant="success">Sim</b-button>
      </template>
    </b-modal>

    <b-modal id="ModalNewQuestion" centered v-model="ModalNewQuestion" size="lg"
      :title="form.id ? 'Editar Pergunta' : 'Cadastrar Pergunta'">
      <b-form class="question">
        <b-form-group id="input-group-1" label="Pergunta:" label-for="input-1">
          <div>
            <b-form-textarea id="textarea" v-model="form.question" placeholder="Escreva sua pergunta..." rows="5"
              max-rows="6"></b-form-textarea>
          </div>
        </b-form-group>
        <b-row>
          <b-col md="12">
            <b-form-group id="input-group-1" label="Resposta:" label-for="input-1">
              <div>
                <b-form-textarea id="textarea" v-model="form.response" placeholder="Escreva sua resposta..." rows="5"
                  max-rows="6"></b-form-textarea>
              </div>
            </b-form-group>
            <br>
            <b-form-checkbox id="checkbox-1" v-model="form.restrict" :value="1" name="checkbox-1" :unchecked-value="0">
              Pergunta Restrita
            </b-form-checkbox>
          </b-col>
        </b-row>
      </b-form>
      <template #modal-footer>
        <b-button type="submit" @click.prevent="form = {}, ModalNewQuestion = false" variant="dark">Cancelar</b-button>
        <b-button type="submit" variant="primary" :disabled="!form.question && !form.response"
          @click.prevent="ModalNewQuestion = false, register()">{{ form.id ? 'Editar' : 'Criar' }}</b-button>
      </template>
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
              <b-dropdown-item @click.prevent="openModal('filter', {})">Filtrar</b-dropdown-item>
              <b-dropdown-item @click.prevent="form = {}, form.restrict = 0, ModalNewQuestion = true">Novo
              </b-dropdown-item>
              <b-dropdown-item @click.prevent="goBack()">Voltar</b-dropdown-item>
            </b-dropdown>
          </template>
          <template v-else>
            <b-button @click.prevent="openModal('filter', {})" variant="dark"><i class="fa fa-filter"></i></b-button>
            <b-button @click.prevent="form = {}, form.restrict = 0, ModalNewQuestion = true" variant="success">Novo
            </b-button>
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

      <b-card-body class="table-responsive" v-if="$resize && $mq.above(750)">
        <b-skeleton-table v-if="!helps" animation="wave" :rows="5" :columns="6"
          :table-props="{ bordered: false, striped: false }"></b-skeleton-table>
        <div v-else>
          <table class="table">
            <thead>
              <tr>
                <th>Pergunta</th>
                <th>Data Envio</th>
                <th>Data Resposta</th>
                <th class="text-right">Status</th>
              </tr>
            </thead>
            <tbody v-if="helps.length > 0">
              <tr v-for="h in helps" :key="h.id">
                <td>{{ h.question }}</td>
                <td>{{ h.send_date | date }}</td>
                <td v-if="h.response_date">{{ h.response_date | date }}</td>
                <td v-else>-</td>
                <td class="text-right">
                  <button v-if="!h.response_date && h.restrict" class="btn btn-primary" @click="openModal(1, h)"
                    type="button">
                    <span><i class="fas fa-exclamation-triangle"></i> Ag.resposta</span>
                  </button>
                  <button v-else-if="h.response_date && h.client_email && h.restrict" class="btn btn-success"
                    @click="openModal(1, h)" type="button">
                    <span><i class="fas fa-check"></i> Respondido</span>
                  </button>
                  <button v-else-if="h.restrict" class="btn btn-info" @click="openModal(1, h)" type="button">
                    <span><i class="fas fa-eye"></i> Restrito</span>
                  </button>
                  <button v-else-if="!h.restrict" class="btn btn-dark" @click="openModal(1, h)" type="button">
                    <span><i class="fas fa-eye"></i> Pública</span>
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
        <div v-if="!helps" style="padding-top: 30px; padding-bottom: 30px;">
          <b-skeleton-table animation="wave" :rows="5" :columns="1" :table-props="{ bordered: false, striped: false }">
          </b-skeleton-table>
        </div>
        <div v-else style="padding-top: 30px; padding-bottom: 30px;">
          <div v-if="helps.length > 0">
            <div class="accordion" role="tablist" v-for="h in helps" :key="h.id">
              <div class="mb-1" style="border-bottom: 1px solid #dee2e6">
                <div header-tag="header" class="p-1" role="tab">
                  <div block v-b-toggle="h.id + 'a'" class="text-left responsive-table" variant="default">
                    <p>
                      <b>#{{ h.id }}</b> - {{ h.question }}
                    </p>
                    <span style="position: absolute; top: 5px; right: 5px">
                      <i class="fas fa-ellipsis-v"></i>
                    </span>
                  </div>
                </div>
                <b-collapse :id="h.id + 'a'" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <p><b>Pergunta:</b> {{ h.question }}</p>
                    <p><b>Data Envio:</b> {{ h.send_date | date }}</p>
                    <p v-if="h.response_date"><b>Data Resposta:</b> {{ h.response_date | date }}</p>
                    <p class="text-center">
                      <button v-if="!h.response_date && h.restrict" class="btn btn-primary" @click="openModal(1, h)"
                        type="button">
                        <span><i class="fas fa-exclamation-triangle"></i> Ag.resposta</span>
                      </button>
                      <button v-else-if="h.response_date && h.client_email && h.restrict" class="btn btn-success"
                        @click="openModal(1, h)" type="button">
                        <span><i class="fas fa-check"></i> Respondido</span>
                      </button>
                      <button v-else-if="h.restrict" class="btn btn-info" @click="openModal(1, h)" type="button">
                        <span><i class="fas fa-eye"></i> Restrito</span>
                      </button>
                      <button v-else-if="!h.restrict" class="btn btn-dark" @click="openModal(1, h)" type="button">
                        <span><i class="fas fa-eye"></i> Pública</span>
                      </button>
                    </p>
                  </b-card-body>
                </b-collapse>
              </div>
            </div>
          </div>
          <div class="text-center" v-else> Não há registros a serem mostrados</div>
        </div>
      </div>
      <div class="text-center" style="width: 100%">
        <div>
          <pagination :limit="1" :align="'center'" :data="helpsPaginate" @pagination-change-page="getResults">
          </pagination>
        </div>
      </div>
    </b-card>
  </section>
</template>

<script>
export default {
  name: 'helpComponent',
  data() {
    return {
      load: false,
      users: [],
      paginate: [],
      ModalNewQuestion: false,
      ModalResponseQuestion: false,
      ModalDelete: false,
      modalFilter: false,
      filter: {},
      form: {},
    }
  },

  computed: {
    helps() {
      return this.$store.getters.helps.data
    },
    helpsPaginate() {
      return this.$store.getters.helps
    }
  },

  methods: {

    basicFilter() {
      let data = {
        apiUrl: 'helps',
        filter: this.filter
      }
      this.$store.dispatch("filter", data)
      this.$router.replace({ name: 'helpAndSupport', query: this.filter })
      this.modalFilter = false
    },


    register() {
      this.$store.dispatch(this.form.id ? 'editHelp' : 'addHelp', this.form).then(() => {
        this.getResults()
        this.form = {}
      })
    },

    response(params) {

      if (params) {
        this.form.sendEmail = params
        this.$store.dispatch('responseHelpQuestion', this.form).then(() => {
          this.form = {}
        })
      } else {
        this.form.sendEmail = params
        this.$store.dispatch('responseHelpQuestion', this.form).then(() => {
          this.form = {}
        })
      }
      this.getResults()
      this.ModalResponseQuestion = false
      this.$bvModal.hide('reponseHelp')
    },

    deleteHelp() {
      this.ModalDelete = false
      this.$store.dispatch('deleteHelp', this.form).then(() => {
        this.getResults()
        this.$bvToast.toast("Pergunta excluida com sucesso", {
          autoHideDelay: 4000,
          variant: 'success',
          appendToast: true,
          noCloseButton: true,
          toaster: this.$resize && this.$mq.below(768) ? 'b-toaster-bottom-full' : 'b-toaster-top-right'
        }),
          this.form = {}
      })
    },

    getResults(page = 1) {
      let data = {
        page: page,
        filter: this.filter,
        apiUrl: 'helps'
      }
      this.$store.dispatch('filter', data)
    },

    openModal(type, data) {
      if (type === 1) {
        this.form = JSON.parse(JSON.stringify(data))
        this.$bvModal.show('modal-lg')
      } else if (type === 2) {
        this.form = JSON.parse(JSON.stringify(data))
        this.$bvModal.show('delete-user')
      } else if (type === 3) {
        this.form = JSON.parse(JSON.stringify(data))
        this.$bvModal.show('ModalNewQuestion')
      } else if (type === 'filter') {
        this.modalFilter = true
      }
    }
  },
  mounted() {


    let url_string = window.location.href;
    let url = new URL(url_string);
    let c = url.searchParams.get("id");


    if (c) {
      for (let i in this.helps) {
        if (this.helps[i].id == c) {
          this.form = this.helps[i]
          this.ModalNewQuestion = true
        }
      }
    }

  },

  created() {
    if (this.$route.query) {
      this.filter = this.$route.query
    }
    this.getResults()
  }
}
</script>

<style lang="scss" scoped>
.question {
  p {
    margin-bottom: 5px !important;
  }
}
</style>