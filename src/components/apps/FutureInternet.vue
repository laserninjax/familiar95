<template>
  <div>
    <input type="text" v-model="url" />
    <button @click="go">Go</button>
    <iframe
      v-if="activeUrl"
      :src="url"
      width="100%"
      height="500"
      title="Minesweeper"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "FutureInternet",
  title: "Internet of The Future",
  icon: "search_on_earth-0",
  defaultWidth: 800,
  defaultHeight: 600,
  data() {
    return {
      url: "",
      activeUrl: null
    };
  },
  methods: {
    go() {
      this.activeUrl = this.url;
    }
  }
};
</script>

<style scoped lang="scss">
iframe {
  filter: sepia(100%);
}

button {
  margin-left: 10px;
}

input {
  width: 300px;
}
</style>
