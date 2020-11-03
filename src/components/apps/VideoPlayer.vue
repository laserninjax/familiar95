<template>
  <div class="video-player">
    <div class="video-player__overlay"></div>
    <div class="video-player__video" :id="'player' + _uid"></div>
    <div class="video-player__progress" @click="seek">
      <div
        class="video-player__progress-bar"
        :style="'width:' + videoProgress + '%;'"
      ></div>
    </div>
    <div class="video-player__controls">
      <button @click="play">▶</button>
      <button @click="pause">⏸</button>
      <button @click="stop">⏹</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoPlayer",
  title: "Video Player",
  icon: "cine_film_roll-0",
  defaultWidth: 647,
  defaultHeight: 558,
  player: null,
  data() {
    return {
      videoId: "M7lc1UVf-VE",
      videoDuration: null,
      videoTime: null
    };
  },
  mounted() {
    let iframeApiScript = document.createElement("script");
    iframeApiScript.setAttribute("src", "https://www.youtube.com/iframe_api");
    document.head.appendChild(iframeApiScript);

    const initPlayer = () => {
      this.player = new window.YT.Player("player" + this._uid, {
        height: "480",
        width: "640",
        videoId: "rTfa-9aCTYg",
        events: {
          onReady: this.initPlayer,
          onStateChange: this.handlePlayerChange
        },
        playerVars: {
          controls: 0,
          modestbranding: 1,
          showinfo: 0,
          rel: 0
        }
      });
      setTimeout(() => {
        this.videoDuration = this.player.getDuration();
        setInterval(() => {
          this.updateVideoTime();
        }, 100);
      }, 2000);
    };

    if (window.YT) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    }
  },
  computed: {
    videoProgress() {
      if (!this.videoTime || !this.videoDuration) return 0;
      return (this.videoTime / this.videoDuration) * 100;
    }
  },
  methods: {
    loadVideo(videoId) {
      this.videoId = videoId;
      this.player.loadVideoById({ videoId: videoId });
    },
    play() {
      this.player.playVideo();
    },
    pause() {
      this.player.pauseVideo();
    },
    stop() {
      this.player.stopVideo();
    },
    seek(e) {
      this.player.seekTo((e.layerX / 633) * this.videoDuration);
    },
    updateVideoTime() {
      this.videoTime = this.player.getCurrentTime();
    }
  }
};
</script>

<style lang="scss">
.video-player {
  position: relative;
}
.video-player__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90%;
}

.video-player__video {
  margin-left: -4px;
  margin-top: -1px;
}
.video-player__controls {
  margin-top: 4px;
  display: flex;

  button {
    width: 34px;
    min-width: 34px;
  }
}
.video-player__progress {
  position: relative;
  margin-top: 10px;
  width: 100%;
  height: 5px;
  background: #fff;
  box-shadow: inset -1px -1px #ffffff, inset 1px 1px #0a0a0a,
    inset -1px -1px #dfdfdf, inset 1px 1px #808080;
}

.video-player__progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  background: darkblue;
  height: 5px;
}
</style>
