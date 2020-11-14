<template>
  <div class="echo">
    <div class="md-layout">
      <div class="md-layout-item">
        <video id="localVideo" width="640" height="480" autoPlay playsInline></video>
        <p>Local Stream</p>
      </div>

      <div class="md-layout-item">
        <video id="remoteVideo" width="640" height="480" autoPlay playsInline></video>
        <p>Remote Stream</p>
      </div>
    </div>
  </div>
</template>

<script>
  import adapter from 'webrtc-adapter';
  import Janus from "../janus";

  export default {
    name: 'Echo',

    data () {
      return {
        janus: null,
        echotest: null,
        opaqueId: "echotest-"+Janus.randomString(12),
        host: "https://www.xiongbinbin.club:8089/janus",  // "https://" + window.location.hostname + ":8089/janus",
      }
    },

    methods: {
    },

    mounted() {
      Janus.init({
        debug: true,
        dependencies: Janus.useDefaultDependencies({
          adapter: adapter
        }),
        callback: ()=> {
          if(!Janus.isWebrtcSupported()) {
            console.log('is not Supported Webrtc!');
            return;
          }

          this.janus = new Janus({
          server: this.host,
          success: ()=> {
            this.janus.attach({
              plugin: "janus.plugin.echotest",
              opaqueId: this.opaqueId,
              success: (pluginHandle)=> {
                this.echotest = pluginHandle;
                console.log("Plugin attached! (" + this.echotest.getPlugin() + ", id=" + this.echotest.getId() + ")");
                var body = { audio: true, video: true };
                console.log("Sending message:" + body);
                this.echotest.send({ message: body });
                console.log("Trying a createOffer too (audio/video sendrecv)");
                this.echotest.createOffer({
                  media: { data: true },
                  simulcast: false,
                  simulcast2: false,
                  success: (jsep)=>{
                    console.log("Got SDP!"+jsep);
                    this.echotest.send({ message: body, jsep: jsep });
                  },
                  error: (error)=>{
                    console.log("WebRTC error:" + error);
                  }
                });
              },
              error: (error)=> {
                console.log("[error]:" + error);
              },
              consentDialog: (on)=> {
                console.log("[consentDialog]:" + on);
              },
              iceState: (state)=> {
                console.log("[iceState]:" + state);
              },
              mediaState: (medium, on)=> {
                console.log("[mediaState]:" + medium + "_" + on);
              },
              webrtcState: (on)=> {
                console.log('[webrtcState]' + on);
              },
              slowLink: (uplink, lost)=> {
                console.log('[slowLink]:' + uplink + "_" + lost);
              },
              onmessage: (msg, jsep)=> {
                console.log('[onmessage]:' + msg);
                if(jsep) {
                  console.log("SDP:" + jsep);
                  this.echotest.handleRemoteJsep({ jsep: jsep });
                }
              },
              onlocalstream: (stream)=> {
                Janus.attachMediaStream(document.getElementById("localVideo"), stream);
              },
              onremotestream: (stream)=> {
                Janus.attachMediaStream(document.getElementById("remoteVideo"), stream);
              },
              ondataopen: (data)=> { 
                console.log('[ondataopen]:' + data);
              },
              ondata: (data)=> {
                console.log('[ondata]:' + data);
              },
              oncleanup: ()=> {
                console.log('[oncleanup]');
              }
            });
          },
          error: (error)=> {
            console.log(error);
          },
          destroyed: ()=> {
            window.location.reload();
          }
        });
      }});
    },
  }
</script>

<style lang="scss" scoped>
.echo {
  text-align: center;
}

video {
  width: 640px;
  height: 480px;  
  margin-top: 40px;
  margin-bottom: 20px;
  background-color: #111111;
}
</style>