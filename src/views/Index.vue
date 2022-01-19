<template>
  <div>
    <!-- {/* Post button */} -->
    <router-link
      v-if="auth.account_type == 'musician'"
      to="post-create"
      id="floatBtn"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        class="bi bi-pen"
        viewBox="0 0 16 16"
      >
        <path
          d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
        />
      </svg>
    </router-link>

    <!-- {/* Profile info area */} -->
    <div class="row p-0">
      <div class="col-sm-1 hidden"></div>
      <div class="col-sm-3 hidden">
        <div class="d-flex border">
          <div class="p-2">
            <div class="avatar-thumbnail-sm" style="border-radius: 50%">
              <router-link :to="'/profile/' + auth.username">
                <Img
                  :src="auth.pp"
                  style="width: 100px; height: 100px"
                  alt="avatar"
                />
              </router-link>
            </div>
          </div>
          <div class="p-2 flex-grow-1">
            <h5
              class="m-0 p-0"
              style="
                width: 160px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: clip;
              "
            >
              {{ auth.name }}
            </h5>
            <h6
              class="m-0 p-0"
              style="
                width: 140px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: clip;
              "
            >
              <small>{{ auth.username }}</small>
            </h6>
            <span style="color: gold" class="pr-1">
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
              <small class="ml-1">{{ auth.decos }}</small>
            </span>
          </div>
        </div>
        <div class="d-flex border-bottom border-left border-right">
          <div class="p-2 flex-fill">
            <h6>Posts</h6>
            {{ auth.posts }}
            <br />
          </div>
          <div class="p-2 flex-fill" style="color: purple">
            <h6>Fans</h6>
            {{ auth.fans }}
            <br />
          </div>
        </div>
        <!-- {/* Profile info area End */} -->

        <br />

        <!-- {/* Musicians suggestions area */} -->
        <div class="border">
          <div class="p-2 border-bottom">
            <h2>Musicians to follow</h2>
          </div>
          <!-- {/* Slice to limit to 10 */} -->
          <div
            v-for="musician in musicians"
            :key="musician.id"
            class="media p-2 border-bottom"
          >
            <div class="media-left">
              <router-link to="`/profile/${user.username}`">
                <Img
                  :src="musician.pp"
                  class="rounded-circle"
                  style="width: 30px; height: 30px"
                  alt="user"
                />
              </router-link>
            </div>
            <div class="media-body">
              <router-link
                :to="`/profile/${musician.username}`"
                class="text-dark"
              >
                <b>{{ musician.name }}</b>
                <small
                  ><i>{{ musician.username }}</i></small
                >
              </router-link>

              <!-- {/* Check whether user has bought at least one song from user */} -->
              <!-- {/* Check whether user has followed user and display appropriate button */} -->
              <span
                v-if="musician.hasBought1 || auth.username == '@blackmusic'"
                class="float-right"
              >
                <button
                  v-if="musician.hasFollowed"
                  class="btn btn-light float-right rounded-0"
                  @click="onFollow(musician.username)"
                >
                  Followed
                  <!-- <svg
                    class="bi bi-check"
                    width="1.5em"
                    height="1.5em"
                    view-box="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
                    />
                  </svg> -->
                </button>
                <Button
                  v-else
                  :btnClass="'mysonar-btn float-right'"
                  @click="onFollow(musician.username)"
                  text="follow"
                />
              </span>
              <div v-else>
                <Button
                  :btnClass="'mysonar-btn float-right'"
                  @click="
                    setErrors([
                      `You must have bought atleast one song by ${musician.username}`,
                    ])
                  "
                  text="follow"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- {/* Musician suggestion area end */} -->

      <div class="col-sm-4">
        <!-- {/* ****** Songs Area ****** */} -->
        <div class="p-2 border">
          <h5>Songs for you</h5>
          <div class="hidden-scroll" onScroll="handleScroll"></div>
        </div>
        <!-- {/* ****** Songs Area End ****** */} -->

        <!-- {/* Posts area */} -->
        <div class="border border-top-0 m-0 p-0">
          <div
            v-for="post in homePosts"
            :key="post.id"
            class="media p-2 border-bottom"
          >
            <div class="media-left">
              <div class="avatar-thumbnail-xs" style="border-radius: 50%">
                <router-link :to="`/profile/${post.username}`">
                  <Img
                    :src="post.pp"
                    style="width: 40px; height: 40px"
                    alt="avatar"
                  />
                </router-link>
              </div>
            </div>
            <div class="media-body">
              <h6
                class="media-heading m-0"
                style="
						width: 100%;
						white-space: nowrap;,
						overflow: hidden;
						text-overflow: clip
					"
              >
                <b>{{ post.name }}</b>
                <small>{{ post.username }}</small>
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
                  <small class="ml-1">{{ post.decos }}</small>
                </span>
                <small>
                  <i class="float-right mr-1">{{ post.created_at }}</i>
                </small>
              </h6>
              <p class="mb-0">{{ post.text }}</p>

              <!-- {/* Show media */} -->
              <div class="mb-1" style="overflow: hidden">
                <Img
                  v-if="post.media"
                  src="`storage/${post.media}`"
                  width="100%"
                  height="auto"
                  alt="post-media"
                />
              </div>

              <!-- {/* Post likes */} -->
              <a
                v-if="post.hasLiked"
                href="#"
                style="color: #cc3300"
                @click="onPostLike(post.id)"
              >
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
                <small class="ml-1">{{ post.likes }}</small>
              </a>
              <a v-else href="#" @click="onPostLike(post.id)">
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
                <small class="ml-1">{{ post.likes }}</small>
              </a>

              <!-- {/* Post comments */} -->
              <router-link :to="'post-show/' + post.id">
                <svg
                  class="bi bi-chat ml-5"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
                  />
                </svg>
                <small class="ml-1">{{ post.comments }}</small>
              </router-link>

              <!-- {/* Default dropup button */} -->
              <div class="dropup float-right">
                <a
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  @click="showDropUp(!dropUp)"
                >
                  <svg
                    class="bi bi-three-dots-vertical"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                    />
                  </svg>
                </a>
                <div
                  class="dropdown-menu dropdown-menu-right"
                  :style="{
                    'border-radius': '0',
                    display: dropUp ? 'inline' : 'none',
                  }"
                >
                  <div v-if="post.username != auth.username">
                    <a
                      v-if="post.username != '@blackmusic'"
                      href="#"
                      class="dropdown-item"
                      @click="onFollow(post.username)"
                    >
                      <h6>Unfollow</h6>
                    </a>
                    <a
                      v-else
                      href="#"
                      class="dropdown-item"
                      @click="onDeletePost(post.id)"
                    >
                      <h6>Delete post</h6>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- {/* Posts area end */} -->

      <span>{{ message }}</span>
      <button @click="$emit('set-message', 'new message')">Change</button>

      <div class="col-sm-1"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

import Img from "../components/Img";
import Button from "../components/Button";

export default {
  name: "Index",
  components: {
    Img,
    Button,
  },
  data() {
    return {
      dropUp: false,
    };
  },
  props: ["url", "auth", "message", "errors", "posts", "postComments", "users"],
  emits: [
    "set-auth",
    "setErrors",
    "set-message",
    "setPosts",
    "setPostComments",
  ],
  methods: {
    // Function for liking posts
    onPostLike(post) {
      axios.get("sanctum/csrf-cookie").then(() => {
        axios
          .post(`${this.url}/api/post-likes`, {
            post: post,
          })
          .then((res) => {
            this.setMessage(res.data);
            // Update posts
            axios
              .get(`${this.url}/api/posts`)
              .then((res) => this.setPosts(res.data));
          })
          .catch((err) => {
            const resErrors = err.response.data.errors;
            var resError;
            var newError = [];
            for (resError in resErrors) {
              newError.push(resErrors[resError]);
            }
            // Get other errors
            newError.push(err.response.data.message);
            this.setErrors(newError);
          });
      });
    },

    // Function for deleting posts
    onDeletePost(id) {
      axios.get("sanctum/csrf-cookie").then(() => {
        axios
          .delete(`${this.url}/api/posts/${id}`)
          .then((res) => {
            this.setMessage(res.data);
            // Update posts
            axios
              .get(`${this.url}/api/posts`)
              .then((res) => this.setPosts(res.data));
          })
          .catch((err) => {
            const resErrors = err.response.data.errors;
            var resError;
            var newError = [];
            for (resError in resErrors) {
              newError.push(resErrors[resError]);
            }
            // Get other errors
            newError.push(err.response.data.message);
            this.setErrors(newError);
          });
      });
    },

    // Function for loading more artists
    // handleScroll(e) {
    //   const bottom =
    //     e.target.scrollLeft >= e.target.scrollWidth - e.target.scrollWidth / 3;

    //   if (bottom) {
    //     setVideoSlice(videoSlice + 10);
    //   }
    // },

    // Drop up function
    showDropUp(value) {
      this.dropUp = value;
    },
  },
  computed: {
    musicians() {
      return this.users
        .filter(
          (user) =>
            user.account_type == "musician" &&
            user.username != this.auth.username &&
            user.username != "@blackmusic"
        )
        .slice(0, 10);
    },
    homePosts() {
      return this.posts.filter((post) => post.hasFollowed);
    },
  },
};
</script>
