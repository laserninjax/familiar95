<template>
  <div class="intro-window">
    <div class="intro-window__inner">
      <p>Welcome back to</p>
      <img src="../../assets/images/1997.png" />
      <h1>
        Windows <span>97</span>
      </h1>
      <p>Press any key to continue...</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.intro-window {
  width: 480px;
  text-align: center;
  margin: 48px auto 0 auto;
  background: silver;
  padding: 8px;
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey,
  inset 2px 2px #dfdfdf;
}

.intro-window__inner {
  height: 100%;
  border: 1px solid grey;
  padding: 8px;

  img {
    display: block;
    width: 40%;
    margin: 0 auto;
  }
}

h1 {
  font-size: 48px;
  letter-spacing: -5px;
  font-family: 'Arial Black', sans-serif;
  font-weight: bold;
  margin: 0 32px;
  span {
    font-family: Arial;
    font-weight: normal;
    color: #fff;
  }
}
</style>
