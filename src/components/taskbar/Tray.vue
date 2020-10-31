<template>
  <div class="taskbar__tray">{{ hour }}:{{ minute }}</div>
</template>

<script>
export default {
  data() {
    return {
      hour: "00",
      minute: "00"
    };
  },
  created() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
  },
  methods: {
    updateTime() {
      const time = new Date();
      this.hour = time.getHours().toString();
      this.minute = ("00" + time.getMinutes()).slice(-2); // pad minutes
    }
  }
};
</script>

<style lang="scss" scoped>
.taskbar__tray {
  position: absolute;
  right: 4px;
  top: 3px;
  width: 50px;
  text-align: center;
  height: 24px;
  line-height: 24px;
  padding: 0 5px;
  box-shadow: inset -1px -1px #ffffff, inset 1px 1px grey,
    inset -2px -2px #dfdfdf;
}
</style>
