<template>
  <div class="wrap"></div>
  <el-button>asdasd</el-button>
  <el-input v-model="inputVal" />
</template>
<script setup>
const inputVal = ref('');
</script>
<style lang="scss">
.wrap {
  position: absolute;
  width: 500px;
}
</style>
