<template>
  <div class="taskbar">
    <div class="taskbar__inner">
      <button class="start-button">
        <span>
          <img src="./../assets/icons/start_icon.png" />
          Start
        </span>
      </button>
      <div class="taskbar__windows">
        <button
          v-for="taskbarWindow in windows"
          :key="taskbarWindow.windowId"
          class="taskbar__window"
          :class="{ active: activeWindow == taskbarWindow }"
          @click="
            $emit(
              !taskbarWindow.minimized && taskbarWindow.active
                ? 'minimize-window'
                : 'activate-window',
              { id: taskbarWindow.windowId }
            )
          "
        >
          <img :src="iconPath(taskbarWindow)" />
          {{ taskbarWindow.title }}
        </button>
      </div>
      <div class="taskbar__clock" @click="openFullscreen">
        4:20PM
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Taskbar",
  props: {
    windows: { type: Array, required: true },
    activeWindow: { type: Object, default: () => null }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    iconPath(taskbarWindow) {
      if (!taskbarWindow.app.icon) return null;
      return require("../assets/icons/" + taskbarWindow.app.icon + ".png");
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

<style scoped lang="scss">
.taskbar {
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
      min-width: 150px;
      text-align: left;
      padding: 0 3px 0 5px;
      margin: 4px 2px 0px 2px;

      &.active {
        font-weight: 700;
        box-shadow: inset -1px -1px #ffffff, inset 1px 1px #0a0a0a,
          inset -2px -2px #dfdfdf, inset 2px 2px #808080;
      }

      img {
        height: 16px;
        vertical-align: middle;
        margin-top: -1px;
        margin-left: 2px;
      }
    }

    .taskbar__clock {
      position: absolute;
      right: 3px;
      top: 3px;
      box-shadow: inset 0 0 1px grey;
    }
  }
}
</style>
