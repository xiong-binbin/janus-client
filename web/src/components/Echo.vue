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
        callback: function() {
            console.log('----');
        }});
    },
  }
</script>

<style lang="scss" scoped>
</style>