<template>
  <div
    class="window"
    :style="
      'top: ' +
        y +
        'px; left: ' +
        x +
        'px; width: ' +
        width +
        'px; height: ' +
        height +
        'px'
    "
  >
    <div class="title-bar">
      <div class="title-bar-text">
        {{ title }}
      </div>

      <div class="title-bar-controls">
        <button aria-label="Minimize" @click="minimize"></button>
        <button aria-label="Maximize" @click="maximize"></button>
        <button aria-label="Close" @click="close"></button>
      </div>
    </div>
    <div class="window-body">
      <p>Hello, world!</p>
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
    windowId: { type: Number, required: true }
  },
  methods: {
    minimize() {
      this.$emit("minimize", this.windowId);
    },
    maximize() {
      this.$emit("maximize", this.windowId);
    },
    close() {
      this.$emit("close", this.windowId);
    }
  }
};
</script>

<style scoped lang="scss"></style>
