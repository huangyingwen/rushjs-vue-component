<script lang="ts" setup>
defineProps<{ type: String }>();
</script>
<template>
  <button class="cssc-button" :class="[type]"><slot></slot></button>
</template>
<style scoped>
.cssc-button {
  padding: 10px 20px;
  cursor: pointer;
}
.primary {
  background: #29d;
  color: #fff;
  border: 1px solid #4b90d5;
  border-radius: 2px;
}
.success {
  background: rgb(34, 221, 43);
  color: #ffffff;
  border: 1px solid #4bd589;
  border-radius: 2px;
}
.warning {
  background: rgb(221, 171, 34);
  color: #fff;
  border: 1px solid #d5b04b;
  border-radius: 2px;
}
.danger {
  background: rgb(221, 56, 34);
  color: #fff;
  border: 1px solid #d55b4b;
  border-radius: 2px;
}
</style>
