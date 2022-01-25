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
  <router-view
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
    @onFollow="onFollow"
  ></router-view>
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
      url: "http://localhost:8081",
      auth: {
        name: "Guest",
        username: "@guest",
        pp: "storage/profile-pics/male_avatar.png",
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

    // Function for following users
    onFollow(musician) {
      console.log(musician);
      axios
        .post('http://localhost:8081/users', { username: musician })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.response.data));

      // axios.get('/sanctum/csrf-cookie').then(() => {
      // 	axios.post(`${this.url}/follows`, {
      // 		musician: musician
      // 	}).then((res) => {
      // 		this.setMessage(res.data)
      // 		// Update users
      // 		axios.get(`${this.url}/users`)
      // 			.then((res) => this.setUsers(res.data))
      // 		// Update posts
      // 		axios.get(`${this.url}/posts`)
      // 			.then((res) => this.setPosts(res.data))
      // 	}).catch((err) => {
      // 		const resErrors = err.response.data.errors
      // 		var resError
      // 		var newError = []
      // 		for (resError in resErrors) {
      // 			newError.push(resErrors[resError])
      // 		}
      // 		// Get other errors
      // 		newError.push(err.response.data.message)
      // 		this.setErrors(newError)
      // 	})
      // });
    },
  },

  // Fetch everything on page creation
  created() {
    // Fetch Auth
    axios
      .get("http://localhost:8081/home")
      .then((res) => this.setAuth(res.data[0]))
      .catch(() => this.setErrors(["failed to fetch Auth"]));

    // Fetch Posts
    axios
      .get("http://localhost:8081/posts")
      .then((res) => this.setPosts(res.data))
      .catch(() => this.setErrors(["failed to fetch Posts"]));

    // Fetch Posts Comments
    axios
      .get("http://localhost:8081/post-comments")
      .then((res) => this.setPostComments(res.data))
      .catch(() => this.setErrors(["failed to fetch Post Comments"]));

    // Fetch Users
    axios
      .get("http://localhost:8081/users")
      .then((res) => this.setUsers(res.data))
      .catch(() => this.setErrors(["failed to fetch Users"]));
  },
};
</script>
