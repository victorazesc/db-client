<template>
  <section>
    <b-modal id="delete-user" size="lg" :title="form.id ? 'Editar Usuário' : 'Adicionar Usuário'">

      Tem certeza que deseja exluir este Usuário?
      <template #modal-footer>
        <b-button type="submit" v-b-modal="'delete-user'" variant="success">Não</b-button>
        <b-button type="submit" @click.prevent="deleteUser()" variant="danger">Sim</b-button>
      </template>

    </b-modal>
    <b-modal id="modal-lg" size="lg" :title="form.id ? 'Editar Usuário' : 'Adicionar Usuário'" hide-footer>

      <b-form @submit.prevent="register()">
        <b-row>
          <b-col md="6">
            <b-form-group id="input-group-1" label="Nome:" label-for="input-1">
              <b-form-input id="input-1" v-model="form.first_name" type="text" placeholder="Nome..." required>
              </b-form-input>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group id="input-group-2" label="Sobrenome:" label-for="input-2">
              <b-form-input id="input-2" v-model="form.last_name" placeholder="Sobrenome..." required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group id="document_client" label="CPF/CNPJ:">
              <b-form-input id="document_client" v-mask="['###.###.###-##']" v-model="form.document"
                placeholder="CPF/CNPJ" :state="isvalid" @change="cpfValidate"
                aria-describedby="input-live-help input-live-feedback" trim></b-form-input>
              <b-form-invalid-feedback id="input-live-feedback">
                Entre com um CPF verdadeiro
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group id="input-group-2" label="E-mail:" label-for="input-2">
              <b-form-input id="input-2" v-model="form.email" placeholder="email@mail.com" required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group id="input-group-3" label="Perfil:" label-for="input-3">
              <b-form-select id="input-3" v-model="form.profile_id" :options="profiles" required></b-form-select>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group id="input-group-2" label="Senha:" label-for="input-2">
              <b-form-input autocomplete v-if="!form.id" id="input-2" placeholder="******" type="password"
                v-model="form.password" required></b-form-input>
              <button class="btn btn-warning btn-block" v-if="form.id" @click.prevent="resetPassword()">Resetar
                Senha</button>
              <small v-if="form.id">A senha padrão é o documento cadastrado</small>
            </b-form-group>
          </b-col>

        </b-row>
        <hr />
        <div class="text-right">
          <b-button @click.prevent="$bvModal.hide('modal-lg')" variant="dark" style="margin-right: 5px">Cancel
          </b-button>
          <b-button type="submit" variant="primary">{{
              form.id ? "Editar" : "Adicionar"
          }}</b-button>
        </div>
      </b-form>

    </b-modal>

    <b-card border-variant="white">
      <b-row>
        <b-col cols="5" class="text-left">
          <h4 class="d-none d-sm-block">{{ $route.meta.title }}</h4>
          <h4 class="d-block d-sm-none">{{ $route.meta.mobileTitle }}</h4>
        </b-col>
        <b-col cols='7' class="text-right">
          <b-button v-b-modal.modal-lg @click.prevent="form = {}" variant="success">Novo</b-button> {{ ' ' }}
          <b-button @click.prevent="goBack()" variant="primary">Voltar</b-button>
        </b-col>
      </b-row>

      <b-card-body class="table-responsive" v-if="$resize && $mq.above(750)">
        <b-skeleton-table v-if="!users" animation="wave" :rows="5" :columns="6"
          :table-props="{ bordered: false, striped: false }"></b-skeleton-table>
        <div v-else>
          <table class="table">
            <thead>
              <tr>
                <th>Nome Usuário</th>
                <th>Documento</th>
                <th>Email</th>
                <th>Perfil</th>
                <th>Ação</th>

              </tr>
            </thead>
            <tbody v-if="users.length > 0">
              <tr v-for="s in users" :key="s.id">
                <td>{{ s.first_name }} {{ s.last_name }}</td>
                <td v-if="s.document">{{ s.document | document }} </td>
                <td v-else style="color: red"> Sem Documento </td>
                <td>{{ s.email }} </td>
                <td v-if="s.profile_id">{{ s.profile.profile_name }} </td>
                <td v-else style="color: red"> Sem Perfil </td>
                <td>
                  <b-button-group size="sm">
                    <button class="btn btn-warning" @click="openModal(1, s)" type="button"><i
                        class="fas fa-pen"></i></button>
                    <button class="btn btn-danger" @click="openModal(2, s)" type="button"><i
                        class="fas fa-trash"></i></button>
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

        <div v-if="!users" style="padding-top: 30px; padding-bottom: 30px;">

          <b-skeleton-table animation="wave" :rows="5" :columns="1" :table-props="{ bordered: false, striped: false }">
          </b-skeleton-table>

        </div>

        <div v-else style="padding-top: 30px; padding-bottom: 30px;">
          <div v-if="users.length > 0">
            <div class="accordion" role="tablist" v-for="s in users" :key="s.id">
              <div class="mb-1" style="border-bottom: 1px solid #dee2e6">
                <div header-tag="header" class="p-1" role="tab">
                  <div block v-b-toggle="s.id + 'a'" class="text-left responsive-table" variant="default">
                    <p>
                      <b>#{{ s.id }}</b> - {{ s.first_name }}
                    </p>
                    <span style="position: absolute; top: 5px; right: 5px">
                      <i class="fas fa-ellipsis-v"></i>
                    </span>
                  </div>
                </div>
                <b-collapse :id="s.id + 'a'" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <p><b>Nome:</b> {{ s.first_name }}</p>
                    <p class="text-center">

                      <b-button-group size="sm">
                        <button class="btn btn-warning" type="button" @click="openModal(1, s)"><i
                            class="fas fa-pen"></i></button>
                        <button class="btn btn-danger" type="button" @click="openModal(2, s)"><i
                            class="fas fa-trash"></i></button>
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
    </b-card>
  </section>
</template>

<script>
import { cpf } from "cpf-cnpj-validator";

export default {
  name: 'users-list',
  data() {
    return {
      isvalid: null,
      users: [],
      profiles: [],
      form: {
        profile_id: null
      }
    }
  },
  methods: {
    cpfValidate() {
      if (this.form.document.length < 15) {
        this.isvalid = cpf.isValid(this.form.document);
      }
    },

    register() {
      this.$bvModal.hide('modal-lg')
      if (this.form.id) {
        let form = JSON.stringify(this.form)
        var formDataEdit = new FormData();
        formDataEdit.append('user', form)
        this.$store.dispatch('editUser', formDataEdit)
      } else {
        this.$store.dispatch('register', this.form)
      }

    },


    resetPassword() {
      this.$store.dispatch('resetPassword', this.form)
    },
    deleteUser() {
      this.$store.dispatch('deleteUser', this.form)
    },

    openModal(type, data) {
      if (type === 1) {
        this.form = data
        this.$bvModal.show('modal-lg')
      } else if (type === 2) {
        this.form = data
        this.$bvModal.show('delete-user')
      }
    }

  },
  created() {
    this.$store.dispatch('getAllUsers').then(resp => {
      this.users = resp
    })

    this.$store.dispatch('getProfiles').then(resp => {
      this.profiles = resp
      this.profiles.push({ value: null, text: 'Selecione um perfil' })
    })
  }
}
</script>

<style>
</style>