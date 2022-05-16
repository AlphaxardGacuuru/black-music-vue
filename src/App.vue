<template>
  <TopNav
    :url="url"
    :auth="auth"
    :message="message"
    :errors="errors"
    :posts="posts"
    :postComments="postComments"
    :users="users"
  />
  <router-view
    :url="url"
    :auth="auth"
    :message="message"
    :errors="errors"
    :posts="posts"
    :postComments="postComments"
    :users="users"
    @setState="setState"
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
      url: "http://localhost:4000",
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
    //   Function to change state
    setState(state, value) {
      if (state == "auth") {
        this.auth = value;
      } else if(state == "posts") {
        this.posts = value;
      } else if(state == "users") {
		  this.users = value
	  }
    },

    // Function for following users
    onFollow(musician) {
      axios
        .post("http://localhost:8081/users", { username: musician })
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
      .then((res) => this.setState("auth", res.data[0]))
      .catch(() => this.setState("errors", ["failed to fetch Auth"]));

    // Fetch Posts
    axios
      .get("http://localhost:4000/api/posts")
      .then((res) => this.setState("posts", res.data.data))
      .catch(() => this.setState("errors", ["failed to fetch Posts"]));

    // // Fetch Posts Comments
    // axios
    //   .get("http://localhost:4000/post-comments")
    //   .then((res) => this.setPostComments(res.data))
    //   .catch(() => this.setErrors(["failed to fetch Post Comments"]));

    // Fetch Users
    // axios
    //   .get("http://localhost:8081/api/users")
    //   .then((res) => this.setState("users", res.data))
    //   .catch(() => this.setState("errors", ["failed to fetch Users"]));
  },
};
</script>

<style>
/* @import'~bootstrap/dist/css/bootstrap.css'; */
</style>