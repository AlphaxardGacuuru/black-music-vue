<template>
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
                class='form-control m-0 p-2'
                style="
							border: none;
							outline: none;
							height: 50px;
							resize: none;
						"
                :placeholder="placeholder"
                :v-model="text"
                row="1">
					</textarea>
    </div>
    <!-- {/* Emoji icon */} -->
    <div class="pt-2 px-1">
      <span class="text-light"
            style="cursor: pointer;"
            @click="()=> {
          	setShowEmojiPicker(!showEmojiPicker)
          	setShowImagePicker(true && false)
        	setShowPollPicker(true && false)
          }">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="20"
             height="20"
             fill="currentColor"
             class="bi bi-emoji-smile"
             view-box="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
        </svg>
      </span>
    </div>
    <!-- {/* Image icon */} -->
    <div v-if="showImage"
         class="pt-2 px-1 text-light"
         @click="()=> {
        setShowImagePicker(!showImagePicker)
        setShowEmojiPicker(true && false)
        setShowPollPicker(true && false)
        setMedia('')
        }">
      <span style="cursor: pointer">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="20"
             height="20"
             fill="currentColor"
             class="bi bi-image"
             view-box="0 0 16 16">
          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
        </svg>
      </span>
    </div>
    <!-- {/* Button */} -->
    <div class="p-1">
      <button type="submit"
              class="mysonar-btn-round pr-1 pt-1"
              style="
						border-radius: 50%;
						min-width: 33px;
					"
					@click="log">
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
</template>

<script>
import Img from "../components/Img";

export default {
  name: "SocialMediaInput",
  components: {
    Img,
  },
  props: ["auth", "placeholder"],
  data() {
    return {
      text: "",
      showEmojiPicker: "",
      showImage: "",
    };
  },
};
</script>