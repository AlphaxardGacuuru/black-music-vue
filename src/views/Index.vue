<template>
  <div>
    <!-- {/* Post button */} -->
    <router-link v-if="auth.account_type == 'musician'"
                 to="/post-create"
                 id="floatBtn">
      <PenSVG />
    </router-link>

    <!-- {/* Profile info area */} -->
    <div class="row p-0">
      <div class="col-sm-1 hidden"></div>
      <div class="col-sm-3 hidden">
        <div class="d-flex">
          <div class="p-2">
            <div class="avatar-thumbnail-sm"
                 style="border-radius: 50%">
              <router-link :to="'/profile/' + auth.username">
                <Img :src="auth.pp"
                     style="width: 100px; height: 100px"
                     alt="avatar" />
              </router-link>
            </div>
          </div>
          <div class="p-2">
            <h5 class="m-0 p-0"
                style="
                width: 160px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: clip;
              ">
              {{ auth.name }}
            </h5>
            <h6 class="m-0 p-0"
                style="
                width: 140px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: clip;
              ">
              <small>{{ auth.username }}</small>
            </h6>
            <span style="color: gold"
                  class="pr-1">
              <svg class="bi bi-circle"
                   width="1em"
                   height="1em"
                   view-box="0 0 16 16"
                   fill="currentColor"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              </svg>
              <small class="ml-1">{{ auth.decos }}</small>
            </span>
          </div>
        </div>
        <div class="d-flex">
          <div class="p-2 flex-fill">
            <h6>Posts</h6>
            <span style="color: rgba(220, 220, 220, 1)">{{ auth.posts }}</span>
            <br />
          </div>
          <div class="p-2 flex-fill"
               style="color: purple">
            <h6>Fans</h6>
            <span style="color: rgba(220, 220, 220, 1)">{{ auth.fans }}</span>
            <br />
          </div>
        </div>
        <!-- {/* Profile info area End */} -->

        <br />

        <!-- {/* Musicians suggestions area */} -->
        <div>
          <div class="p-2">
            <h2>Musicians to follow</h2>
          </div>
          <!-- {/* Slice to limit to 10 */} -->
          <div v-for="musician in musicians"
               :key="musician.id"
               class="d-flex justify-content-between">
            <div class="p-2">
              <router-link :to="`/profile/${musician.username}`">
                <Img :src="musician.pp"
                     class="rounded-circle"
                     style="width: 30px; height: 30px"
                     alt="user" />
              </router-link>
            </div>
            <div class="p-2">
              <router-link :to="`/profile/${musician.username}`"
                           class="text-dark">
                <b>{{ musician.name }}</b>
                <small><i>{{ musician.username }}</i></small>
              </router-link>

              <!-- {/* Check whether user has bought at least one song from user */} -->
              <!-- {/* Check whether user has followed user and display appropriate button */} -->
              <span v-if="musician.hasBought1 || auth.username == '@blackmusic'"
                    class="float-right">
                <button v-if="musician.hasFollowed"
                        class="btn btn-light float-right rounded-0"
                        @click="$emit('onFollow', musician.username)">
                  Followed
                  <CheckSVG />
                </button>
                <Button v-else
                        class="mysonar-btn float-right"
                        @click="$emit('on-follow', musician.username)"
                        text="follow" />
              </span>
              <div v-else>
                <Button class="mysonar-btn float-right"
                        @click="$emit('set-errors', [`You must have bought atleast one song by ${musician.username}`])"
                        text="follow" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- {/* Musician suggestion area end */} -->

      <div class="col-sm-4">
        <!-- {/* ****** Songs Area ****** */} -->
        <div class="p-2">
          <h5>Posts for you</h5>
          <div class="hidden-scroll"
               onScroll="handleScroll"></div>
        </div>
        <!-- {/* ****** Songs Area End ****** */} -->

        <!-- {/* Posts area */} -->
        <div class="m-0 p-0">
          <div v-for="post in homeposts"
               :key="post.id"
               class="d-flex">
            <div class="p-1">
              <div class="avatar-thumbnail-xs"
                   style="border-radius: 50%">
                <router-link :to="`/profile/${post.username}`">
                  <Img :src="post.pp"
                       style="width: 50px; height: 50px"
                       alt="avatar" />
                </router-link>
              </div>
            </div>
            <div class="p-1"
                 style="flex-grow: 1;">
              <h6 class="m-0"
                  style="
				  	width: 100%; 
				  	white-space: nowrap; 
					overflow: hidden; 
					text-overflow: clip">
                <b>{{ post.name }}</b>
                <small>{{ post.username }}</small>
                <small><b><i class="float-right mr-1">{{ post.inserted_at }}</i></b></small>
              </h6>
              <p class="mb-0">{{ post.text }}</p>

              <!-- {/* Post likes */} -->
              <a v-if="post.hasLiked"
                 href="#"
                 style="color: #cc3300"
                 @click="onPostLike(post.id)">
                <span style="color: inherit; fontSize: 1.2em">
                  <HeartFilledSVG />
                </span>
                <small class="ml-1"
                       style="color: inherit">{{ post.likes }}</small>
              </a>
              <span v-else
                    @click="onPostLike(post.id)"
                    class="dislike">
                <HeartSVG />
                <small class="ml-1">{{ post.likes }}</small>
              </span>

              <!-- {/* Post comments */} -->
              <router-link :to="'/post-show/' + post.id"
                           style="color: rgba(220, 220, 220, 1)">
                <span class="ml-5"
                      style="font-size: 1.2em">
                  <CommentSVG />
                </span>
                <small class="ml-1"
                       style="color: inherit">
                  {{ post.comments }}
                </small>
              </router-link>

              <!-- {/* Default dropup button */} -->
              <div class="dropup dropleft float-right hidden">
                <a href="#"
                   role="button"
                   id="dropdownMenuLink"
                   data-toggle="dropdown"
                   aria-haspopup="true"
                   aria-expanded="false"
                   @click="showDropUp(!dropUp)">
                  <OptionsSVG />
                </a>
                <div class="dropdown-menu"
                     :style="{'border-radius': '0', display: dropUp ? 'block' : 'none'}">
                  <div v-if="post.username != auth.username">
                    <a v-if="post.username != '@blackmusic'"
                       href="#"
                       class="dropdown-item"
                       @click="onFollow(post.username)">
                      <h6>Unfollow</h6>
                    </a>
                  </div>
                  <div v-else>
                    <router-link :to="'/post-edit/' + post.id"
                                 class="dropdown-item">
                      Edit
                    </router-link>
                    <a href="#"
                       class="dropdown-item"
                       @click="onDeletePost(post.id)">
                      <h6>Delete post</h6>
                    </a>
                  </div>
                </div>
              </div>
              <!-- {/* For small screens */} -->
              <div class="float-right anti-hidden">
                <span class="text-secondary"
                      @click="() => showOptions(post.username, post.id)">
                  <OptionsSVG />
                </span>
              </div>
              <!-- {/* Edited */} -->
              <small>
                <b><i class="d-block text-secondary my-1">{{post.hasEdited && "Edited"}}</i></b>
              </small>
              <!-- {/* Default dropup button End */} -->
            </div>
          </div>
        </div>
        <!-- Posts Area End -->
        <br />
        <br />
      </div>
      <!-- {/* Posts area end */} -->

      <div class="col-sm-1"></div>
    </div>

    <!-- {/* Sliding Bottom Nav */} -->
    <div :class="bottomMenu">
      <div class="bottomMenu">
        <div class="d-flex align-items-center justify-content-between"
             style="height: 3em">
          <div></div>
          <!-- {/* Close Icon */} -->
          <div class="closeIcon p-2 float-right"
               style="fontSize: 1em"
               @click="setBottomMenu('')">
            <CloseSVG />
          </div>
        </div>
        <div v-if="unfollowLink"
             @click="() => {
							setBottomMenu('')
							onFollow(userToUnfollow)
						}">
          <h6 class="pb-2">Unfollow {{userToUnfollow}}</h6>
        </div>
        <router-link v-if="editLink"
                     :to="`/post-edit/${postToEdit}`"
                     @click="() => setBottomMenu('')">
          <h6 class="pb-2">Edit post</h6>
        </router-link>
        <div v-if="deleteLink"
             @click="() => {
							setBottomMenu('')
							onDeletePost(postToEdit)
						}">
          <h6 class="pb-2">Delete post</h6>
        </div>
      </div>
    </div>
    <!-- {/* Sliding Bottom Nav  end */} -->
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

import Img from "../components/Img";
import Button from "../components/Button";

import PenSVG from "../svgs/PenSVG";
import CheckSVG from "../svgs/CheckSVG";
import HeartFilledSVG from "../svgs/HeartFilledSVG.vue";
import HeartSVG from "../svgs/HeartSVG.vue";
import OptionsSVG from "../svgs/OptionsSVG.vue";
import CommentSVG from "../svgs/CommentSVG.vue";
import CloseSVG from "../svgs/CloseSVG.vue";

export default {
  name: "Index",
  components: {
    Img,
    Button,
    PenSVG,
    CheckSVG,
    HeartSVG,
    HeartFilledSVG,
    OptionsSVG,
    CommentSVG,
    CloseSVG,
  },
  data() {
    return {
      dropUp: false,
      bottomMenu: "",
      userToUnfollow: "",
      unfollowLink: "",
      deleteLink: "",
      editLink: "",
    };
  },
  props: ["url", "auth", "message", "errors", "posts", "postComments", "users"],
  emits: ["setState", "onFollow"],
  methods: {
    setBottomMenu(value) {
      this.bottomMenu = value;
    },
    setUserToUnfollow(value) {
      this.userToUnfollow = value;
    },
    setPostToEdit(value) {
      this.postToEdit = value;
    },
    showOptions(username, id) {
		console.log(username != this.auth.username)
      if (username != this.auth.username) {
        if (username != "@blackmusic") {
          this.setBottomMenu("menu-open");
          this.setUserToUnfollow(username);
          // Show and Hide elements
          this.unfollowLink = true;
          this.deleteLink = false;
          this.editLink = false;
        }
      } else {
        this.setBottomMenu("menu-open");
        this.setPostToEdit(id);
        // Show and Hide elements
        this.editLink = true;
        this.deleteLink = true;
        this.unfollowLink = false;
      }
    },
    // Function for liking posts
    onPostLike(id) {
      const postToUpdate = this.posts.find((post) => post.id == id);
      //   const updatedPost = {
      //     ...postToUpdate,
      //     hasLiked: !postToUpdate.hasLiked,
      //   };
      console.log(postToUpdate);
      //   axios
      // .put(`${this.url}/posts/${id}`, { updatedPost })
    },

    // Function for deleting posts
    onDeletePost(id) {
      axios
        .delete(`${this.url}/api/posts/${id}`)
        .then(() => {
          // Update posts
          this.$emit(
            "setState",
            "posts",
            this.posts.filter((post) => post.id != id)
          );
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
    },

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
    homeposts() {
      //   return this.posts.filter((post) => post.hasFollowed);
      return this.posts;
    },
  },
};
</script>
