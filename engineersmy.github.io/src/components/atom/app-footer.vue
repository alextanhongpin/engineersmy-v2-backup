<template>
  <footer class='app-footer'>
  <div class="fb-like" 
      data-href="https://www.facebook.com/EngineersMY-110921772845688/" 
      data-layout="standard" 
      data-action="like" 
      data-size="large" 
      data-show-faces="false" 
      data-share="true">
  </div>
  </footer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'app-footer',
  computed: {
    ...mapGetters('locale', ['locale', 'languages'])
  },
  methods: {
    ...mapActions('locale', ['setLocale']),
    selectLanguage (evt) {
      this.setLocale(evt.currentTarget.value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '../../styles/colors.scss';
footer {
  height: 100px;
  background: $mercury;;
  color: white;
  line-height: 50px;
  text-align: right;
  width: 100%;
}
.footer-item {
  display: inline-block;
  padding: 0 10px;
}
</style>
