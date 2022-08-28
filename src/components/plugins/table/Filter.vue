<template>
  <input :class="classes" :placeholder="placeholder" v-model="search" v-on:keypress="filterList" style="width: 200px">
</template>

<script>
export default {
  name: 'table-filter',
  props: ['classes', 'indexToFilter', 'listName', 'listToFilter', 'placeholder', 'computedData', 'setActionName'],
  data() {
    return {
      search: '',
      listFiltered: [],
      originalValues: this.listToFilter
    }
  },
  methods: {
    filterList: function () {
      this.$nextTick(function () {
        let toFilter = this.listToFilter
        this.listFiltered = []
        if (this.search.length > 0) {
          for (let label of this.indexToFilter) {
            let newList = toFilter.filter(element => {
              return element[label].toLowerCase().includes(this.search.toLowerCase())
            })
            if (newList.length > 0) {
              this.listFiltered = newList
              break
            }
          }
          if (!this.computedData) {
            this.$parent[this.listName] = this.listFiltered
          } else {
            this.$store.dispatch(this.setActionName, this.listFiltered)
          }
          this.$parent.listFiltered = true
        } else {
          if (!this.computedData) {
            this.$parent[this.listName] = this.originalValues
          } else {
            this.$store.dispatch(this.setActionName, this.originalValues)
          }
          this.$parent.listFiltered = false
        }
      })
    }
  }
}
</script>