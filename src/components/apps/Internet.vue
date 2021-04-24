<template>
  <div class="connecting">
    <img v-if="!connected" src="../../assets/images/dial-up.gif" />
    <img v-else src="../../assets/icons/connections_on_earth-0.png" />
    <div class="connecting__status">
      <p>Status: {{ status }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Internet",
  title: "Connect to Internet",
  icon: "dial_up_0",
  defaultWidth: 400,
  defaultHeight: 100,
  data() {
    return {
      connected: false,
      sound: null,
      status: null
    }
  },
  created() {
    this.statuses = [
      "Establishing connection...",
      "Verifying your identity...",
      "We have verified this is you...",
      "Checking if someone is listening...",
      "Encrypting connection...",
      "You are now connected to the internet."
    ]

    this.status = this.statuses[0];

    this.sound = new Audio(require("../../assets/sounds/dial-up.mp3"));
    this.sound.play();

    setTimeout(() => this.connected = true, 15000)

    for(let i=1; i < this.statuses.length; i++) {
      setTimeout(() => { this.status = this.statuses[i] }, i * 2000)
    }
  },
  beforeUnmount() {
    this.sound.stop();
  }
};
</script>

<style lang="scss" scoped>
  .connecting {
    height: 66px;
    display: flex;
    align-items: center;

    img {
      margin: 0 32px 0 16px;
    }
  }
</style>
