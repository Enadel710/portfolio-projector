<template>
  <div v-if="data">
      <b-container fluid>
          <b-row class="list-text" align-h="center" v-bind:key="d.cat" v-for="d in data">
              <h6>{{d.cat}} : {{d.value}}</h6>
          </b-row>
      </b-container>
  </div>
</template>
<script>
export default {
  name: "List",
  props: {
    data: { type: Array, default: null },
  }
};
</script>

<style scoped>

</style>