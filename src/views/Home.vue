<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<TopNav msg="Welcome to Your Vue.js App" />
		<button @click="getList()">click</button>
	</div>
</template>

<script>
// @ is an alias to /src
import TopNav from "@/components/TopNav.vue";
import axios from "axios";

export default {
	name: "Home",
	components: {
		TopNav,
	},
	methods: {
		getList() {
			axios
				.get("http://localhost:3000/api/users")
				.then((res) => console.log(res.data + " Works"))
				.catch((err) => console.log(err + " Doesn't work"));
		},
	},
};
</script>
