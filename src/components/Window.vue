<template>
  <div
    class="window"
    :style="layoutStyle"
    @mousedown="$emit('click-window', { id: id })"
  >
    <div class="title-bar" :class="{ inactive: !active }" @mousedown="grab">
      <div class="title-bar-text">
        <img v-if="icon" :src="iconPath" />
        {{ title }}
      </div>

      <div class="title-bar-controls">
        <button aria-label="Minimize" @click="minimize"></button>
        <button
          v-if="maximized"
          aria-label="Restore"
          @click="maximize"
        ></button>
        <button v-else aria-label="Maximize" @click="maximize"></button>
        <button aria-label="Close" @click="close"></button>
      </div>
    </div>
    <div class="window-body">
      <component v-if="app" :is="app" @close="close" />
      <slot v-else></slot>
    </div>
  </div>
</template>

<script>
import Draggable from "../mixins/Draggable.js";

export default {
  name: "Window",
  props: {
    title: { type: String, required: true },
    icon: { type: String, default: () => null },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    id: { type: Number, required: true },
    active: { type: Boolean, required: true },
    maximized: { type: Boolean, required: true },
    minimized: { type: Boolean, required: true },
    app: { type: Object, default: () => null }
  },
  mixins: [Draggable],
  computed: {
    iconPath() {
      return require("../assets/icons/" + this.icon + ".png");
    },
    layoutStyle() {
      if (this.minimized) return "display: none";

      let style = `left: ${this.maximized ? 0 : this.x}px; top: ${
        this.maximized ? 0 : this.y
      }px; z-index: ${this.active ? 1000 : 10};`;
      style += this.maximized
        ? "width: 100%; height: 100%"
        : `width: ${this.width}px; height: ${this.height}px;`;
      return style;
    }
  },
  methods: {
    minimize() {
      this.$emit("minimize", { id: this.id });
    },
    maximize() {
      this.$emit("maximize", { id: this.id });
    },
    close() {
      this.$emit("close", { id: this.id });
    }
  }
};
</script>

<style scoped lang="scss">
.window {
  position: absolute;
}

.title-bar-text img {
  height: 16px;
  vertical-align: middle;
  margin-top: -1px;
  margin-left: 2px;
}

.window-body {
  margin: 4px;
}
</style>
