<template>
  <div style="text-align: center">
    <img src="../../assets/icons/plush_bear.png" style="width: 64px; margin-top: 20px" />
    <p>There is nowhere to run.</p>
    <div>
      <button @click="$emit('close')">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Run",
  icon: "program_wait-0",
  defaultWidth: 400,
  defaultHeight: 200
};
</script>
