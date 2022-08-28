<template>
  <div class="products">
    <SpinnerComponent v-if="spinner" />

    <b-modal id="edit-product" v-model="ModalDelete" size="lg" centered title="Editar producte" hide-footer>
      <div>
        <br />
        <h5 class="text-center">
          Você realmente deseja excluir <strong>{{ product.description_products }}</strong> e todos os dados ligados a
          ele?
        </h5>
        <br />

        <b-button type="submit" variant="dark" @click.prevent="ModalDelete = false">Fechar</b-button>{{ '' }}
        <b-button type="submit" @click.prevent="deleteproduct(product)" variant="primary">Deletar</b-button>
      </div>
    </b-modal>

    <b-modal id="add-product" size="lg" centered v-model="formAddproduct" title="Adicionar Produto" hide-footer>
      <b-form action="#" @submit.prevent="submitproduct()">
        <b-form-row>
          <b-col cols="12" md="3" class="text-center">



            <div class="imageUpload" :style="'background-image: url(' + imageSrc + '); margin: auto;'">

              <label for="upload-photo" class="buttonup"><i class="fas fa-cloud-upload-alt iconupload"></i></label>
              <input type="file" ref="file" name="photo" id="upload-photo" @change="setImage" />



            </div>


          </b-col>
          <b-col cols="12" md="9">
            <br v-if="$resize && $mq.below(750)">
            <b-form-row>
              <b-col cols="12" md="9">
                <b-form-group id="buy_price_products" label="Descrição do produto:">
                  <b-form-input v-model="newproduct.description_products" placeholder="Descrição do produto"
                    required=""></b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="3">
                <b-form-group id="document_product" label="Preço da Compra:">
                  <money class="form-control" v-model="newproduct.buy_price_products" v-bind="money"
                    @keyup.native="calcValue()"></money>
                </b-form-group>
              </b-col>

              <b-col cols="6" md="3">
                <b-form-group id="gain_percent" label="Margem de Lucro:">
                  <percent-input v-model="newproduct.gain_percent" @keyup.native="calcPercent()" class="form-control"
                    v-bind="percent"></percent-input>

                </b-form-group>
              </b-col>
              <b-col cols="6" md="4">
                <b-form-group id="sell_price_products" label="Valor de Venda:">
                  <money v-model="newproduct.sell_price_products" v-bind="money" @keyup.native="calcValue()"
                    :disabled="this.newproduct.gain_percent > 0" class="form-control" placeholder="R$ 0,00"></money>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group id="earning_products" label="Lucro:">

                  <money v-model="newproduct.earning_products" disabled v-bind="money" class="form-control"
                    placeholder="R$ 0,00" type="text"></money>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group id="unity_products" label="Unidade">
                  <b-form-input v-model="newproduct.unity_products" placeholder="UN"></b-form-input>
                </b-form-group>
              </b-col>
            </b-form-row>
          </b-col>
        </b-form-row>
        <hr />
        <div class="text-right">
          <b-button @click.prevent="formAddproduct = false" variant="dark" style="margin-right: 5px">Cancel</b-button>
          <b-button type="submit" variant="primary"
            :disabled="!newproduct.buy_price_products || !newproduct.unity_products">Adicionar</b-button>
        </div>
      </b-form>
    </b-modal>

    <b-modal id="edit-product" size="lg" centered v-model="formproduct" title="Editar Produto" hide-footer>
      <b-form action="#" @submit.prevent="submitproduct(product.id)">
        <b-form-row>
          <b-col cols="12" md="3">

            <div class="imageUpload" :style="'margin:auto; background-image: url(' + imageEdit + ')'">

              <label for="upload-photo" class="buttonup"><i class="fas fa-cloud-upload-alt iconupload"></i></label>
              <input type="file" ref="file" name="photo" id="upload-photo" @change="editImage" />


            </div>
          </b-col>
          <b-col cols="12" md="9">
            <br v-if="$resize && $mq.below(750)">
            <b-form-row>
              <b-col cols="12" md="9">
                <b-form-group id="buy_price_products" label="Descrição do produto:">
                  <b-form-input v-model="product.description_products" placeholder="Descrição do produto" required="">
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="3">
                <b-form-group id="document_product" label="Preço da Compra:">
                  <money class="form-control" v-model="product.buy_price_products" v-bind="money"
                    @keyup.native="calcValue()"></money>
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-row>
              <b-col cols="6" md="3">
                <b-form-group id="gain_percent" label="Margem de Lucro:">
                  <percent-input v-model="product.gain_percent" @keyup.native="calcPercent()" class="form-control"
                    v-bind="percent"></percent-input>

                </b-form-group>
              </b-col>
              <b-col cols="6" md="3">
                <b-form-group id="sell_price_products" label="Valor de Venda:">
                  <money v-model="product.sell_price_products" v-bind="money" @keyup.native="calcValue()"
                    :disabled="this.newproduct.gain_percent > 0" class="form-control" placeholder="R$ 0,00"></money>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group id="earning_products" label="Lucro:">

                  <money v-model="product.earning_products" disabled v-bind="money" class="form-control"
                    placeholder="R$ 0,00" type="text"></money>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group id="unity_products" label="Unidade">
                  <b-form-input v-model="product.unity_products" placeholder="UN"></b-form-input>
                </b-form-group>
              </b-col>
            </b-form-row>
          </b-col>
        </b-form-row>
        <hr />
        <div class="text-right">
          <b-button @click.prevent="formproduct = false" variant="dark" style="margin-right: 5px">Cancel</b-button>
          <b-button type="submit" variant="primary" :disabled="!product.buy_price_products || !product.unity_products">
            Adicionar</b-button>
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
          <b-button @click.prevent="openModal(product, 'add')" variant="success">Novo</b-button>
          {{ ' ' }}
          <b-button @click.prevent="goBack()" variant="primary">Voltar</b-button>
        </b-col>
      </b-row>


      <b-card-body v-if="$resize && $mq.above(750)">
        <b-skeleton-table v-if="!getProducts.data" animation="wave" :rows="5" :columns="6"
          :table-props="{ bordered: false, striped: false }"></b-skeleton-table>
        <div v-else class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>img</th>
                <th>Nome do Produto</th>
                <th>Valor de Compra</th>
                <th>Valor de Venda</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody v-if="getProducts.data.length > 0">
              <tr style="vertical-align:center" v-for="product in getProducts.data" :key="product.id">
                <td>{{ product.id }}</td>
                <td v-if="product.patch"><img style="width: 45px; height: 45px; border-radius:50px"
                    :src="baseURL + product.patch" alt=""></td>
                <td v-else><img style="width: 45px; border-radius:50px" :src="imageSrc" alt=""></td>
                <td>{{ product.description_products }}</td>

                <td>
                  <money class="viewOnly" v-bind="money" v-model="product.buy_price_products" disabled></money>
                </td>
                <td>
                  <money class="viewOnly" v-bind="money" v-model="product.sell_price_products" disabled></money>
                </td>
                <td>
                  <b-button-group size="sm">
                    <router-link class="btn btn-dark" :to="{ name: 'ProductsView', params: { id: product.id } }"
                      variant="info"><i class="fas fa-eye"></i></router-link>

                    <b-button variant="warning" @click.prevent="openModal(product, 'update')"><i class="fas fa-pen"></i>
                    </b-button>

                    <b-button variant="danger" @click.prevent="openModal(product, 'delete')"><i
                        class="fas fa-trash"></i></b-button>
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

        <div v-if="!getProducts.data" style="padding-top: 30px; padding-bottom: 30px;">

          <b-skeleton-table animation="wave" :rows="5" :columns="1" :table-props="{ bordered: false, striped: false }">
          </b-skeleton-table>

        </div>

        <div v-else style="padding-top: 30px; padding-bottom: 30px;">
          <div v-if="getProducts.data.length > 0">
            <div class="accordion" role="tablist" v-for="product in getProducts.data" :key="product.id">
              <div class="mb-1" style="border-bottom: 1px solid #dee2e6">
                <div header-tag="header" class="p-1" role="tab">
                  <div block v-b-toggle="product.id + 'a'" class="text-left responsive-table" variant="default">
                    <p>
                      <b>#{{ product.id }}</b> - {{ product.description_products }}
                    </p>
                    <span style="position: absolute; top: 5px; right: 5px">
                      <i class="fas fa-ellipsis-v"></i>
                    </span>
                  </div>
                </div>
                <b-collapse :id="product.id + 'a'" accordion="my-accordion" role="tabpanel">
                  <b-card-body>

                    <div>
                      <div v-if="product.patch"
                        :style="'border-radius: 5px; box-shadow: 0px 0px 10px 0px #f1f1f1; height: 150px; overflow: hidden; background-repeat: no-repeat; background-position: center; background: url(' + baseURL + product.patch + ') 0% 50% / cover;'">
                      </div>
                      <div v-else
                        :style="'height: 150px; overflow: hidden; background-repeat: no-repeat; background-position: center; background: url(' + baseURL + 'storage/products/default.jpg) 0% 50% / cover;'">
                      </div>
                    </div>
                    <br>
                    <p><b>Nome:</b> {{ product.description_products }}</p>
                    <p><b>Valor de Compra:</b>
                      <money class="viewOnly" v-bind="money" v-model="product.buy_price_products" disabled></money>
                    </p>
                    <p><b>Valor de Venda:</b>
                      <money class="viewOnly" v-bind="money" v-model="product.sell_price_products" disabled></money>
                    </p>
                    <p><b>Lucro:</b>
                      <money class="viewOnly" v-bind="money" v-model="product.earning_products" disabled></money>
                    </p>

                    <p class="text-center">

                      <b-button-group size="sm">
                        <router-link class="btn btn-dark" :to="{ name: 'ProductsView', params: { id: product.id } }"
                          variant="info"><i class="fas fa-eye"></i></router-link>

                        <b-button variant="warning" @click.prevent="openModal(product, 'update')"><i
                            class="fas fa-pen"></i></b-button>

                        <b-button variant="danger" @click.prevent="openModal(product, 'delete')"><i
                            class="fas fa-trash"></i></b-button>
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



      <div class="text-center" style="width: 100%">
        <div>
          <pagination :limit="1" :align="'center'" :data="getProducts" @pagination-change-page="getResults">
          </pagination>
        </div>
      </div>

    </b-card>
  </div>
</template>

<script>
import SpinnerComponent from '../../spinnerComponent.vue';
import { Money } from 'v-money'

export default {
  name: "productsComponents",
  props: ['data'],
  components: {
    SpinnerComponent,
    Money,
  },
  data() {

    return {
      formAddproduct: false,
      fileSelected: null,
      readonly: true,
      baseURL: null,
      newproduct: {},
      ModalDelete: false,
      formproduct: false,
      spinner: false,
      productData: '',
      imageSrc: null,
      imageEdit: '',
      product: [],
      percent: {
        decimal: ',',
        prefix: '',
        suffix: '',
        precision: 2,
        masked: false
      },
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

    if (window.location.hostname === 'localhost') {
      this.baseURL = 'http://' + window.location.hostname + ':8000/'
    } else {
      this.baseURL = 'https://zeus.azevedoseg.com/public/'
    }

    this.imageSrc = this.baseURL + 'storage/products/default.jpg'

    this.$store.dispatch('getProducts').then(() => {

    })

  },
  computed: {

    getProducts() {
      return this.$store.getters.products
    },
    getproductById() {
      return this.$store.getters.product
    },

  },

  watch: {
    formproduct(formproduct) {
      this.fileSelected = ''
      if (formproduct == true) {
        this.imageEdit = this.baseURL + this.product.patch
      }
      if (formproduct == false) {
        console.log('hehe')
      }
    }
  },


  methods: {


    calcPercent() {
      if (this.newproduct.gain_percent) {
        let rest = this.newproduct.gain_percent / 100
        let fator = 1 - rest
        let value = this.newproduct.buy_price_products * fator

        this.newproduct.earning_products = this.newproduct.buy_price_products - value

        this.newproduct.sell_price_products = this.newproduct.earning_products + this.newproduct.buy_price_products
      }
    },

    calcValue() {
      if (this.newproduct.sell_price_products && !this.newproduct.gain_percent) {

        let margin = this.newproduct.sell_price_products - this.newproduct.buy_price_products
        let gain = margin / this.newproduct.buy_price_products * 100
        let percent = gain
        if (percent < 0) {
          this.newproduct.gain_percent = 0
        } else {
          this.newproduct.gain_percent = Math.round(percent)
        }

        this.newproduct.earning_products = margin + margin - margin
      }
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

    alert(title, variant, action, data) {
      this.toastCount++;
      this.$bvToast.toast(
        'O produto ' + data.name_product + ' foi ' + action + ' com sucesso',
        {
          title: title,
          autoHideDelay: 3000,
          variant: variant,
          appendToast: true,
        }
      );
    },

    goBack() {
      return this.$router.go(-1)
    },

    clearRegisters() {

    },

    submitproduct(id) {

      this.spinner = true

      if (id) {
        console.log('edição')

        var json_arra = JSON.stringify(this.product)
        var formDataEdit = new FormData();

        if (this.fileSelected) {
          formDataEdit.append('file', this.fileSelected)
        }
        formDataEdit.append('product', json_arra)

        this.$store.dispatch('editProduct', formDataEdit).then(
          this.formproduct = false,

        )
      } else {

        var json_arr = JSON.stringify(this.newproduct)

        var formData = new FormData();
        formData.append('file', this.fileSelected)
        formData.append('product', json_arr)


        this.$store.dispatch('addProduct', formData).then(

          this.formAddproduct = false,
          this.newproduct.buy_price_products = 0,
          this.newproduct.sell_price_products = 0,
          this.newproduct.gain_percent = 0,
          this.newproduct.earning_products = 0,
          this.newproduct.unity_products = '',
          this.newproduct.description_products = ''
        )
      }
      this.$store.dispatch('getProducts'),
        this.formproduct = false
      this.spinner = false



    },

    openModal(data, action) {
      if (action === 'delete') {
        this.ModalDelete = true
      }
      if (action === 'update') {
        this.formproduct = true
      }
      if (action === 'add') {
        this.clearRegisters()
        this.formAddproduct = true
      }
      this.product = data
    },

    deleteproduct(product) {
      this.spinner = true
      this.$store.dispatch('deletProduct', product).then(
        this.alert('Produto Excluido com sucesso', 'success', 'excluido', product),
        this.$store.dispatch('getProducts'),
        this.spinner = false,
        this.ModalDelete = false
      )
    },

    getResults(page = 1) {
      this.$store.dispatch('getProducts', {
        'page': page
      })
    }
  }
}
</script>

<style scoped  lang="css">
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

.imageUpload {
  width: 185px;
  height: 185px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.iconupload {
  width: 70px;
  height: 185px;
  opacity: 0.4;
}

.buttonup {
  width: 185px;
  height: 185px;
}

.buttonup svg {
  margin: auto;
  width: auto;
  padding: 60px;

}

label {
  cursor: pointer;
}

#upload-photo {
  opacity: 0;
  position: absolute;
  z-index: -1;
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
