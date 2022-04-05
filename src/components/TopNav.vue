<template>
	<div id="MyElement" :style="{ display: showTopnav }" :class="menu">
		<!-- {/* ***** Main Menu Area Start ***** */} -->
		<div class="mainMenu d-flex align-items-center justify-content-between">
			<!-- {/* Close Icon */} -->
			<div class="closeIcon" @click="setMenu('')">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="40"
					height="40"
					fill="currentColor"
					class="bi bi-x"
					viewBox="0 0 16 16"
				>
					<path
						d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
					/>
				</svg>
			</div>
			<!-- {/* Logo Area */} -->
			<div class="logo-area">
				<router-link to="/">Black Music</router-link>
			</div>
			<!-- {/* Nav */} -->
			<div class="sonarNav wow fadeInUp" data-wow-delay="1s">
				<nav>
					<ul>
						<li class="nav-item active">
							<router-link
								to="/"
								:style="{ color: isHome }"
								class="nav-router-link"
								@click="setMenu('')"
							>
								<span style="float: left; padding-right: 20px">
									<svg
										class="bi bi-house"
										width="1em"
										height="1em"
										viewBox="0 0 16 16"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
										/>
										<path
											fillRule="evenodd"
											d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
										/>
									</svg>
								</span>
								Home
							</router-link>
						</li>
						<!-- <li class="nav-item active">
							<router-link
								to="/video-charts"
								:style="{ color: isCharts }"
								class="nav-router-link"
								@click="setMenu('')"
							>
								<span style="float: left; padding-right: 20px">
									<svg
										class="bi bi-compass"
										width="1em"
										height="1em"
										viewBox="0 0 16 16"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											d="M8 15.016a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zm0 1a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z"
										/>
										<path
											d="M6 1a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1zm.94 6.44l4.95-2.83-2.83 4.95-4.95 2.83 2.83-4.95z"
										/>
									</svg>
								</span>
								Discover
							</router-link>
						</li> -->
						<!-- <li class="nav-item active">
							<router-link
								to="/library"
								:style="{
									color: isLibrary,
								}"
								class="nav-router-link"
								@click="setMenu('')"
							>
								<span style="float: left; padding-right: 20px">
									<svg
										class="bi bi-person"
										width="1em"
										height="1em"
										viewBox="0 0 16 16"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
										/>
									</svg>
								</span>
								Library
							</router-link>
						</li> -->
					</ul>
				</nav>
			</div>
			<br />
		</div>
		<!-- {/* ***** Main Menu Area End ***** */} -->

		<!-- {/* ***** Header Area Start ***** */} -->
		<header style="background-color: #41B883" class="header-area">
			<div class="container-fluid p-0">
				<div class="row">
					<div class="col-12" style="padding: 0">
						<div class="menu-area d-flex justify-content-between">
							<!-- {/* Logo Area  */} -->
							<div class="logo-area">
								<router-link to="/">Black Music</router-link>
							</div>
							
							<div class="menu-content-area d-flex align-items-center">
								<!-- {/* Header Social Area */} -->
								<div class="header-social-area d-flex align-items-center">
									<router-link
										v-show="auth.username == '@guest'"
										class="display-4"
										to="#"
										@click="setLogin(true)"
										>Login</router-link
									>
									<!-- <router-link class="display-4" to="#" >Register</router-link> -->

									<!-- {/* Avatar Dropdown */} -->
									<div v-show="auth.username != '@guest'" class="dropdown show">
										<router-link
											to="#"
											role="button"
											id="dropdownMenua"
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false"
											@click="showAvatarDropdown(!avatarDropdown)"
										>
											<Img
												:src="auth.pp"
												class="rounded-circle"
												style="width: 30px; height: 30px"
												alt="Avatar"
											/>
										</router-link>
										<div
											:style="{
												'border-radius': '0px',
												display: avatarDropdown ? 'inline' : 'none',
												left: '-50px',
											}"
											class="dropdown-menu dropdown-menu-right m-0 p-0"
											aria-labelledby="dropdownMenuButton"
										>
											<router-link
												to="`/profile/${auth.username}`"
												class="p-3 dropdown-item border-bottom"
											>
												<h5>{{ auth.name }}</h5>
												<h6>{{ auth.username }}</h6>
											</router-link>
											<!-- <router-link
												to="#"
												ref="{btnAdd}"
												style="display: 'none'"
												class="p-3 dropdown-item border-bottom"
											>
												<h6>Get App</h6>
											</router-link>
											<router-link
												to="/settings"
												class="p-3 dropdown-item border-bottom"
											>
												<h6>Settings</h6>
											</router-link>
											<router-link
												to="#"
												class="p-3 dropdown-item"
												@click="logout"
											>
												<h6>Logout</h6>
											</router-link> -->
										</div>
									</div>
								</div>
								<!-- {/* Menu Icon */} -->
								<a
									href="#"
									class="hidden"
									id="menuIcon"
									@click="
										(e) => {
											e.preventDefault();
											setMenu('menu-open');
										}
									"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="25"
										height="25"
										fill="#fff"
										class="bi bi-list"
										viewBox="0 0 16 16"
									>
										<path
											fillRule="evenodd"
											d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
										/>
									</svg>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
		<br />
		<br />

		<!-- {/* Remove for profile page for better background image */} -->
		<br v-show="showSingleBreak" class="hidden" />
		<span v-show="!showSingleBreak">
			<br />
			<br class="hidden" />
		</span>
	</div>
</template>

<script>
import axios from "axios";

import Img from "./Img";

export default {
	name: "TopNav",
	components: {
		Img,
	},
	props: [
		"url",
		"auth",
		"errors",
		"audioAlbums",
		"cartAudios",
		"notifications",
	],
	emits: ["setErrors", "setMessage", "onNotifications"],
	data() {
		return {
			menu: "",
			display: "",
			avatarDropdown: false,
		};
	},
	methods: {
		setMenu(value) {
			this.menu = value;
		},
		// Function for logging out
		logout(e) {
			e.preventDefault();

			axios.get("/sanctum/csrf-cookie").then(() => {
				axios.post(`${this.url}/api/logout`).then(() => {
					this.$emit("set-message", "Logged out");
					// Update Auth
					this.$emit("set-auth", {
						name: "Guest",
						username: "@guest",
						pp: "profile-pics/male_avatar.png",
						account_type: "normal",
					});
				});
			});
		},

		// Dropdown
		showAvatarDropdown(value) {
			this.avatarDropdown = value;
		},
	},
	computed: {
		isHome() {
			if (this.$route.path == "/") {
				return "gold";
			} else {
				return "white";
			}
		},
		isLibrary() {
			if (this.$route.path == "/library") {
				return "gold";
			} else {
				return "white";
			}
		},
		isCharts() {
			if (
				this.$route.path == "/video-charts" ||
				this.$route.path == "/video-charts"
			) {
				return "gold";
			} else {
				return "white";
			}
		},

		// Hide TopNav from various pages
		showTopnav() {
			if (
				this.$route.path.match("/help/") ||
				this.$route.path.match("/post-create") ||
				this.$route.path.match("/post-show/") ||
				this.$route.path.match("/referral") ||
				this.$route.path.match("/login") ||
				this.$route.path.match("/register")
			) {
				return "none";
			} else {
				return "";
			}
		},
		showSingleBreak() {
			if (
				this.$route.path.match(/profile/) ||
				this.$route.path.match(/video-charts/) ||
				this.$route.path.match(/audio-charts/)
			) {
				return true;
			} else {
				return false;
			}
		},
	},
};

/*
 *
 * PWA Install button */
// let deferredPrompt;
// var btnAdd = React.useRef(null);

// // Listen to the install prompt
// window.addEventListener("beforeinstallprompt", (e) => {
// 	deferredPrompt = e;

// 	// Show the button
// 	btnAdd.current.style.display = "block";

// 	// Action when button is clicked
// 	btnAdd.current.addEventListener("click", (e) => {
// 		// Show install banner
// 		deferredPrompt.prompt();
// 		// Check if the user accepted
// 		deferredPrompt.userChoice.then((choiceResult) => {
// 			if (choiceResult.outcome === "accepted") {
// 				btnAdd.current.innerHTML = "<h6>User accepted</h6>";
// 			}
// 			deferredPrompt = null;
// 		});

// 		window.addEventListener("appinstalled", (evt) => {
// 			btnAdd.current.innerHTML = "<h6>Installed</h6>";
// 		});
// 	});
// });
</script>
