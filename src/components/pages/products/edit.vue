<template>
  <div class="clients">
    <b-card border-variant="white">
      <b-row>
        <b-col cols="8" class="text-left">
          <h4>{{ $route.meta.title }}</h4>
        </b-col>
        <b-col cols="4" class="text-right">
          <b-button @click.prevent="goBack()" variant="primary">Voltar</b-button>
        </b-col>
      </b-row>

      <b-card-body>

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
                    <b-form-input v-model="product.description_products" placeholder="Descrição do produto" required=""></b-form-input>
                  </b-form-group>
                </b-col>

                <b-col cols="12" md="3">
                  <b-form-group id="document_product" label="Preço da Compra:">
                    <money class="form-control" v-model="product.buy_price_products" v-bind="money" @keyup.native="calcValue()"></money>
                  </b-form-group>
                </b-col>
              </b-form-row>

              <b-form-row>
                <b-col cols="6" md="3">
                  <b-form-group id="gain_percent" label="Margem de Lucro:">
                    <percent-input v-model="product.gain_percent" @keyup.native="calcPercent()" class="form-control" v-bind="percent"></percent-input>

                  </b-form-group>
                </b-col>
                <b-col cols="6" md="3">
                  <b-form-group id="sell_price_products" label="Valor de Venda:">
                    <money v-model="product.sell_price_products" v-bind="money" @keyup.native="calcValue()" :disabled="this.newproduct.gain_percent > 0" class="form-control" placeholder="R$ 0,00"></money>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group id="earning_products" label="Lucro:">

                    <money v-model="product.earning_products" disabled v-bind="money" class="form-control" placeholder="R$ 0,00" type="text"></money>
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
          <div class="text-left">
            <b-button type="submit" variant="primary" :disabled="!product.buy_price_products || !product.unity_products">Confirmar</b-button>
          </div>
        </b-form>

      </b-card-body>
    </b-card>
  </div>
</template>

<script>
// import SpinnerComponent from '../../spinnerComponent.vue';

export default {
  name: "productsEditComponent",
  props: ["data"],
  components: {
    //  SpinnerComponent
  },
  data () {
    return {
      files: [],
      readonly: true,
      ModalDelete: false,
      formClient: false,
      spinner: false,
      product: {},
      disabled: true,
      imageEdit: '',
      newproduct: {},
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
    };
  },

  computed: {

    filesall () {
      return this.$store.getters.files
    },

    getUser () {
      return this.$store.getters.user
    }
  },

  created () {

    this.$store.dispatch("getProductById", this.$route.params.id).then(resp => {
      this.imageEdit = 'http://localhost:8000/' + resp.patch
      this.product = resp
    })
    this.$store.dispatch("getFiles");
  },


  methods: {


    calcPercent () {
      if (this.product.gain_percent) {
        let rest = this.product.gain_percent / 100
        let fator = 1 - rest
        let value = this.product.buy_price_products * fator

        this.product.earning_products = this.product.buy_price_products - value

        this.product.sell_price_products = this.product.earning_products + this.product.buy_price_products
      }
    },

    calcValue () {
      if (this.product.sell_price_products && !this.product.gain_percent) {

        let margin = this.product.sell_price_products - this.product.buy_price_products //10
        let gain = margin / this.product.buy_price_products * 100
        let percent = gain
        if (percent < 0) {
          this.product.gain_percent = 0
        } else {
          this.product.gain_percent = Math.round(percent)
        }

        this.product.earning_products = margin + margin - margin
      }
    },


    editImage (e) {
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


    setImage (e) {
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

    alert (title, variant, action, data) {
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

    goBack () {
      return this.$router.go(-1)
    },

    clearRegisters () {

    },

    submitproduct (id) {

      this.spinner = true

      if (id) {
        var json_arra = JSON.stringify(this.product)
        var formDataEdit = new FormData();

        if (this.fileSelected) {
          formDataEdit.append('file', this.fileSelected)
        }
        formDataEdit.append('product', json_arra)

        this.$store.dispatch('editProduct', formDataEdit).then(
          this.$router.push({ name: 'products' }),
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

    openModal (data, action) {
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

    deleteproduct (product) {
      this.spinner = true
      this.$store.dispatch('deletProduct', product).then(
        this.alert('Produto Excluido com sucesso', 'success', 'excluido', product),
        this.$store.dispatch('getProducts'),
        this.spinner = false,
        this.ModalDelete = false
      )
    },

    getResults (page = 1) {
      this.$store.dispatch('getProducts', {
        'page': page
      })
    }
  }


};
</script>

<style scoped  lang="css">
.imageUpload {
  width: 185px;
  height: 185px;
  background-image: url(http://localhost:8000/storage/products/default.jpg);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.iconupload {
  width: 70px;
  height: 185px;
  margin-left: 60px;
  opacity: 0.4;
}
.buttonup {
  width: 185px;
  height: 185px;
}

label {
  cursor: pointer;
  /* Style as you please, it will become the visible UI component. */
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
