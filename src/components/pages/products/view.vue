<template>
  <div class="products">
    <b-modal id="edit-product" v-model="ModalDelete" size="lg" centered title="Editar Producte" hide-footer>
      <div>
        <br />
        <h5 class="text-center">
          Você realmente deseja excluir
          <strong>{{ product.name_product }}</strong> e todos os dados ligados a
          ele?
        </h5>
        <br />

        <b-button type="submit" variant="dark" @click.prevent="ModalDelete = false">Fechar</b-button>{{ "" }}
        <b-button type="submit" @click.prevent="deleteProduct(product.id)" variant="primary">Deletar</b-button>
      </div>
    </b-modal>

    <b-card border-variant="white">

      <div style="position: relative; min-height: 45px" class="page-header-mobile" v-if="$resize && $mq.below(750)">
        <span data-v-1320ad47="">
          <h4 style="position: absolute;padding: 10px;">Produto</h4>
        </span>
        <span style="position: absolute; right: 0px">
          <b-dropdown size="lg" variant="link" right toggle-class="text-decoration-none" no-caret>
            <template #button-content>
              <i class="fas fa-ellipsis-v"></i>
            </template>
            <b-dropdown-item :to="{ name: 'ProductsEdit', params: { id: $route.params.id } }">
              <span class="ico"><i class="fas fa-pen"></i></span> {{ " " }}Editar
            </b-dropdown-item>
            <b-dropdown-item @click.prevent="openModal('delete')">
              <span class="ico"><i class="fas fa-trash"></i></span>{{ " " }}Excluir
            </b-dropdown-item>
            <b-dropdown-item @click.prevent="goBack()">
              <span style="padding-right: 15px;"><i class="fas fa-chevron-left"></i></span> {{ " " }}Voltar
            </b-dropdown-item>
          </b-dropdown>
        </span>
      </div>



      <b-row v-if="$resize && $mq.above(750)">
        <b-col cols="8" class="text-left">
          <h4>{{ $route.meta.title }}</h4>
        </b-col>
        <b-col cols="4" class="text-right">
          <b-button variant="danger" @click.prevent="openModal('delete')">Excluir</b-button>
          {{ " " }}
          <b-button :to="{ name: 'ProductsEdit', params: { id: $route.params.id } }" variant="success">Editar</b-button>
          {{ " " }}

          <b-button @click.prevent="goBack()" variant="primary">Voltar</b-button>
        </b-col>
      </b-row>

      <b-card-body>
        <div v-if="product">
          <b-tabs pills content-class="mt-3" justified>
            <b-tab variant="dark" title="Dados" active>
              <br>
              <b-row>
                <b-col md="4">
                  <img v-if="product.patch" width="100%" :src="baseURL + product.patch" alt="">
                  <img v-else width="100%" :src="imageSrc" alt="">
                </b-col>
                <b-col style="align-self: center;">
                  <br>
                  <h5>{{ product.description_products }}</h5>
                  <br>
                  <p>
                    <strong>Preço de Compra:</strong>
                    {{ product.buy_price_products }}
                  </p>
                  <p>
                    <strong>Preço de venda:</strong>
                    {{ product.sell_price_products }}
                  </p>
                  <p>
                    <strong>Lucro: </strong>{{
                        product.earning_products
                    }}
                  </p>
                  <p>
                    <strong>Unidade: </strong>{{
                        product.unity_products
                    }}
                  </p>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab title="Ordens">
              <b-table striped hover :items="items"></b-table>
            </b-tab>
          </b-tabs>
        </div>

        <div v-else>
          <b-tabs content-class="mt-3">
            <b-tab title="Dados do Produto" active>
              <b-row>
                <b-col md="4">
                  <b-skeleton-img no-aspect height="350px"></b-skeleton-img>
                </b-col>
                <b-col style="align-self: center;">
                  <br>
                  <h5>
                    <b-skeleton></b-skeleton>
                  </h5>
                  <br>
                  <p>
                    <strong>Preço de Compra:</strong>
                    <b-skeleton animation="fade" width="15%" style="float: right"></b-skeleton>
                  </p>
                  <p>
                    <strong>Preço de venda:</strong>
                    <b-skeleton animation="fade" width="15%" style="float: right"></b-skeleton>
                  </p>
                  <p>
                    <strong>Lucro: </strong>
                    <b-skeleton animation="fade" width="15%" style="float: right"></b-skeleton>
                  </p>
                  <p>
                    <strong>Unidade: </strong>
                    <b-skeleton animation="fade" width="15%" style="float: right"></b-skeleton>
                  </p>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab title="Ordens de Serviços">
              <b-table striped hover :items="items"></b-table>
            </b-tab>
          </b-tabs>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "productsViewComponent",
  props: ["data"],
  data() {
    return {
      ModalDelete: false,
      formProdu: false,
      spinner: false,
      productData: "",
      baseURL: null,
      imageSrc: null,

      product: null,
      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 38, first_name: "Jami", last_name: "Carney" },
      ],
    };
  },

  computed: {
    getProductById() {
      return this.$store.getters.product;
    },
  },

  created() {

    if (window.location.hostname === 'localhost') {
      this.baseURL = 'http://' + window.location.hostname + ':8000/'
    } else {
      this.baseURL = 'https://zeus.azevedoseg.com/public/'
    }

    this.imageSrc = this.baseURL + 'storage/products/default.jpg'


    this.$store.dispatch("getProductById", this.$route.params.id).then(resp => {

      this.product = resp

    })
  },

  methods: {

    goBack() {
      return this.$router.go(-1);
    },

    openModal(action) {
      if (action === "delete") {
        this.ModalDelete = true;
      }
    },

    deleteProduct() {
      this.spinner = true;
      this.$store
        .dispatch("deletProduct", this.product)
        .then(
          this.$router.push({ name: 'products' }),
          this.spinner = false,
        );
    }
  }
}
</script>

<style scoped  lang="scss" src="../../../assets/scss/_main.scss">
.fade {
  opacity: 1 !important;
  transition: opacity 0.15s linear;
}
</style>