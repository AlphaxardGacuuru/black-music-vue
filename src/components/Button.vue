<template>
  <button :style="btnStyle" :class="btnClass">{{ text }}</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: {
      type: String,
      default: "button",
    },
    btnStyle: {
      default: "",
    },
    btnClass: {
      type: String,
      default: "sonar-btn",
    },
  },
};
</script>
