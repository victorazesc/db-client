<template>
  <div class="main"
    style="top: 0; left: 0; position: fixed; z-index: 9999; width: 100%; background: rgb(34 34 34 / 80%); height: -webkit-fill-available;">
    <div class=container6>
      <p><img src="../../static/spinner.gif" alt=""></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" src="" scoped>
div.container6 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

div.container6 p {

  img {
    width: 180px;
  }

  margin: 0
}
</style>