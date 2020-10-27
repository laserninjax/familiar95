<template>
  <div id="desktop">
    <div ref="windowsContainer" id="windows">
      <component
        v-for="windowProps in windows"
        :is="windowClass"
        :key="windowProps.windowId"
        :x="windowProps.x"
        :y="windowProps.y"
        :title="windowProps.title"
        :width="windowProps.width"
        :height="windowProps.height"
        :windowId="windowProps.windowId"
        @close="closeWindow"
      />
    </div>
    <button @click="createWindow">Create Window</button>
  </div>
</template>

<script>
import Window from "./Window.vue";

export default {
  name: "Desktop",
  props: {},
  data() {
    return {
      windowClass: Window,
      windows: []
    };
  },
  created() {
    this.$on("close", windowUid => {
      alert(windowUid);
    });
  },
  methods: {
    createWindow() {
      const windowProps = {
        title: "test",
        x: Math.random() * 1000,
        y: Math.random() * 500,
        width: 200,
        height: 100,
        windowId: Math.random() * 99999999999
      };
      this.windows.push(windowProps);
    },
    closeWindow(windowId) {
      this.windows = this.windows.filter(w => w.windowId != windowId);
    }
  }
};
</script>

<style lang="scss">
#desktop {
  width: 100vw;
  height: 100vh;
}

#windows {
  position: relative;
  width: 100%;
  height: 100%;

  .window {
    position: absolute;
  }
}
</style>
