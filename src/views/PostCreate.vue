<template>
  <div class="row">
    <div class="col-sm-4"></div>
    <div class="col-sm-4">
      <div class="contact-form">
        <div class="d-flex justify-content-between">
          <!-- {/* Close Icon */} -->
          <div class="">
            <router-link to="/">
              <svg xmlns="http://www.w3.org/2000/svg"
                   width="20"
                   height="20"
                   fill="currentColor"
                   class="bi bi-x"
                   view-box="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </router-link>
          </div>
        </div>
        <br />

        <!-- {/* Social Input */} -->
        <form class="contact-form bg-white"
              auto-complete="off">
          <div class="d-flex pt-2 border-bottom border-dark"
               style="background-color: #232323">
            <!-- {/* Profile pic */} -->
            <div class='p-2'>
              <Img :src="auth.pp"
                   class="rounded-circle"
                   width="25px"
                   height="25px"
                   alt="Avatar" />
            </div>
            <!-- {/* Input */} -->
            <div style="flex-grow: 1">
              <textarea name='post-text'
                     class='form-control m-0'
                     style="
							border: none;
							outline: none;
							resize: none;
						"
                     placeholder="What's on your mind?"
                     v-model="text">
			  </textarea>
              <!-- </input> -->
            </div>
            <!-- {/* Button */} -->
            <div class="p-1">
              <button type="submit"
                      class="mysonar-btn-round pr-1 pt-1"
                      style="
						border-radius: 50%;
						min-width: 33px;
					"
                      @click="onSubmit">
                <svg style='transform: rotate(45deg)'
                     xmlns='http://www.w3.org/2000/svg'
                     width='16'
                     height='16'
                     fill='currentColor'
                     class='bi bi-send-fill'
                     view-box='0 0 16 16'>
                  <path d='M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z' />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="col-sm-4"></div>
  </div>
</template>

<script>
import axios from "axios";

import Img from "../components/Img";

export default {
  name: "PostCreate",
  components: {
    Img,
  },
  props: ["url", "auth", "message", "errors", "posts"],
  emits: ["setState"],
  data() {
    return {
      text: "",
      formData: {},
    };
  },
  methods: {
    log() {
      console.log(this.text);
    },
    // Handle form submit for Social Input
    onSubmit(e) {
      e.preventDefault();

      this.formData = {
        text: this.text,
        username: this.auth.username,
      };

      axios
        .post(`http://localhost:4000/api/posts`, {
          post: this.formData,
        })
        .then((res) => {
          console.log(res.data);
          //   Update posts
          axios.get("http://localhost:4000/api/posts").then((res) => {
            this.$emit("setState", "posts", res.data.data);
            // Clear text field
            this.text = "";
            // Redirect to home
            this.$router.push("/");
          });
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
