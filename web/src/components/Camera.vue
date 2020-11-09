<template>
  <div class="camera">
    <div class="view">
      <video id="video" width="640" height="480" autoPlay playsInline></video>
    </div>

    <div class="control md-layout">
      <div class="md-layout-item"></div>
      <div class="md-layout-item">
        <md-button class="md-raised md-primary" v-on:click="openCamera">打开</md-button>  
      </div>
      <div class="md-layout-item"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Camera',
    data () {
      return {
      }
    },
    methods: {
      openCamera(){
        navigator.mediaDevices
          .getUserMedia({video: true, audio: true})
          .then((stream) => {
            var video = document.getElementById("video");
            window.stream = stream;
            video.srcObject = stream;
          })
      },
    },
    mounted() {
    },
  }
</script>

<style lang="scss" scoped>
.camera {
  text-align: center;
}

.view {
  width: 640px;
  height: 480px;
  margin: 0 auto;
  margin-bottom: 20px;
  background-color: #111111;
}
</style>