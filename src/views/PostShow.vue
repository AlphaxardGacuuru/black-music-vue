<template>
  <div class="row p-0">
    <div class="col-sm-4"></div>
    <div class="col-sm-4">
      <div class="mt-2 ml-2">
        <router-link to="/">
          <svg
            width="2em"
            height="2em"
            view-box="0 0 16 16"
            class="bi bi-arrow-left-short"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.854 4.646a.5.5 0 0 1 0 .708L5.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"
            />
            <path
              fill-rule="evenodd"
              d="M4.5 8a.5.5 0 0 1 .5-.5h6.5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </router-link>
      </div>
      <div class="border border-top-0 m-0 p-0">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="media p-2 border-bottom"
        >
          <div class="media-left">
            <div class="avatar-thumbnail-xs" style="borderradius: '50%'">
              <router-link to="`/home/${comment.user_id}`">
                <Img :src="comment.pp" width="40px" height="40px" />
              </router-link>
            </div>
          </div>
          <div class="media-body p-2">
            <h6
              class="media-heading m-0"
              style="
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: clip;
              "
            >
              <b>{{ comment.name }}</b>
              <small>{{ comment.username }}</small>
              <span class="ml-1" style="color: gold">
                <svg
                  class="bi bi-circle"
                  width="1em"
                  height="1em"
                  view-box="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                </svg>
              </span>
              <span class="ml-1" style="font-size: 10px">
                {{ comment.decos }}
              </span>
              <small>
                <i class="float-right mr-1">{{ comment.created_at }}</i>
              </small>
            </h6>
            <p class="mb-0">{{ comment.text }}</p>

            <!-- {/* Comment likes */} -->
            <a v-if="comment.hasLiked" href="#" style="color: #cc3300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                fill="currentColor"
                class="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg>
              <small class="ml-1">{{ comment.likes }}</small>
            </a>
            <a v-else href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                fill="currentColor"
                class="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path
                  d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                />
              </svg>
              <small class="ml-1">{{ comment.likes }}</small>
            </a>
            <small class="ml-1">{{ comment.comments }}</small>

            <!-- {/* Default dropup button */} -->
            <div class="dropup float-right">
              <a
                href="#"
                role="button"
                id="dropdownMenurouter-link"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <svg
                  class="bi bi-three-dots-vertical"
                  width="1em"
                  height="1em"
                  view-box="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                  />
                </svg>
              </a>
              <div
                class="dropdown-menu dropdown-menu-right p-0"
                style="border-radius: 0"
              >
                <a
                  v-if="comment.user_id == auth.id"
                  href="#"
                  class="dropdown-item"
                >
                  <h6>Delete comment</h6>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-4"></div>
  </div>
</template>

<script>
import Img from "../components/Img";

export default {
  name: "PostShow",
  components: {
    Img,
  },
  props: ["url", "auth", "message", "errors", "posts", "postComments", "users"],
  emits: [
    "set-auth",
    "setErrors",
    "set-message",
    "setPosts",
    "setPostComments",
    "on-follow",
  ],
  methods: {
    // Function for liking comments
    // onCommentLike(comment) {
    //   axios.get("sanctum/csrf-cookie").then(() => {
    //     axios
    //       .post(`${this.url}/api/post-comment-likes`, {
    //         comment: comment,
    //       })
    //       .then((res) => {
    //         this.setMessage(res.data);
    //         // Update Post Comments
    //         axios
    //           .get(`${this.url}/api/post-comments`)
    //           .then((res) => this.setPostComments(res.data));
    //       })
    //       .catch((err) => {
    //         const resErrors = err.response.data.errors;
    //         var resError;
    //         var newError = [];
    //         for (resError in resErrors) {
    //           newError.push(resErrors[resError]);
    //         }
    //         this.setErrors(newError);
    //       });
    //   });
    // },
    // Function for deleting comments
    // onDeleteComment(id) {
    //   axios.get("sanctum/csrf-cookie").then(() => {
    //     axios
    //       .delete(`${this.url}/api/post-comments/${id}`)
    //       .then((res) => {
    //         this.setMessage(res.data);
    //         // Update Post Comments
    //         axios
    //           .get(`${this.url}/api/post-comments`)
    //           .then((res) => this.setPostComments(res.data));
    //         // Update Posts
    //         axios
    //           .get(`${this.url}/api/posts`)
    //           .then((res) => this.setPosts(res.data));
    //       })
    //       .catch((err) => {
    //         const resErrors = err.response.data.errors;
    //         var resError;
    //         var newError = [];
    //         for (resError in resErrors) {
    //           newError.push(resErrors[resError]);
    //         }
    //         this.setErrors(newError);
    //       });
    //   });
    // },
  },
  computed: {
    // Set states
    // setTimeout(() => {
    // 	setId(this.$route.params.id)
    // 	setPlaceholder("Add comment")
    // 	setUrlTo("/post-comments")
    // 	setUrlToTwo("/posts")
    // 	setStateToUpdate(() => setPostComments)
    // 	setStateToUpdateTwo(() => setPosts)
    // }, 1000),

    comments() {
      return this.postComments.filter(
        (comment) => comment.post_id == this.$route.params.id
      );
    },
  },
};
</script>
