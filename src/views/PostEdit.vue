<template>
  <div class="row">
    <div class="col-sm-4"></div>
    <div class="col-sm-4">
      <div class="contact-form">
        <div class="d-flex justify-content-between m-0">
          <!-- {/* Close Icon */} -->
          <div class="">
            <router-link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x"
                view-box="0 0 16 16"
              >
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </router-link>
          </div>
          <div class="">
            <Button
              class="mysonar-btn float-right"
              text="post"
              @click="onSubmit"
            />
          </div>
        </div>
        <br />

        <!-- {/* Social Input */} -->
        <form class="contact-form bg-white" auto-complete="off">
          <textarea
            name="post-text"
            class="form-control m-0 p-2"
            style="resize: none"
            row="1"
            col="500"
            v-model="text"
          >
          </textarea>
        </form>
      </div>
    </div>
    <div class="col-sm-4"></div>
  </div>
</template>

<script>
import axios from "axios";

import Button from "../components/Button";

export default {
  name: "PostEdit",
  components: {
    Button,
  },
  props: ["url", "auth", "message", "errors", "posts"],
  emits: ["set-auth", "setErrors", "set-message", "setPosts"],
  data() {
    return {
      text: "",
      formData: {},
    };
  },
  methods: {
    // Handle form submit for Social Input
    onSubmit(e) {
      e.preventDefault();

      this.formData = {
        text: this.text,
        username: this.auth.username,
      };

      axios
        .patch(`${this.url}/api/posts/${this.$route.params.id}`, {
          post: this.formData,
        })
        .then((res) => {
			console.log(res.data)
          //   Update posts
          axios
            .get(`${this.url}/api/posts`)
            .then((res) => this.$emit("setPosts", res.data.data));
			this.$router.push("/")
        })
        .catch((err) => {
          const resErrors = err.response.data.errors;
          console.log(err.response);

          var resError;
          var newError = [];
          for (resError in resErrors) {
            newError.push(resErrors[resError]);
          }
          // Show error message
          // newError.push(err.response.data.message)
          // setErrors(newError)
        });
    },
  },
  computed: {
    postToEdit() {
      return this.posts.find((post) => (post.id = this.$route.params.id));
    },
  },
  mounted() {
    setTimeout(() => {
      this.text = this.postToEdit.text;
    }, 500);
  },
};
</script>
