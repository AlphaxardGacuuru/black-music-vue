<template>
	<img
		:src="src"
		:width="width"
		:height="height"
		:class="imgClass"
		:style="style"
		:alt="alt"
		loading="lazy"
	/>
</template>

<script>
export default {
	name: "Img",
	props: {
		src: {
			type: String,
			default: "img/img/musical-note.png",
		},
		width: String,
		height: String,
		imgClass: String,
		style: Object,
		alt: {
			type: String,
			default: "Avatar",
		},
	},
};
</script>
