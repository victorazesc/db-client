<template>

  <section>
    <header class="header-global">

      <nav id="navbar-main" class="navbar navbar-main navbar-expand-lg navbar-transparent navbar-light headroom">

        <div class="container">
          <router-link to="/" class="navbar-brand mr-lg-5">
            <img src="../../../../static/logo.svg"> <span style="font-size:15px; padding-left: 10px;"> Regularização e
              Registros</span>
          </router-link>

          <a v-b-toggle.collapse-1 variant="none" class="navbar-toggler">
            <span class="navbar-toggler-icon"></span>
          </a>

          <div class="navbar-collapse collapse" id="navbar_global" v-if="$resize && $mq.above(768)">
            <div class="navbar-collapse-header">
              <div class="row">
                <div class="col-6 collapse-brand">
                  <a href="http://localhost/db/index.html">
                    <img src="http://localhost/db/assets/img/brand/blue.png">
                  </a>
                </div>
                <div class="col-6 collapse-close">
                  <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar_global"
                    aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </div>
            </div>

            <ul class="navbar-nav align-items-lg-center ml-lg-auto">
              <li class="nav-item">
                <router-link class="nav-link nav-link-icon" to="/">
                  <span class="nav-link-inner--text">Home</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link nav-link-icon" to="/sobre">
                  <span class="nav-link-inner--text">Sobre a DB</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link nav-link-icon" to="/servicos">
                  <span class="nav-link-inner--text">Serviços</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link nav-link-icon" to="/ajuda">
                  <span class="nav-link-inner--text">FAQ</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link nav-link-icon" to="/contato">
                  <span class="nav-link-inner--text">Fale conosco</span>
                </router-link>
              </li>

            </ul>
          </div>

          <b-collapse id="collapse-1" class="navbar-collapse collapse" v-if="$resize && $mq.below(768)">
            <div class="">
              <div class="row">
                <div class="col-6 collapse-brand">
                  <router-link to="/" class="navbar-brand mr-lg-5">
                    <img src="../../../../static/logo.svg"> <span
                      style="color: #444; font-size:12px; padding-left: 10px;"> Assuntos Regulatórios</span>
                  </router-link>
                </div>
                <div class="col-6 collapse-close">
                  <a v-b-toggle.collapse-1 style="margin: 15px 0px;">
                    <svg viewBox="0 0 24 24" style="color: #999;" width="35" height="35" stroke="currentColor"
                      stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <hr>
            <ul class="navbar-nav align-items-lg-center ml-lg-auto">
              <li class="nav-item">
                <router-link class="nav-link nav-link-icon" to="/">
                  <span class="nav-link-inner--text">Home</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link nav-link-icon" to="/sobre">
                  <span class="nav-link-inner--text">Sobre a DB</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link nav-link-icon" to="/servicos">
                  <span class="nav-link-inner--text">Serviços</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link nav-link-icon" to="/ajuda">
                  <span class="nav-link-inner--text">FAQ</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link nav-link-icon" to="/contato">
                  <span class="nav-link-inner--text">Fale conosco</span>
                </router-link>
              </li>

            </ul>

          </b-collapse>
        </div>
      </nav>
    </header>

  </section>


</template>

<script>
export default {
  name: "heading",
  components: {}
};
</script>

<style lang="scss" src="./argon.scss" scoped>
</style>