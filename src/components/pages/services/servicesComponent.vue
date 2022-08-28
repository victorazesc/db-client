<template>
  <section>
    <b-modal id="delete-service" v-model="deleteModal" size="lg" centered title="Excluir Serviço" hide-footer>
      <div>
        <br />
        <h5 class="text-center">
          Você realmente deseja excluir
          <strong>{{ service.service_name }}</strong> e todos os dados ligados a
          ele?
        </h5>
        <br />

        <b-button type="submit" variant="dark" @click.prevent="deleteModal = false">Fechar</b-button>{{ "" }}
        <b-button type="submit" @click.prevent="deleteService(service)" variant="primary">Deletar</b-button>
      </div>
    </b-modal>

    <b-modal id="add-service" v-model="formAddModal" size="md" title="Adicionar Serviço" hide-footer>
      <div>
        <b-form action="#" @submit.prevent="submitService()">
          <b-form-row>
            <label for="">Serviço*</label>
            <textarea name="name" style="height: 80px;" v-model="newService.service_name" class="form-control"
              required />
          </b-form-row>
          <br />

          <b-button type="submit" variant="dark" @click.prevent="formAddModal = false">Fechar</b-button>{{ "" }}
          <b-button type="submit" variant="primary">Salvar</b-button>
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
          <br />

          <b-button type="submit" variant="dark" @click.prevent="formEditModal = false">Fechar</b-button>{{ "" }}
          <b-button type="submit" variant="primary">Salvar</b-button>
        </b-form>
      </div>
    </b-modal>

    <b-modal id="filter" size="md" centered v-model="modalFilter" title="Filtrar Clientes" hide-footer>
      <b-form action="#" @submit.prevent="basicFilter()">
        <b-form-row>
          <b-col md="12" sm="12">
            <b-form-group id="service_name" label="Serviço:">
              <b-form-input v-model="filter.service_name" placeholder="Nome"></b-form-input>
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
              <b-dropdown-item @click.prevent="formAddModal = true">Novo</b-dropdown-item>
              <b-dropdown-item @click.prevent="goBack()">Voltar</b-dropdown-item>
            </b-dropdown>
          </template>
          <template v-else>
            <b-button @click.prevent="modalFilter = true" variant="dark"><i class="fa fa-filter"></i></b-button>
            <b-button @click.prevent="formAddModal = true" variant="success">Novo</b-button>
            <b-button @click.prevent="goBack()" variant="primary">Voltar</b-button>
          </template>

        </b-col>
      </b-row>ß
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
        <b-skeleton-table v-if="!getServices.data" animation="wave" :rows="5" :columns="6"
          :table-props="{ bordered: false, striped: false }"></b-skeleton-table>
        <div v-else>
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Serviço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody v-if="getServices.data.length > 0">
              <tr v-for="s in getServices.data" :key="s.id">
                <td>{{ s.id }}</td>
                <td>{{ s.service_name }}</td>
                <td>
                  <b-button-group size="sm">
                    <button class="btn btn-warning" type="button" @click="openModal(s, 'update')">
                      <i class="fas fa-pen"></i>
                    </button>
                    <button class="btn btn-danger" type="button" @click="openModal(s, 'delete')">
                      <i class="fas fa-trash"></i>
                    </button>
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
        <div v-if="!getServices.data" style="padding-top: 30px; padding-bottom: 30px">
          <b-skeleton-table animation="wave" :rows="5" :columns="1" :table-props="{ bordered: false, striped: false }">
          </b-skeleton-table>
        </div>

        <div v-else style="padding-top: 30px; padding-bottom: 30px">
          <div v-if="getServices.data.length > 0">
            <div class="accordion" role="tablist" v-for="s in getServices.data" :key="s.id">
              <div class="mb-1" style="border-bottom: 1px solid #dee2e6">
                <div header-tag="header" class="p-1" role="tab">
                  <div block v-b-toggle="s.id + 'a'" class="text-left responsive-table" variant="default">
                    <p>
                      <b>#{{ s.id }}</b> - {{ s.service_name }}
                    </p>
                    <span style="position: absolute; top: 5px; right: 5px">
                      <i class="fas fa-ellipsis-v"></i>
                    </span>
                  </div>
                </div>
                <b-collapse :id="s.id + 'a'" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <p><b>Nome:</b> {{ s.service_name }}</p>
                    <p class="text-center">
                      <b-button-group size="sm">
                        <button class="btn btn-warning" type="button" @click="openModal(s, 'update')">
                          <i class="fas fa-pen"></i>
                        </button>
                        <button class="btn btn-danger" type="button" @click="openModal(s, 'delete')">
                          <i class="fas fa-trash"></i>
                        </button>
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

      <div class="text-center">
        <pagination :limit="1" :align="'center'" :data="getServices" @pagination-change-page="getResults"></pagination>
      </div>
    </b-card>
  </section>
</template>

<script>
export default {
  name: "servicesComponents",
  components: {},
  data() {
    return {
      formAddModal: false,
      formEditModal: false,
      modalFilter: false,
      type: false,
      deleteModal: false,
      Services: false,
      service: {},
      newService: {},
      filter: {},
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
    };
  },

  created() {
    if (this.getServices.status === "0") {
      return this.$router.push({ name: "login" });
    }
    this.$store.dispatch("getServices");
  },

  computed: {
    getServices() {
      return this.$store.getters.services;
    },
  },
  methods: {

    basicFilter() {
      let data = {
        apiUrl: 'services',
        filter: this.filter
      }
      this.$store.dispatch("filter", data)
      this.$router.replace({ path: '/services', query: this.filter })
      this.modalFilter = false
    },

    alert(title, variant, action, data) {
      this.toastCount++;
      this.$bvToast.toast(
        "O Serviço " + data.service_name + " foi " + action + " com sucesso",
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
        this.$store.dispatch("updateService", this.service).then(() => {
          this.formEditModal = false;
          this.$store.dispatch("getServices").then(() => {
            this.alert(
              "Serviço Editado com sucesso",
              "success",
              "editado",
              this.service
            );
          });
        });
      } else {
        this.$store.dispatch("addService", this.newService).then(() => {
          this.formAddModal = false;
          this.$store.dispatch("getServices");
        });
      }
    },

    deleteService(service) {
      this.spinner = true;
      this.$store
        .dispatch("deleteService", service)
        .then(
          this.alert(
            "Serviço Excluido com sucesso",
            "success",
            "excluido",
            service
          ),
          this.$store.dispatch("getServices"),
          (this.spinner = false),
          (this.deleteModal = false)
        );
    },

    openModal(data, action) {
      if (action === "update") {
        this.service = data;
        this.formEditModal = true;
      }

      if (action === "delete") {
        this.service = data;
        this.deleteModal = true;
      }
    },
    goBack() {
      return this.$router.go(-1);
    },
    getResults(page = 1) {
      let data = {
        page: page,
        filter: this.filter,
        apiUrl: 'services'
      }
      this.$store.dispatch('filter', data)
    },
  },
};
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