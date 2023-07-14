const show_video_submite_box = document.querySelector(".show_video_submite_box");
const video_submite_box = document.querySelector("main");
const video_link = document.querySelector("#url");
const repet_time = document.querySelector("#repet-time");
const video_list_container = document.querySelector(".video-list");
const add_video = document.querySelector(".submite");
const clear_all = document.querySelector(".clear_all");
const error = document.querySelector(".error");

// Toggle video submission box show/hide
show_video_submite_box.onclick = () => {
  video_submite_box.classList.toggle("active");
};

// Show videos data
const show_videos = () => {
  let videos_data = "";
  let repet_tiem = repet_time.value;

  if (localStorage.getItem("videos_data") && localStorage.getItem("repet_tiem")) {
    videos_data = JSON.parse(localStorage.getItem("videos_data"));
    repet_tiem = JSON.parse(localStorage.getItem("repet_tiem"));
  }

  let videos = "";
  for (let i = 0; i < repet_tiem; i++) {
    videos += `
        <div class="video-item">
          <div class="video-item-inner">
            ${videos_data}
          </div>
        </div>
      `;
  }
  if (videos_data) {
    video_list_container.innerHTML = videos;
  }
};
show_videos();

// Add video
add_video.onclick = () => {
  let videos_data = [];
  let repet_tiem = repet_time.value;

  const video_link_data = video_link.value.trim();
  if (video_link_data) {
    videos_data.push(video_link_data);
  } else {
    error.innerHTML = `Invalid URL. Please enter a valid URL.`;
    error.style.color = "red";
    return;
  }

  localStorage.setItem("videos_data", JSON.stringify(videos_data));
  localStorage.setItem("repet_tiem", JSON.stringify(repet_tiem));

  show_videos();
};

// Clear all video data
clear_all.onclick = () => {
  localStorage.removeItem("videos_data");
  localStorage.removeItem("repet_tiem");
  video_list_container.innerHTML = "";
};
