<template>
  <div
    class="window"
    :style="layoutStyle"
    @mousedown="$emit('clickWindow', { id: windowId })"
  >
    <div class="title-bar" @mousedown="grabWindow">
      <div class="title-bar-text">{{ title }}</div>

      <div class="title-bar-controls">
        <button aria-label="Minimize" @click="minimize"></button>
        <button aria-label="Maximize" @click="maximize"></button>
        <button aria-label="Close" @click="close"></button>
      </div>
    </div>
    <div class="window-body">
      <pre>
        {{ x }}
        {{ y }}
        {{ maximized }}
      </pre>
      <section class="field-row" style="justify-content: flex-end">
        <button>OK</button>
        <button>Cancel</button>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Window",
  props: {
    title: { type: String, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    windowId: { type: Number, required: true },
    top: { type: Boolean, required: true },
    maximized: { type: Boolean, required: true }
  },
  data() {
    return {
      grabbed: false,
      grabX: null,
      grabY: null,
      startX: null,
      startY: null
    };
  },
  computed: {
    layoutStyle() {
      let style = `left: ${this.maximized ? 0 : this.x}px; top: ${
        this.maximized ? 0 : this.y
      }px; z-index: ${this.top ? 1000 : 10};`;
      style += this.maximized
        ? "width: 100%; height: 100%"
        : `width: ${this.width}px; height: ${this.height}px;`;
      return style;
    }
  },
  methods: {
    minimize() {
      this.$emit("minimize", { id: this.windowId });
    },
    maximize() {
      this.$emit("maximize", { id: this.windowId });
    },
    close() {
      this.$emit("close", { id: this.windowId });
    },
    grabWindow(e) {
      this.grabbed = true;
      this.grabX = e.clientX;
      this.grabY = e.clientY;
      this.startX = this.x;
      this.startY = this.y;

      document.addEventListener("mousemove", this.moveWindow);

      document.addEventListener("mouseup", () => {
        this.grabbed = false;
        document.removeEventListener("mousemove", this.moveWindow);
      });
    },
    moveWindow(e) {
      if (!this.grabbed) return;

      this.$emit("move", {
        id: this.windowId,
        x: Math.round(this.startX + (e.clientX - this.grabX)),
        y: Math.round(this.startY + (e.clientY - this.grabY))
      });
    }
  }
};
</script>

<style scoped lang="scss">
.window {
  position: absolute;
}
</style>
