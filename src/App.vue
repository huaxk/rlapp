<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

// <script lang="ts">
// import Vue from 'vue'

// export default Vue.extend({
//   name: "App"
// });
// </script>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component"

@Component
class App extends Vue {
  // name = "App"
}
export default App
</script>


<style></style>
