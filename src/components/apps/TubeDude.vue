<template>
  <div class="tube-dude">
    <div v-if="!dead" class="tube-dude__score">Score: {{ score }}</div>
    <div v-else class="tube-dude__death-screen">
      <h1>You're dead!</h1>
      <p>Final score: {{ score }}</p>
      <button @click="restartGame">Restart Game</button>
    </div>
    <canvas
      ref="canvas"
      id="tubeDudeCanvas"
      width="500"
      height="500"
      style="background-color: black"
    ></canvas>
  </div>
</template>

<script>
export default {
  name: "TubeDude",
  title: "Tube Dude",
  icon: "tube_dude",
  defaultWidth: 514,
  defaultHeight: 532,
  data() {
    return {
      score: 0,
      dead: false
    };
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext("2d");
    this.tube = new Image();
    this.tube.src = require("../../assets/icons/tube.png");
    this.tube_food = new Image();
    this.tube_food.src = require("../../assets/icons/tube_food.png");
    this.tube_food.onload = () => {
      this.initGame();
    };
  },
  destroyed() {
    this.teardownGame();
  },
  methods: {
    initGame() {
      this.segments = [
        [100, 200],
        [100, 210]
      ];
      this.spawnFood();

      this.direction = 0;

      this.gameInterval = setInterval(() => {
        this.moveSegments();
        this.drawSegments();
        this.drawFood();
      }, 50);

      document.addEventListener("keydown", this.handleKeyDown);
    },
    teardownGame() {
      clearInterval(this.gameInterval);
      document.removeEventListener("keypress", this.handleKeyDown);
      this.segments = [];
      this.food = [10000, 10000];
    },
    handleKeyDown(event) {
      switch (event.keyCode) {
        case 38:
          if (this.direction == 1) break;
          this.direction = 0;
          break;
        case 40:
          if (this.direction == 0) break;
          this.direction = 1;
          break;
        case 37:
          if (this.direction == 3) break;
          this.direction = 2;
          break;
        case 39:
          if (this.direction == 2) break;
          this.direction = 3;
          break;
      }
    },
    moveSegments() {
      if (this.checkCollision()) return;

      const headSegment = this.segments[0];

      switch (this.direction) {
        case 0:
          this.segments.unshift([headSegment[0], headSegment[1] - 10]);
          break;
        case 1:
          this.segments.unshift([headSegment[0], headSegment[1] + 10]);
          break;
        case 2:
          this.segments.unshift([headSegment[0] - 10, headSegment[1]]);
          break;
        case 3:
          this.segments.unshift([headSegment[0] + 10, headSegment[1]]);
          break;
      }

      if (headSegment[0] == this.food[0] && headSegment[1] == this.food[1]) {
        this.spawnFood();
        this.score = this.score + 1;
      } else {
        this.segments.splice(-1, 1);
      }
    },
    checkCollision() {
      const headSegment = this.segments[0];
      let colidedWithSelf = false;

      for (let i = 1; i < this.segments.length; i++) {
        if (
          this.segments[i][0] == headSegment[0] &&
          this.segments[i][1] == headSegment[1]
        )
          colidedWithSelf = true;
      }

      if (
        colidedWithSelf ||
        headSegment[0] < 0 ||
        headSegment[0] > 490 ||
        headSegment[1] < 0 ||
        headSegment[1] > 490
      ) {
        this.die();
        return true;
      }
      return false;
    },
    die() {
      this.dead = true;
      clearInterval(this.gameInterval);
    },
    restartGame() {
      this.dead = false;
      this.score = 0;
      setTimeout(this.initGame, 500);
    },
    drawSegments() {
      this.ctx.clearRect(0, 0, 500, 500);
      this.segments.forEach(segment => {
        this.ctx.drawImage(this.tube, segment[0], segment[1], 10, 10);
      });
    },
    drawFood() {
      this.ctx.drawImage(this.tube_food, this.food[0], this.food[1], 10, 10);
    },
    spawnFood() {
      this.food = [
        Math.floor(Math.random() * 50) * 10,
        Math.floor(Math.random() * 50) * 10
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
.tube-dude {
  position: relative;
}

.tube-dude__death-screen {
  position: absolute;
  top: 50px;
  left: 50px;
  width: 395px;
  height: 150px;
  text-align: center;
  border: 2px solid #fff;
  background: #000;
  text-align: center;
  color: #fff;
  padding: 20px;

  h1 {
    font-size: 20px;
    margin: 0;
  }

  p {
    font-size: 16px;
  }
}

.tube-dude__score {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 2;
  font-weight: bold;
  font-size: 13px;
  color: #fff;
}
</style>
