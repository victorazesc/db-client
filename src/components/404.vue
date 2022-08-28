<template>
  <div class="center">
    <div class="separator separator-bottom separator-skew zindex-100" style="
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 100%;
">
      <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <polygon style="fill: rgb(0 0 0 / 8%)" points="2580 0 -2580 0 0 100"></polygon>
      </svg>
    </div>
    <div class="inner">
      <h1 style="font-size: 80px; color: #333">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 16 16"
          style="fill: #333333">
          <path
            d="M 7.5 0.976563 C 3.917969 0.976563 1 3.894531 1 7.476563 C 1 11.0625 3.917969 13.980469 7.5 13.980469 C 11.082031 13.980469 14 11.0625 14 7.476563 C 14 3.894531 11.082031 0.980469 7.5 0.976563 Z M 7.5 1.976563 C 10.542969 1.976563 13 4.433594 13 7.476563 C 13 10.523438 10.542969 12.980469 7.5 12.980469 C 4.457031 12.980469 2 10.523438 2 7.476563 C 2 4.433594 4.457031 1.976563 7.5 1.976563 Z M 5 5 C 4.449219 5 4 5.449219 4 6 C 4 6.550781 4.449219 7 5 7 C 5.550781 7 6 6.550781 6 6 C 6 5.449219 5.550781 5 5 5 Z M 10 5 C 9.449219 5 9 5.449219 9 6 C 9 6.550781 9.449219 7 10 7 C 10.550781 7 11 6.550781 11 6 C 11 5.449219 10.550781 5 10 5 Z M 7.5 9 C 6.375 9 5.609375 9.398438 5.152344 9.820313 C 4.695313 10.242188 4.527344 10.710938 4.527344 10.710938 L 5.472656 11.039063 C 5.472656 11.039063 5.542969 10.820313 5.832031 10.554688 C 6.121094 10.289063 6.601563 10 7.5 10 C 8.363281 10 8.847656 10.285156 9.148438 10.558594 C 9.449219 10.832031 9.535156 11.058594 9.535156 11.058594 L 10.464844 10.691406 C 10.464844 10.691406 10.28125 10.230469 9.820313 9.816406 C 9.359375 9.402344 8.597656 9 7.5 9 Z">
          </path>
        </svg>404
      </h1>
      <p>Opps parece que esta pagina não existe ou ainda esta em construção!</p>
      <p>Você pode voltar para a pagina Inicial <router-link to="/">Clicando Aqui</router-link>
      </p>
    </div>
    <div class="separator separator-bottom separator-skew zindex-100" style="
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 100%;
">
      <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <polygon style="fill: rgb(0 0 0 / 8%)" points="2560 0 2560 100 0 100"></polygon>
      </svg>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#app {
  height: 100%;
  position: relative;
}

.center {
  height: 100%;
  position: relative;
  background: #f9f9f9;
}

.center .inner {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: -webkit-center;
}
</style>