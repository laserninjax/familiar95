<template>
  <div
    id="desktop"
    @mousedown="
      deselectShortcuts();
      closeTaskbarMenu();
    "
    :class="{ 'desktop--loading': loading }"
  >
    <template v-if="introOpen">
      <Intro />
    </template>
    <template v-else>
      <div id="shortcuts" class="shortcuts" ref="shortcuts">
        <Shortcut
          v-for="shortcut in shortcuts"
          :key="shortcut.app.name"
          :app="shortcut.app"
          :x="shortcut.x"
          :y="shortcut.y"
          :selected="shortcut.selected"
          @select="selectShortcut"
          @open="openApp"
          @move="moveShortcut"
        />
      </div>
      <div ref="windowsContainer" id="windows">
        <Window
          v-for="windowProps in windows"
          :active="windowProps.active"
          :key="windowProps.id"
          :x="windowProps.x"
          :y="windowProps.y"
          :title="windowProps.title"
          :width="windowProps.width"
          :height="windowProps.height"
          :id="windowProps.id"
          :maximized="windowProps.maximized"
          :minimized="windowProps.minimized"
          :icon="windowProps.app.icon"
          :app="windowProps.app"
          @move="moveWindow"
          @close="closeWindow"
          @maximize="maximizeWindow"
          @minimize="minimizeWindow"
          @click-window="activateWindow"
          @create-notification="createNotification"
        />
      </div>
      <div ref="notifications" id="notifications">
        <Notification
          v-for="notification in notifications"
          :key="notification.id"
          :x="notification.x"
          :y="notification.y"
          :type="notification.type"
          :title="notification.title"
          :id="notification.id"
          @close="closeNotification"
          @move="moveNotification"
        >
          <div v-html="notification.content"></div>
        </Notification>
      </div>
      <Taskbar
        :windows="windows"
        :apps="apps"
        :activeWindow="activeWindow"
        :menuOpen="taskbarMenuOpen"
        @openMenu="openTaskbarMenu"
        @closeMenu="closeTaskbarMenu"
        @openApp="openApp"
        @activate-window="activateWindow"
        @minimize-window="minimizeWindow"
      />
    </template>
  </div>
</template>

<script>
import Intro from "./dialogs/Intro.vue";
import Window from "./Window.vue";
import Notification from "./dialogs/Notification.vue";
import Taskbar from "./Taskbar.vue";
import Shortcut from "./Shortcut.vue";

// Apps
import MyComputer from "./apps/MyComputer.vue";
import MyDocuments from "./apps/MyDocuments.vue";
import RecycleBin from "./apps/RecycleBin.vue";
import About from "./apps/About.vue";
import Mina from "./apps/Mina.vue";

export default {
  name: "Desktop",
  props: {},
  components: {
    Intro,
    Taskbar,
    Window,
    Notification,
    Shortcut
  },
  data() {
    return {
      introOpen: true,
      windows: [],
      notifications: [],
      apps: [MyComputer, MyDocuments, RecycleBin, About, Mina],
      loading: false,
      activeWindow: null,
      shortcuts: [
        { app: MyComputer, selected: false, x: 0, y: 10 },
        { app: MyDocuments, selected: false, x: 0, y: 80 },
        { app: RecycleBin, selected: false, x: 0, y: 150 },
        { app: About, selected: false, x: 0, y: 220 },
        { app: Mina, selected: false, x: 0, y: 290 },
      ],
      taskbarMenuOpen: false,
      sounds: {
        ding: new Audio(require("../assets/sounds/ding.mp3")),
        chord: new Audio(require("../assets/sounds/chord.mp3")),
        tada: new Audio(require("../assets/sounds/tada.mp3")),
        chimes: new Audio(require("../assets/sounds/chimes.mp3")),
        microsoft: new Audio(
          require("../assets/sounds/The_Microsoft_Sound.mp3")
        )
      },
      soundMap: {}
    };
  },
  created() {
    this.soundMap = {
      info: this.sounds.chimes,
      warning: this.sounds.ding,
      error: this.sounds.chord
    };

    let startup = ()=> {
      this.introOpen = false
      //this.sounds.microsoft.play();
      document.removeEventListener("keypress", startup);
    }
    document.addEventListener("keypress", startup);
  },
  mounted() {
  },
  methods: {
    randomId() {
      return Math.floor(Math.random() * 99999999999);
    },
    findWindow(id) {
      return this.windows.find(w => w.id == id);
    },
    deselectShortcuts() {
      if (!this.shortcuts.find(s => s.selected)) return;
      this.shortcuts.forEach(s => (s.selected = false));
    },
    deactivateWindows() {
      this.windows.forEach(w => (w.active = false));
    },
    selectShortcut(app) {
      this.deselectShortcuts();
      this.shortcuts.find(s => s.app == app).selected = true;
    },
    openApp(app) {
      this.deactivateWindows();
      this.deselectShortcuts();
      this.closeTaskbarMenu();

      const windowProps = {
        title: app.title,
        x: 100 + this.windows.length * 20,
        y: 100 + this.windows.length * 20,
        width: app.defaultWidth,
        height: app.defaultHeight,
        id: this.randomId(),
        active: true,
        maximized: false,
        minimized: false,
        app: app
      };

      this.loading = true;
      setTimeout(() => {
        this.windows.push(windowProps);
        this.activeWindow = windowProps;
        this.loading = false;
      }, Math.random() * 2000);
    },
    openTaskbarMenu() {
      this.taskbarMenuOpen = true;
    },
    closeTaskbarMenu() {
      this.taskbarMenuOpen = false;
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
      this.windows = this.windows.filter(w => w.id != data.id);
    },
    moveWindow(data) {
      const movedWindow = this.findWindow(data.component.id);
      movedWindow.x = data.x;
      movedWindow.y = data.y;
    },
    moveShortcut(data) {
      const movedShortcut = this.shortcuts.find(
        s => s.app == data.component.app
      );
      movedShortcut.x = data.x;
      movedShortcut.y = data.y;
    },
    createNotification(data) {
      this.notifications.push({
        id: this.randomId(),
        title: data.title,
        content: data.content,
        x: window.innerWidth / 2 - 200 + this.notifications.length * 20,
        y: window.innerHeight / 2 - 100 + this.notifications.length * 20,
        type: data.type
      });

      this.soundMap[data.type].play();
    },
    closeNotification(data) {
      this.notifications = this.notifications.filter(w => w.id != data.id);
    },
    moveNotification(data) {
      const movedNotification = this.notifications.find(
        n => n.id == data.component.id
      );
      movedNotification.x = data.x;
      movedNotification.y = data.y;
    },
    activateWindow(data) {
      this.activeWindow = this.findWindow(data.id);
      this.activeWindow.minimized = false;
      this.windows.forEach(w => (w.active = w.id == data.id));
    },
    openFullscreen() {
      const docElm = document.documentElement;
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }
    }
  }
};
</script>

<style lang="scss">
#desktop {
  background-image: url('https://www.itl.cat/pngfile/big/2-25560_vaporwave-wallpaper-aesthetic-purple-road.jpg');
  background-size: cover;
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

.desktop--loading {
  cursor: url("../assets/cursors/wait.gif"), auto;
}

#windows {
  position: relative;
  width: 100%;
  height: calc(100% - 30px);
}
</style>
