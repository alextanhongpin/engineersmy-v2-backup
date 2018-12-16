<template>
  <div v-if='isVisible'>
    <i class='fa fa-fw fa-circle-o-notch fa-3x fa-spin'></i>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app-loading',
  computed: {
    ...mapGetters('loader', [
      'isVisible'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '../../styles/colors.scss';

div {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba($cod-gray, .5);
  text-align: center;
  line-height: 100vh;
  z-index: 3000;
  color: white;
}
</style>
