<template>
  <div>
    <div
      class="row p-0 m-0"
      style="
        background-image: url('/storage/img/headphones.jpg');
        background-position: center;
        background-size: cover;
        position: relative;
        height: 100%;
      "
    >
      <div class="col-sm-12 p-0">
        <br />
        <br class="hidden" />
        <div>
          <div
            class="avatar-container"
            style="margin-top: 100px; top: 70px; left: 10px"
          >
            <Img
              style="position: absolute; z-index: 99"
              class="avatar hover-img"
              :src="profile.pp"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- {/* End of Profile pic area */} -->

    <!-- {/* {{-- Profile Area --}} */} -->
    <div class="row border-bottom">
      <div class="col-sm-1"></div>
      <div class="col-sm-10">
        <br />
        <br />
        <br class="anti-hidden" />
        <!-- {/* Check whether user has bought at least one song from musician */} -->
        <!-- {/* Check whether user has followed musician and display appropriate button */} -->
        <router-link
          v-if="profile.username == auth.username"
          to="/profile-edit"
        >
          <button class="float-right mysonar-btn">edit profile</button>
        </router-link>
        <span v-if="profile.username != '@blackmusic'">
          <span v-if="profile.hasFollowed">
            <button
              class="btn btn-light float-right rounded-0"
              @click="$emit('on-follow', username)"
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
          </span>
          <span v-else>
            <Button
              v-if="profile.hasBought1"
              class="mysonar-btn float-right"
              @click="$emit('on-follow', username)"
              text="follow"
            />
            <Button
              v-else
              class="mysonar-btn float-right"
              @click="
                $emit('set-errors', [
                  `You must have bought atleast one song by ${username}`,
                ])
              "
              text="follow"
            />
          </span>
        </span>
        <div>
          <h3>{{ profile.name }}</h3>
          <h5>{{ profile.username }}</h5>
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
            <small class="ml-1">{{ profile.decos }}</small>
          </span>
          <h6>{{ profile.bio }}</h6>
        </div>
        <div class="d-flex flex-row">
          <div class="p-2">
            Following
            <br />
            {{ profile.following }}
          </div>
          <div class="p-2">
            Fans
            <br />
            {{ profile.fans }}
          </div>
        </div>
      </div>
      <div class="col-sm-1"></div>
    </div>
    <!-- {/* {{-- End of Profile Area --}} */} -->

    <div class="row">
      <div class="col-sm-1"></div>
      <div class="col-sm-3"></div>
      <div class="col-sm-4">
        <div class="hidden"><h4>Posts</h4></div>

        <div v-if="profilePosts.length == 0">
          <h6 style="color: grey">
            {{ this.$route.params.username }} does not have any posts
          </h6>
        </div>

        <!-- {/* Posts area */} -->
        <div
          v-for="post in profilePosts"
          :key="post.id"
          class="media p-2 border-bottom"
        >
          <div class="media-left">
            <div class="avatar-thumbnail-xs" style="border-radius: 50%">
              <router-link :to="`/profile/${post.username}`">
                <Img :src="post.pp" width="40px" height="40px" alt="avatar" />
              </router-link>
            </div>
          </div>
          <div class="media-body">
            <h6
              class="media-heading m-0"
              style="
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: clip;
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
                :src="`storage/${post.media}`"
                class="rounded-circle"
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
              @click.prevent="onPostLike(post.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                fill="currentColor"
                class="bi bi-heart-fill"
                view-box="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg>
              <small class="ml-1">{{ post.likes }}</small>
            </a>
            <a v-else href="#" @click.prevent="onPostLike(post.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                fill="currentColor"
                class="bi bi-heart"
                view-box="0 0 16 16"
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
                view-box="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
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
                id="dropdownMenurouter-link"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
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
                style="border-radius: 0"
              >
                <span v-if="post.username != auth.id">
                  <a
                    v-if="post.username != 29"
                    href="#"
                    class="dropdown-item"
                    @click.prevent="onFollow(post.username)"
                  >
                    <h6>Unfollow</h6>
                  </a>
                  <a
                    v-else
                    href="#"
                    class="dropdown-item"
                    @click.prevent="onDeletePost(post.id)"
                  >
                    <h6>Delete post</h6>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- {/* Posts area end */} -->

      <div class="col-sm-3"></div>
      <div class="col-sm-1"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import Img from "../components/Img";
import Button from "../components/Button";

export default {
  name: "Profile",
  components: {
    Img,
    Button,
  },
  props: ["url", "auth", "errors", "posts", "postComments", "users"],
  emits: ["set-errors", "set-message"],
  data() {
    return {
      username: "",
      profile: this.users.find(
        (user) => user.username == this.$route.params.username
      ),
    };
  },
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
  },
  computed: {
    // Get profile info
    profilePosts() {
      return this.posts.filter(
        (post) => post.username == this.$route.params.username
      );
    },
  },
};
</script>
