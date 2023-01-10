<template>
  <button class="v-button">{{ propValue }}</button>
</template>

<script lang="ts">
export default {
  props: {
    propValue: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
.v-button {
  display: inline-block;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  width: 100px;
  height: 34px;
  font-size: 14px;

  &:active {
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: 0;
  }

  &:hover {
    background-color: #ecf5ff;
    color: #3a8ee6;
  }
}
</style>
