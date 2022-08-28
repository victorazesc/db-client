<template>
  <div id="app">
    <SpinnerComponent v-if="spinner" />
    <router-view></router-view>
  </div>
</template>

<script>

import SpinnerComponent from './components/spinnerComponent.vue';
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    SpinnerComponent
  },
  data() {
    return {
      spinner: false,
      profile: '',
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
    })
  },
}
</script>


