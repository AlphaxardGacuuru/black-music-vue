<template>
	<TopNav
		:url="url"
		:auth="auth"
		@setAuth="setAuth"
		:message="message"
		@setMessage="setMessage"
		:errors="errors"
		@set-errors="setErrors"
		:audioAlbums="audioAlbums"
		@set-audioAlbums="setAudioAlbums"
		:audioComments="audioComments"
		@set-audioComments="setAudioComments"
		:audioPayouts="audioPayouts"
		@set-audioPayouts="setAudioPayouts"
		:audios="audios"
		@set-audios="setAudios"
		:boughtAudios="boughtAudios"
		@set-boughtAudios="setBoughtAudios"
		:cartAudios="cartAudios"
		@set-cartAudios="setCartAudios"
		:kopokopoRecipients="kopokopoRecipients"
		@set-kopokopoRecipients="setKopokopoRecipients"
		:notifications="notifications"
		@set-notifications="setNotifications"
		:posts="posts"
		@set-posts="setPosts"
		:postComments="postComments"
		@set-postComments="setPostComments"
		:users="users"
	/>
	<router-view />
</template>

<script>
import axios from "axios";

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
				pp: "img/profile-pics/male_avatar.png",
				account_type: "normal",
			},
			message: "",
			errors: [],

			audioAlbums: [],
			audioComments: [],
			audioPayouts: [],
			audios: [],

			boughtAudios: [],
			cartAudios: [],
			kopokopoRecipients: [],
			notifications: [],
			posts: [],
			postComments: [],
			users: [],
		};
	},
	methods: {
		setLogin(value) {
			this.login = value;
		},
		setUrl(value) {
			this.url = value;
		},
		setAuth(value) {
			this.auth = value;
		},
		setMessage(value) {
			this.message = value;
		},
		setErrors(value) {
			this.errors = value;
		},
		setAudioAlbums(value) {
			this.audioAlbums = value;
		},
		setAudioComments(value) {
			this.audioComments = value;
		},
		setAudioPayouts(value) {
			this.audioPayouts = value;
		},
		setAudios(value) {
			this.audios = value;
		},
		setBoughtAudios(value) {
			this.boughtAudios = value;
		},
		setCartAudios(value) {
			this.cartAudios = value;
		},
		setKopokopoRecipients(value) {
			this.kopokopoRecipients = value;
		},
		setNotifications(value) {
			this.notifications = value;
		},
		setPosts(value) {
			this.posts = value;
		},
		setPostComments(value) {
			this.postComments = value;
		},
		setUsers(value) {
			this.users = value;
		},
	},

	// Fetch everything on page creation
	created() {
		// Fetch Auth
		// axios
		// 	.get("http://localhost:3000/api/home")
		// 	.then((res) => this.(res.data))
		// 	.catch(() => this.setErrors(["failed to fetch Auth"]));

		// Fetch Audio Albums
		axios
			.get("http://localhost:3000/api/audio-albums")
			.then((res) => this.setAudioAlbums(res.data))
			.catch(() => this.setErrors(["failed to fetch Audio Albums"]));
	},
};
</script>
