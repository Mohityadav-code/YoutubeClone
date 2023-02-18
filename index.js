const hoverForUnderline = document.querySelectorAll(".hoverForUnderline");

hoverForUnderline.forEach((element) => {
  element.addEventListener("mouseover", function () {
    element.style.textDecoration = "underline";
  });

  element.addEventListener("mouseout", function () {
    element.style.textDecoration = "none";
  });
});

const hoveritalic = document.querySelectorAll(".hoveritalic");

hoveritalic.forEach((element) => {
  element.addEventListener("mouseover", function () {
    element.style.color = "yellow";
    element.style.fontStyle = "italic";
  });

  element.addEventListener("mouseout", function () {
    element.style.color = "white";
    element.style.fontStyle = "normal";
  });
});

const hoverBgWhiteTextBlackBold = document.querySelectorAll(
  ".hoverBgWhiteTextBlackBold"
);

hoverBgWhiteTextBlackBold.forEach((element) => {
  element.addEventListener("mouseover", function () {
    element.style.color = "black";
    element.style.fontStyle = "bold";
    element.style.backgroundColor = "white";
  });

  element.addEventListener("mouseout", function () {
    element.style.color = "white";
    element.style.fontStyle = "normal";
    element.style.backgroundColor = "transparent";
  });
});

hoverBgWhiteTextBlackBold.forEach((element) => {
    element.addEventListener("click", function () {
      var query = element.innerText;
      console.log("query: ", query);
      fetchVideosByQuery();
    });
  });
  
  hoveritalic.forEach((element) => {
    element.addEventListener("click", function () {
      var query = element.innerText;
      // console.log('query: ', query);
      fetchVideosByQuery();
    });
  });
  
  class VideoData {
    constructor(id, thumbnail, title, uploadDate, viewCount) {
      this.id = id;
      this.thumbnail = thumbnail;
      this.title = title;
      this.uploadDate = uploadDate;
      this.viewCount = viewCount;
    }
  }
  
  function fetchVideosByQuery() {
    const query="puppy"
    const apiKey = "#############################";  //we can't write api keys publicly 
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${apiKey}`;
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const videoIds = data.items.map((item) => item.id.videoId).join(",");
        const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${apiKey}`;
  
        return fetch(videoDetailsUrl);
      })
      .then((response) => response.json())
      .then((data) => {
        const videos = data.items.map((item) => {
          const id = item.id;
          const thumbnail = item.snippet.thumbnails.high.url;
          const title = item.snippet.title;
          const uploadDate = item.snippet.publishedAt;
          const viewCount = item.statistics.viewCount;
          return new VideoData(id, thumbnail, title, uploadDate, viewCount);
        });
  
        updateDom(videos);
      })
      .catch((error) => console.error(error));
  }
  
  function updateDom(videos) {
    var videothumbs = document.querySelectorAll(".videothumb");
    var videotitles = document.querySelectorAll(".videotitle");
    var videouploadtimes = document.querySelectorAll(".videouploadtime");
    var videoviewcounts = document.querySelectorAll(".videoviewcount");
  
    for (let i = 0; i < videos.length; i++) {
      videothumbs[i].src = videos[i].thumbnail;
      videotitles[i].innerText = videos[i].title;
      videouploadtimes[i].innerText = videos[i].uploadDate;
      videoviewcounts[i].innerText = videos[i].viewCount;
    }
  }
  

