<template>
  <div class="row">
    <div class="col-sm-4"></div>
    <div class="col-sm-4">
      <div class="contact-form">
        <div class="d-flex justify-content-between">
          <!-- {/* Close Icon */} -->
          <div class="">
            <router-link to="/">
              <Button class="mysonar-btn float-right" text="back" />
              <!-- <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-x"
                view-box="0 0 16 16"
              >
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg> -->
            </router-link>
          </div>
          <div class="">
            <Img
              :src="auth.pp"
              style="width: 40px; height: 40px"
              alt="avatar"
            />
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
            placeholder="Say something"
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

import Img from "../components/Img";
import Button from "../components/Button";

export default {
  name: "PostCreate",
  components: {
    Img,
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
        id: Math.floor(Math.random() * 1000),
        name: this.auth.name,
        text: this.text,
        username: this.auth.username,
        hasFollowed: false,
        hasLiked: false,
        likes: 0,
        comments: 0,
        inserted_at: "2020-05-09 08:26:00",
        updated_at: "2020-05-09 08:26:00",
      };

      axios
        .post(`http://localhost:8081/posts`, this.formData)
        .then((res) => {
          // setMessage(res.data)
          console.log(res.data);
          this.text = "";
          this.$emit("setPosts", [...this.posts, this.formData]);
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
};
</script>
