<template>
  <div class="recycle-bin">
    <div
      class="recycle-bin__bin"
      :class="{ full: full }"
      @click="emptyBin"
    ></div>
    <p>Click on the bin to empty it.</p>
  </div>
</template>

<script>
export default {
  name: "RecycleBin",
  title: "Recycle Bin",
  icon: "recycle_bin_with_paper-0",
  defaultWidth: 400,
  defaultHeight: 300,
  data() {
    return {
      full: true
    };
  },
  methods: {
    emptyBin() {
      if (!this.full) return;

      this.full = false;
      this.$emit("create-notification", {
        type: "info",
        title: "Good job!",
        content: "Keep doing that, over and over, forever."
      });

      setTimeout(() => {
        this.full = true;
      }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
.recycle-bin {
  position: relative;
  text-align: center;
}

.recycle-bin__bin {
  display: block;
  margin: 64px auto 0 auto;
  width: 128px;
  height: 128px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 128px;
  background-image: url("../../assets/icons/empty_recycle_bin-0.png");

  &.full {
    cursor: pointer;
    background-image: url("../../assets/icons/recycle_bin_with_paper-0.png");
  }
}

.recycle-bin__file {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
