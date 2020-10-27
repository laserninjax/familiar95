<template>
  <div id="desktop">
    <div ref="windowsContainer" id="windows">
      <component
        v-for="windowProps in windows"
        :top="windowProps.top"
        :is="windowClass"
        :key="windowProps.windowId"
        :x="windowProps.x"
        :y="windowProps.y"
        :title="windowProps.title"
        :width="windowProps.width"
        :height="windowProps.height"
        :windowId="windowProps.windowId"
        :maximized="windowProps.maximized"
        @move="moveWindow"
        @close="closeWindow"
        @maximize="maximizeWindow"
        @clickWindow="clickWindow"
      />
    </div>
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
  created() {},
  mounted() {
    for (let i = 0; i < 3; i++) {
      this.createWindow();
    }
  },
  methods: {
    findWindow(windowId) {
      return this.windows.find(w => w.windowId == windowId);
    },
    createWindow() {
      const windowProps = {
        title: "test",
        x: Math.round(Math.random() * 1000),
        y: Math.round(Math.random() * 500),
        width: 300,
        height: 300,
        windowId: Math.random() * 99999999999,
        top: true,
        maximized: false
      };
      this.windows.push(windowProps);
    },
    maximizeWindow(data) {
      const currentWindow = this.findWindow(data.id);
      currentWindow.maximized = !currentWindow.maximized;
    },
    closeWindow(data) {
      this.windows = this.windows.filter(w => w.windowId != data.id);
    },
    moveWindow(data) {
      const currentWindow = this.findWindow(data.id);
      currentWindow.x = data.x;
      currentWindow.y = data.y;
    },
    clickWindow(data) {
      this.windows.forEach(w => (w.top = w.windowId == data.id));
    }
  }
};
</script>

<style lang="scss">
#desktop {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

#windows {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
