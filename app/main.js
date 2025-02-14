const isIfrem = /<iframe.*?<\/iframe>/gs;
const isYoutubeShort = /https?:\/\/(www\.)?youtube\.com\/shorts\/[a-zA-Z0-9_-]+(\?.*)?/; // Improved regex

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

// Convert YouTube short link to embeddable iframe code
const convertYoutubeShortToIframe = (url) => {
  const videoId = url.split('/shorts/')[1].split('?')[0]; // Extract video ID
  return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
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
    <div class="col-lg-4 col-md-3 col-sm-2 mt-2 mb-0 video-singl-item">
        <div class="video-item">
            ${videos_data}
        </div>
    </div>
      `;
    if (i === 50) {
      break;
    }
  }

  if (videos_data) {
    video_list_container.innerHTML = videos;
  } else {
    video_list_container.innerHTML = `<p class="text-center">Don't have any video, first you need to submit the video embed code/link</p>`;
  }
};
show_videos();

// Add video
add_video.onclick = () => {
  let videos_data = [];
  let repet_tiem = repet_time.value;

  const video_link_data = video_link.value.trim();
  if (isIfrem.test(video_link_data)) {
    videos_data.push(video_link_data);
    error.innerHTML = `Video successfully added!
    <br>
    Wait a while
    `;
    error.style.color = "green";
  } else if (isYoutubeShort.test(video_link_data)) {
    const iframeCode = convertYoutubeShortToIframe(video_link_data);
    videos_data.push(iframeCode);
    error.innerHTML = `Video successfully added!
    <br>
    Wait a while
    `;
    error.style.color = "green";
  } else {
    error.innerHTML = `Invalid URL. Please enter a valid iframe embed code or YouTube short link`;
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
  video_list_container.innerHTML = `<p class="text-center">Don't have any video, first you need to submit the video embed code/link</p>`;
};
