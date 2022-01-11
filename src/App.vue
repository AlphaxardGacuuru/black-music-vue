<template>
	<div id="nav">
		<router-link to="/">Home</router-link> |
		<router-link to="/about">About</router-link>
	</div>
	<router-view />
</template>

<script>
// import TopNav from "TopNav"

export default {
	name: "App",
	components: {
		// TopNav
	}
}
</script>