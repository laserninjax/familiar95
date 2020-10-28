<template>
  <div id="desktop">
    <div ref="windowsContainer" id="windows">
      <Window
        v-for="windowProps in windows"
        :active="windowProps.active"
        :key="windowProps.windowId"
        :x="windowProps.x"
        :y="windowProps.y"
        :title="windowProps.title"
        :width="windowProps.width"
        :height="windowProps.height"
        :windowId="windowProps.windowId"
        :maximized="windowProps.maximized"
        :minimized="windowProps.minimized"
        :icon="windowProps.app.icon"
        @move="moveWindow"
        @close="closeWindow"
        @maximize="maximizeWindow"
        @minimize="minimizeWindow"
        @click-window="activateWindow"
      >
        <component :is="windowProps.app" />
      </Window>
    </div>
    <Taskbar
      :windows="windows"
      :activeWindow="activeWindow"
      @activate-window="activateWindow"
      @minimize-window="minimizeWindow"
    />
  </div>
</template>

<script>
import Window from "./Window.vue";
import Taskbar from "./Taskbar.vue";

// Apps
import About from "./apps/About.vue";
import Mina from "./apps/Mina.vue";
import Opomuc from "./apps/Opomuc.vue";

export default {
  name: "Desktop",
  props: {},
  components: {
    Taskbar,
    Window
  },
  data() {
    return {
      windows: [],
      activeWindow: null
    };
  },
  created() {
  },
  mounted() {
    this.openApp(Mina);
    this.openApp(About);
    this.openApp(Opomuc);
  },
  methods: {
    findWindow(windowId) {
      return this.windows.find(w => w.windowId == windowId);
    },
    openApp(app) {
      const windowProps = {
        title: app.name,
        x: Math.round(Math.random() * 1000),
        y: Math.round(Math.random() * 500),
        width: app.defaultWidth,
        height: app.defaultHeight,
        windowId: Math.random() * 99999999999,
        active: false,
        maximized: false,
        minimized: false,
        app: app
      };
      this.windows.push(windowProps);
    },
    maximizeWindow(data) {
      const currentWindow = this.findWindow(data.id);
      currentWindow.maximized = !currentWindow.maximized;
    },
    minimizeWindow(data) {
      const currentWindow = this.findWindow(data.id);
      currentWindow.active = !currentWindow.active;
      currentWindow.minimized = !currentWindow.minimized;
      this.activeWindow = null;
    },
    closeWindow(data) {
      this.windows = this.windows.filter(w => w.windowId != data.id);
    },
    moveWindow(data) {
      const currentWindow = this.findWindow(data.id);
      currentWindow.x = data.x;
      currentWindow.y = data.y;
    },
    activateWindow(data) {
      this.activeWindow = this.findWindow(data.id);
      this.activeWindow.minimized = false;
      this.windows.forEach(w => (w.active = w.windowId == data.id));
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
  height: calc(100% - 36px);
}
</style>
