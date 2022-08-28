<template>
  <SpinnerComponent v-if="spinner" />
</template>

<script>
import SpinnerComponent from '../../spinnerComponent.vue';

export default {
  name: "login",
  components: {
    SpinnerComponent,
  },
  data() {
    return {
      spinner: true,
    };
  },
  created() {
    this.$store.dispatch('destroyToken').then(response => {

      if (response.status === 200) {
        return false
      }

    })

  }
}
</script>