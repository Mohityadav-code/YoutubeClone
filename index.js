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
    const apiKey = "AIzaSyAmr8jGv_9tXPEWXwKQfzbRDRPNIVpuD1A";
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
  
// const apiKey="AIzaSyBWs_RprsJw7_eQl84PQL2eZ4zIMgl069U"
// const query = 'puppies';
// var arr=[]
// class dataOfVideo{
//     constructor(name,classc){

//         this.videoId=name;
//         this.thumbnail=classc;
//     }

// }

// const maxResults = 10;
// const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${query}&key=${apiKey}`;
// for (let i = 0; i <20; i++) {

// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//       var obj=new dataOfVideo
//       const videos = data.items.map(item =>( {

//       videoId :item.id.videoId,
//       title:item.snippet.title,
//      thumbnail: item.snippet.thumbnails.medium.url
//     }));
//     videos.forEach(video => {
//       // You can access the video ID, title, and thumbnail for each video
//       console.log(video.videoId);
//       console.log(video.title);
//       console.log(video.thumbnail);

//       // To get view count and upload date for each video, you will need to make a separate API request to the videos endpoint using the video ID
//       const videoUrl = `https://www.googleapis.com/youtube/v3/videos?id=${video.videoId}&key=${apiKey}&part=statistics,snippet`;
//       fetch(videoUrl)
//         .then(response => response.json())
//         .then(data => {
//           obj.videoData = data.items[0];
//           obj.viewCount = videoData.statistics.viewCount;
//           obj.uploadDate = new Date(videoData.snippet.publishedAt);

//           arr.push(obj)
//           // You can now access the view count and upload date for the current video
//           console.log(viewCount);
//           console.log(uploadDate);
//           console.log("arr",arr);
//         });
//     });
//   });

// }

// // fetch(url)
// //   .then(response => response.json())
// //   .then(data => {
// //     // Access the video IDs and thumbnails
// //     var obj=new dataOfVideo
// //     const results = data.items.map(item => {
// //         obj.videoId=item.id.videoId;
// //         obj.thumbnail=item.snippet.thumbnails.default.url;
// //         arr.push(obj)
// //       return {
// //         id: item.id.videoId,
// //         thumbnail: item.snippet.thumbnails.default.url
// //       };
// //     });
// //     console.log(results);
// //     console.log(arr);
// //     domFun()
// //   })
// //   .catch(error => console.error(error));

// //   /**
// //    * Sample JavaScript code for youtube.videos.list
// //    * See instructions for running APIs Explorer code samples locally:
// //    * https://developers.google.com/explorer-help/code-samples#javascript
// //    */

//   function authenticate() {
//     return gapi.auth2.getAuthInstance()
//         .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
//         .then(function() { console.log("Sign-in successful"); },
//               function(err) { console.error("Error signing in", err); });
//   }
//   function loadClient() {
//     gapi.client.setApiKey(apiKey);
//     return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
//         .then(function() { console.log("GAPI client loaded for API"); },
//               function(err) { console.error("Error loading GAPI client for API", err); });
//   }
//   // Make sure the client is loaded and sign-in is complete before calling this method.
//   function execute() {
//     return gapi.client.youtube.videos.list({
//       "part": [
//         "snippet,contentDetails,statistics"
//       ],
//       "chart": "mostPopular",
//       "regionCode": "US"
//     })
//         .then(function(response) {
//                 // Handle the results here (response.result has the parsed body).
//                 console.log("Response", response);
//               },
//               function(err) { console.error("Execute error", err); });
//   }
//   gapi.load("client:auth2", function() {
//     gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
//   });

// }
