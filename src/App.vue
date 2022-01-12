<template>
	<TopNav :auth="auth" />
	<router-view />
</template>

<script>
import axios from "axios"

import TopNav from "@/components/TopNav.vue";

export default {
	name: "App",
	components: {
		TopNav,
	},
	data() {
		return {
			login: "",
			url: window.location.href.match(/https/)
				? "https://music.black.co.ke"
				: "http://localhost:3000",
			auth: {
				name: "Guest",
				username: "@guest",
				pp: "/storage/profile-pics/male_avatar.png",
				account_type: "normal",
			},
			message: "",
			errors: [],
		};
	},
	methods: {
		// Fetch everything on page creation
		created() {
		// Fetch Auth
			axios
				.get("http://localhost:3000/api/users")
				.then((res) => console.log(res.data))
				.catch(() => this.setErrors(["failed to fetch Auth"]));
		},

		setLogin(value) { this.login = value },
		setUrl(value) { this.url = value },
		setAuth(value) { this.auth = value;},
		setMessage(value) { this.message = value},
		setErrors(value) { this.errors = value},
	},
};
</script>
