<template>
  <section class="container-fluid">

    <SpinnerComponent v-if="spinner" />

    <div>
      <b-modal id="modal-1" title="Alterar Senha" hide-footer>
        <b-form>

          <b-col md="12">
            <b-form-group id="input-group-2" label="Nova Senha:" label-for="input-2">
              <b-form-input id="input-2" type="password" v-model="password" :state="validation"
                placeholder="Digite sua nova senha" required></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="Confirme sua Senha:" label-for="input-2">
              <b-form-input id="input-2" type="password" v-model="rewritePass" :state="validation"
                placeholder="Digite sua senha novamente" required></b-form-input>
            </b-form-group>
          </b-col>

          <hr />
          <div class="text-right">
            <b-button @click.prevent="$bvModal.hide('modal-1')" variant="dark" style="margin-right: 5px">Cancel
            </b-button>
            <b-button type="submit" :class="validation ? '' : 'disabled'" @click.prevent="changePassword()"
              variant="primary">confirmar</b-button>
          </div>
        </b-form>
      </b-modal>
    </div>

    <b-card>
      <div class="row">
        <div class="col-md-6">
          <div class="text-center">

            <hr>
            <div style="width: 10rems;position: relative;display: -webkit-inline-box;">
              <div class="imageUpload">
                <label for="upload-photo" style="display: table-cell;vertical-align: middle;" class="buttonup"><i
                    class="fas fa-camera iconupload"></i></label>
                <input type="file" ref="file" name="photo" id="upload-photo" @change="editImage" />
              </div>
              <b-avatar :src="imageEdit ? imageEdit : user.profile_photo_url" size="10rem"></b-avatar>
            </div>
            <br>
            <br>
            <br>
          </div>
          <div>
            <b-form-row>

              <b-col md="6">
                <b-form-group id="input-group-2" label="Seu Nome:" label-for="input-2">
                  <b-form-input id="input-2" v-model="user.first_name" placeholder="Enter name" required></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group id="input-group-3" label="Sobrenome:" label-for="input-3">
                  <b-form-input id="input-3" v-model="user.last_name" required></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group id="input-group-1" label="Endereço de E-mail:" label-for="input-1">
                  <b-form-input id="input-1" v-model="user.email" type="email" placeholder="Enter email" required>
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group id="input-group-3" label="CPF:" label-for="input-3">
                  <b-form-input id="input-3" v-model="user.document" required></b-form-input>
                </b-form-group>
              </b-col>
              <div>
                <b-button type="submit" @click.prevent="submitForm(user.id)" variant="primary">Alterar dados</b-button>
                &nbsp;
                <b-button v-b-modal.modal-1 variant="dark">Alterar Senha</b-button>
              </div>
            </b-form-row>
          </div>
        </div>

        <div class="col-md-6">
          <b-card border-variant="white" class="d-none d-sm-block" v-if="$resize && $mq.above(750)">
            <div class="table-responsive" style="max-height: 450px">
              <table class="table table-sm table-hover">
                <thead>
                  <tr>
                    <th>Ação</th>
                    <th>Descrição</th>
                    <th>Data</th>
                    <th>Pagina</th>
                  </tr>
                </thead>
                <tbody v-if="logs">
                  <tr v-for="(log, index) in logs" :key="index">
                    <td>
                      <span v-if="log.action === 'delete'" class="badge bg-danger text-light">{{ log.action }}</span>
                      <span v-else-if="log.action === 'update'" class="badge bg-warning text-light">{{ log.action
                      }}</span>
                      <span v-else-if="log.action === 'create'" class="badge bg-success text-light">{{ log.action
                      }}</span>
                    </td>
                    <td>{{ log.extra_info }}</td>
                    <td>{{ log.created_at | dateTime }}</td>
                    <td>
                      <router-link :to="log.route">{{ log.route }}</router-link>
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

          </b-card>
        </div>
      </div>
    </b-card>
  </section>
</template>

<script>
import SpinnerComponent from '../../spinnerComponent.vue';
export default {
  name: 'minha-conta',
  components: {
    SpinnerComponent
  },
  data() {
    return {
      logs: [],
      files: [],
      password: '',
      rewritePass: '',
      imageEdit: '',
      spinner: false,
    }
  },

  computed: {

    validation() {
      return this.password.length > 4 && this.password === this.rewritePass
    },

    filesall() {
      return this.$store.getters.files
    },
    user() {
      return this.$store.getters.user
    }
  },

  methods: {

    submitForm(id) {

      this.spinner = true

      if (id) {
        var json_arra = JSON.stringify(this.user)
        var formDataEdit = new FormData();

        if (this.fileSelected) {
          formDataEdit.append('file', this.fileSelected)
        }
        formDataEdit.append('user', json_arra)

        this.$store.dispatch('editUser', formDataEdit).then(() => {
          this.user.profile_photo_url = this.imageEdit ? this.imageEdit : this.user.profile_photo_url
          this.$bvToast.toast("Seus dados foram alterados!", {
            autoHideDelay: 3000,
            variant: "success",
            noCloseButton: true,
            appendToast: true,
            toaster: this.$resize && this.$mq.below(768) ? 'b-toaster-bottom-full' : 'b-toaster-top-right'
          });

          this.spinner = false
        })
      }


    },

    changePassword() {
      this.spinner = true
      this.$bvModal.hide('modal-1')
      this.$store.dispatch('changePassword', { password: this.password }).then(() => {
        this.$bvToast.toast("Sua Senha foi Alterada com sucesso", {
          autoHideDelay: 3000,
          variant: "success",
          noCloseButton: true,
          appendToast: true,
        });
        this.password = ''
        this.rewritePass = ''
        this.spinner = false
      })
    },

    editImage(e) {
      const file = e.target.files[0]

      this.fileSelected = e.target.files[0]

      if (!file.type.includes("image/")) {
        alert("Please select an image file")
        return
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader()
        reader.onload = event => {
          this.imageEdit = event.target.result
        }

        reader.readAsDataURL(file)
      } else {
        alert("Sorry, FileReader API not supported")
      }
    },

    setImage(e) {
      const file = e.target.files[0]

      this.fileSelected = e.target.files[0]

      if (!file.type.includes("image/")) {
        alert("Please select an image file")
        return
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader()
        reader.onload = event => {
          this.imageSrc = event.target.result
        }

        reader.readAsDataURL(file)
      } else {
        alert("Sorry, FileReader API not supported")
      }
    },
  },

  created() {
    this.$store.dispatch("getLogs", { where: true }).then((resp) => {
      this.logs = resp;
    });
  }
}
</script>

<style scoped  lang="css">
.imageUpload {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  bottom: 0px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  right: -10px;
  background-color: #22222280;
  color: #fff;
  display: table;
  z-index: 1;
}

.iconupload {
  width: 20px;
  height: 20px;
  opacity: 0.8;
}

label {
  cursor: pointer;
}

#upload-photo {
  opacity: 0;
  position: absolute;
  z-index: -1;
  width: 0px;
}

.table th,
.table td {
  vertical-align: middle;
}

.card-img-overlay {
  display: none;
  transition: all 0.5s;
}

.card-img-overlay button {
  margin-top: 20vh;
}

.card:hover .card-img-overlay {
  display: block;
}
</style>