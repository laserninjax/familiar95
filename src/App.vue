<template>
  <div id="app">
    <Desktop />
  </div>
</template>

<script>
import Desktop from "./components/Desktop.vue";

export default {
  name: "App",
  components: {
    Desktop
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background-color: #00807f;
}
</style>
