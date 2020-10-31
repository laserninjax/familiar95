<template>
  <div class="taskbar" @mousedown.stop>
    <div class="taskbar__inner">
      <button
        class="start-button"
        :class="{ active: menuOpen }"
        @click="toggleMenu"
      >
        <span>
          <img src="./../assets/icons/start_icon.png" />
          Start
        </span>
      </button>
      <div v-if="menuOpen" class="menu" @click="closeMenu">
        <div class="menu__graphic">
          <img src="./../assets/images/windows97start.png" />
        </div>
        <div class="menu__inner">
          <div class="menu__item">
            <img
              src="./../assets/icons/program_folder_16x16px_&_24x24px-0.png"
            />
            Programs
          </div>
          <div class="menu__item">
            <img src="./../assets/icons/documents_folder-0.png" />
            Documents
          </div>
          <div class="menu__item">
            <img src="./../assets/icons/settings-0.png" />
            Settings
          </div>
          <div class="menu__item">
            <img
              src="./../assets/icons/search_in_sheet_16x16px_&_24x24px-0.png"
            />
            Find
          </div>
          <div class="menu__item">
            <img src="./../assets/icons/help_book-0.png" />
            Help
          </div>
          <div class="menu__item" @click.stop="$emit('openApp', runApp)">
            <img src="./../assets/icons/program_wait-0.png" />
            Run...
          </div>
          <hr />
          <div class="menu__item">
            <img src="./../assets/icons/turn_off_computer_display_only-0.png" />
            Shut down...
          </div>
        </div>
      </div>
      <div class="taskbar__windows">
        <button
          v-for="taskbarWindow in windows"
          :key="taskbarWindow.id"
          class="taskbar__window"
          :class="{ active: activeWindow == taskbarWindow }"
          :style="'width: ' + taskbarWindowWidth"
          @click="
            $emit(
              !taskbarWindow.minimized && taskbarWindow.active
                ? 'minimize-window'
                : 'activate-window',
              { id: taskbarWindow.id }
            )
          "
        >
          <img :src="iconPath(taskbarWindow)" />
          {{ taskbarWindow.title }}
        </button>
      </div>
      <Tray />
    </div>
  </div>
</template>

<script>
import Run from "./apps/Run.vue";
import Tray from "./taskbar/Tray.vue";

export default {
  name: "Taskbar",
  props: {
    windows: { type: Array, required: true },
    apps: { type: Array, required: true },
    activeWindow: { type: Object, default: () => null },
    menuOpen: { type: Boolean, required: true }
  },
  components: {
    Tray
  },
  computed: {
    runApp() {
      return Run;
    },
    taskbarWindowWidth() {
      return this.windows.length < 8 ? "150px" : (70/this.windows.length) + "%";
    }
  },
  methods: {
    iconPath(taskbarWindow) {
      if (!taskbarWindow.app.icon) return null;
      return require("../assets/icons/" + taskbarWindow.app.icon + ".png");
    },
    openMenu() {
      this.$emit("openMenu");
    },
    closeMenu() {
      this.$emit("closeMenu");
    },
    toggleMenu() {
      this.menuOpen ? this.closeMenu() : this.openMenu();
    }
  }
};
</script>

<style scoped lang="scss">
.active {
  font-weight: 700;
  box-shadow: inset -1px -1px #ffffff, inset 1px 1px #0a0a0a,
    inset -2px -2px #dfdfdf, inset 2px 2px #808080;
}

.taskbar {
  z-index: 10000;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 30px;
  background: silver;
  width: 100%;
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey,
    inset 2px 2px #dfdfdf;

  .start-button {
    font-weight: 700;
    letter-spacing: 0;
    min-width: 0;
    padding: 0 3px;
    margin: 4px 3px 0px 2px;

    span {
      display: inline-block;
      margin-top: 3px;
    }

    img {
      width: 16px;
      height: 14px;
      vertical-align: middle;
      margin-top: -4px;
      margin-left: 2px;
    }
  }

  .taskbar__inner {
    display: flex;
    position: relative;

    .taskbar__window {
      text-align: left;
      padding: 0 3px 0 5px;
      margin: 4px 2px 0px 2px;

      img {
        height: 16px;
        vertical-align: bottom;
        margin-top: -1px;
        margin-left: 2px;
      }
    }

    .menu {
      padding-left: 24px;
      background: grey;

      .menu__graphic {
        position: absolute;
        bottom: 0;
        left: 3px;

        img {
          width: 23px;
        }
      }
    }

    .menu__item {
      min-width: 200px;

      img {
        width: 32px;
        margin-right: 2px;
      }
    }
  }
}
</style>
