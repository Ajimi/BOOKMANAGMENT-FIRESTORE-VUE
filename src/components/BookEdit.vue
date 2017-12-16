<template>
  <div>
    {{name}}
  </div>
</template>


<script>

  import Database from './firebase'

  export default {

    name: 'BookEdit',


    data() {
      return {
        name: "Hello"
      }
    }

  }
</script>

<style lang="css" scoped>
</style>
