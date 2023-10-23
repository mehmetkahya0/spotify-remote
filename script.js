window.onSpotifyWebPlaybackSDKReady = () => {
  const token =
    "token";
  const player = new Spotify.Player({
    name: "local-Mehmet Spotify Remote Control",
    getOAuthToken: (cb) => {
      cb(token);
    },
    volume: 0.5,
  });

  // Ready
  player.addListener("ready", ({ device_id }) => {
    console.log("Ready with Device ID", device_id);
  });

  // Not Ready
  player.addListener("not_ready", ({ device_id }) => {
    console.log("Device ID has gone offline", device_id);
  });

  player.addListener("initialization_error", ({ message }) => {
    console.error(message);
  });

  player.addListener("authentication_error", ({ message }) => {
    console.error(message);
  });

  player.addListener("account_error", ({ message }) => {
    console.error(message);
  });

  document.getElementById("play-button").onclick = function () {
    player.togglePlay();
  };

  document.getElementById("next-button").onclick = function () {
    player.nextTrack();
  };

  document.getElementById("prev-button").onclick = function () {
    player.previousTrack();
  };

  document
    .getElementById("volume-slider")
    .addEventListener("input", (event) => {
      player.setVolume(event.target.value / 100);
    });

  // get track info
  player.addListener("player_state_changed", (state) => {
    console.log(state);
    document.getElementById("track-name").innerHTML =
      state.track_window.current_track.name;
    document.getElementById("artist-name").innerHTML =
      state.track_window.current_track.artists[0].name;
    document.getElementById("album-name").innerHTML =
      state.track_window.current_track.album.name;
    document.getElementById("album-image").src =
      state.track_window.current_track.album.images[0].url;
    document.getElementById("progress-bar").max = state.duration;
    document.getElementById("progress-bar").value = state.position;
  });

  // get album cover and display it
  player.addListener("player_state_changed", (state) => {
    document.getElementById("album-image").src =
      state.track_window.current_track.album.images[0].url;
  });

  // get progress bar and display it
  player.addListener("player_state_changed", (state) => {
    document.getElementById("progress-bar").max = state.duration;
    document.getElementById("progress-bar").value = state.position;
  });

  //time info. current time - duration. Use minutes and seconds
  player.addListener("player_state_changed", (state) => {
    var duration = state.duration;
    var minutes = Math.floor(duration / 60000);
    var seconds = ((duration % 60000) / 1000).toFixed(0);
    document.getElementById("duration").innerHTML =
      minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  });

  player.connect();
};
