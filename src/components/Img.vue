<template>
  <img
    :src="src"
    :alt="alt"
    loading="lazy"
  />
</template>

<script>
export default {
  name: "Img",
  props: {
    src: { default: "storage/img/musical-note.png" },
    alt: { default: "Avatar" },
  },
};
</script>
