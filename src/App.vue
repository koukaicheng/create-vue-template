<template>
  <div class="wrap"></div>
  <el-button>asdasd</el-button>
  <el-input v-model="inputVal" />
</template>
<script setup>
const inputVal = ref('');
</script>
<style lang="scss">
@import './assets/ss.css';
.wrap {
  position: absolute;
  width: 500px;
}
</style>
