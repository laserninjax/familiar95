<template>
  <div>
    <iframe
      src="https://mina.zlender.si/"
      width="200%"
      height="900px"
      style="border-color: #8e8e8e; transform: scale(0.5) translate(-485px, -430px);"
      title="Minesweeper"
    ></iframe>
    <div style="text-align: right;position: absolute; bottom: 5px;right: 5px;">
      created by <a href="https://github.com/szlend/mina2" target="_blank">szlend</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mina",
  title: "Mina",
  icon: "minesweeper",
  defaultWidth: 500,
  defaultHeight: 510
};
</script>
