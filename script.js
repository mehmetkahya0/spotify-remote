
// Load the Spotify Web Playback SDK script
window.onSpotifyWebPlaybackSDKReady = () => {
  // Initialize the player
  const player = new Spotify.Player({
    name: "My Spotify Player",
    getOAuthToken: (cb) => {
      // Get an access token from the Spotify Web API
      fetch(
        "https://accounts.spotify.com/api/TOKEN",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
          },
          body: "grant_type=client_credentials",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // Pass the access token to the player
          cb(data.access_token);
        })
        .catch((error) => console.error(error));
    },
  });

  // Connect to the player
  player.connect().then((success) => {
    if (success) {
      console.log("The Web Playback SDK successfully connected to Spotify!");
    } else {
      console.log("The Web Playback SDK could not connect to Spotify.");
    }
  });

  // Play a track
  player.addListener("ready", ({ device_id }) => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
      body: JSON.stringify({
        uris: ["spotify:track:7xGfFoTpQ2E7fRF5lN10tr"],
      }),
    });
  });

  // Listen for changes in the player state
  player.addListener("player_state_changed", (state) => {
    if (state) {
      // Update the track info elements
      document.getElementById("track-name").textContent =
        state.track_window.current_track.name;
      document.getElementById("artist-name").textContent =
        state.track_window.current_track.artists[0].name;
    }
  });

  // Add event listeners to the control buttons
  document.getElementById("prev-button").addEventListener("click", () => {
    player.previousTrack();
  });

  document.getElementById("play-button").addEventListener("click", () => {
    player.togglePlay();
  });

  document.getElementById("next-button").addEventListener("click", () => {
    player.nextTrack();
  });

  // Add event listener to the pause button
  document.getElementById("pause-button").addEventListener("click", () => {
    player.pause();
  });

  // Add event listener to the volume slider
  document
    .getElementById("volume-slider")
    .addEventListener("input", (event) => {
      player.setVolume(event.target.value / 100);
    });
};
