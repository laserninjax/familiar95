export default {
  props: {
    x: { type: Number, required: true},
    y: { type: Number, required: true}
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
  methods: {
    grab(e) {
      this.grabbed = true;
      this.grabX = e.clientX;
      this.grabY = e.clientY;
      this.startX = this.x;
      this.startY = this.y;

      document.addEventListener("mousemove", this.move);

      document.addEventListener("mouseup", () => {
        this.grabbed = false;
        document.removeEventListener("mousemove", this.move);
      });
    },
    move(e) {
      if (!this.grabbed) return;

      this.$emit("move", {
        component: this,
        x: Math.round(this.startX + (e.clientX - this.grabX)),
        y: Math.round(this.startY + (e.clientY - this.grabY))
      });
    }
  }
};
