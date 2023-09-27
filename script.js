window.onSpotifyWebPlaybackSDKReady = () => {
  const token =
    "TOKEN";
  const player = new Spotify.Player({
    name: "Mehmet Spotifty Remote Control",
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
    console.log("pressed play button");
    player.togglePlay();
  };

  document.getElementById("next-button").onclick = function () {
    player.nextTrack();
  };

  document.getElementById("prev-button").onclick = function () {
    player.previousTrack();
  };

  document.getElementById("volume-slider").addEventListener("input", (event) => {
      player.setVolume(event.target.value / 100);
    });

  player.connect();
};
