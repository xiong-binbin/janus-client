<template>
  <div class="echo">
    hello
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
                Janus.log("Plugin attached! (" + this.echotest.getPlugin() + ", id=" + this.echotest.getId() + ")");
                var body = { audio: true, video: true };
                Janus.debug("Sending message:", body);
                this.echotest.send({ message: body });
                Janus.debug("Trying a createOffer too (audio/video sendrecv)");
                this.echotest.createOffer({
                  media: { data: true },
                  simulcast: false,
                  simulcast2: false,
                  success: (jsep)=>{
                    Janus.debug("Got SDP!", jsep);
                    this.echotest.send({ message: body, jsep: jsep });
                  },
                  error: (error)=>{
                    Janus.error("WebRTC error:", error);
                  }
                });
              },
              error: (error)=> {
                console.log('error');
              },
              consentDialog: (on)=> {
                console.log('consentDialog');
              },
              iceState: (state)=> {
                console.log('iceState');
              },
              mediaState: (medium, on)=> {
                console.log('mediaState');
              },
              webrtcState: (on)=> {
                console.log('webrtcState');
              },
              slowLink: (uplink, lost)=> {
                console.log('slowLink');
              },
              onmessage: (msg, jsep)=> {
                console.log('onmessage');
              },
              onlocalstream: (stream)=> {
                console.log('onlocalstream');
              },
              onremotestream: (stream)=> {
                console.log('onremotestream');
              },
              ondataopen: (data)=> {
                console.log('ondataopen');
              },
              ondata: (data)=> {
                console.log('ondata');
              },
              oncleanup: ()=> {
                console.log('oncleanup');
              }
            });
          },
          error: (error)=> {
            Janus.error(error);
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
</style>