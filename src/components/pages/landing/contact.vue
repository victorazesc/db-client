<template>

  <section>
    <heading></heading>

    <main>

      <section class="section section-lg bg-dark" id="contato">
        <div class="container pt-lg pb-300">
          <div class="row text-center justify-content-center">
            <div class="col-lg-10">
              <h2 class="display-3 text-white">Fale Conosco</h2>
              <p class="lead text-white">Entre em contato com a gente pelo telefone (47) 3346-5283 ou nos numeros
                <br>(47) 9 8416-0059 (Dávida) - (47) 9 8416-0216 (Fábiola), ou utilize o formulário abaixo para entrar
                em contato. Se preferir, envie diretamente um e-mail: <br>davida@db-assuntosregulatorios.com</p>
                <p class="lead text-white">Estamos localizados em Itajaí à Av. Almirante Tamandaré, 20 - sala 304</p>
            </div>
          </div>

        </div>

        <div class="separator separator-bottom separator-skew zindex-100">
          <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <polygon class="fill-white" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </section>


      <formContact></formContact>

    </main>

    <footered></footered>

  </section>


</template>

<script>

import footered from './footer';
import formContact from './form-contact';
import heading from './heading';


export default {
  name: "landing",
  components: {
    heading,
    footered,
    formContact
  }
};
</script>


<style lang="scss" src="./argon.scss" scoped>