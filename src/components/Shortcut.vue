<template>
  <div
    class="shortcut"
    @mousedown="grab"
    @click="click"
    :class="{ selected: selected }"
    :style="`top: ${y}px; left: ${x}px;`"
  >
    <img v-if="app.icon" :src="iconPath" />
    <span>{{ app.title }}</span>
  </div>
</template>

<script>
import Draggable from "../mixins/Draggable.js";
export default {
  name: "Shortcut",
  props: {
    app: { type: Object, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    selected: { Boolean, required: true }
  },
  mixins: [Draggable],
  computed: {
    iconPath() {
      if (!this.app.icon) return null;
      return require("../assets/icons/" + this.app.icon + ".png");
    }
  },
  methods: {
    click() {
      this.select();
      if (this.singleClicked) {
        this.$emit("open", this.app);
      }

      this.singleClicked = true;
      setTimeout(() => {
        this.singleClicked = false;
      }, 300);
    },
    select() {
      this.$emit("select", this.app);
    }
  }
};
</script>

<style scoped lang="scss">
.shortcut {
  position: absolute;
  text-align: center;
  z-index: 2;
  width: 96px;
  img {
    display: block;
    margin: 0 auto;
    height: 32px;
    pointer-events: none;
  }

  span {
    padding: 1px;
    color: #fff;
    display: inline-block;
    margin-top: 1px;
  }

  &.selected {
    span {
      background: darkblue;
      border: 1px dotted #fff;
      padding: 0;
      border-radius: 1px;
    }

    img {
      filter: sepia(100%) hue-rotate(190deg) saturate(500%);
    }
  }
}
</style>
