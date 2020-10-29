<template>
  <div
    class="notification-window window"
    :style="`top: ${y}px; left: ${x}px; width: 400px;`"
  >
    <div class="title-bar" @mousedown="grab">
      <div class="title-bar-text">{{ title }}</div>
      <div class="title-bar-controls">
        <button aria-label="Close" @click="close"></button>
      </div>
    </div>
    <div class="window-body">
      <div class="notification">
        <div class="notification-icon">
          <img v-if="type == 'info'" src="./../../assets/icons/info.png" />
          <img
            v-if="type == 'warning'"
            src="./../../assets/icons/warning_0.png"
          />
          <img v-if="type == 'error'" src="./../../assets/icons/error.png" />
        </div>
        <div class="notification-body">
          <slot></slot>
        </div>
      </div>
      <div class="notification-button">
        <button @click="close">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from "../../mixins/Draggable.js";

export default {
  name: "Notification",
  props: {
    title: { type: String, reqired: true },
    type: { type: String, required: true },
    id: { type: Number, required: true },
    buttonText: { type: String, default: () => "OK" }
  },
  mixins: [Draggable],
  methods: {
    close() {
      this.$emit("close", { id: this.id });
    }
  }
};
</script>

<style scoped lang="scss">
.notification-window {
  z-index: 10000;
  position: absolute;
}

.notification {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.notification-body {
  width: 342px;
}

.notification-button button {
  display: block;
  margin: 0 auto;
}
</style>
