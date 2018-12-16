<template>
  <div class='app-navbar'>
    <router-link
      class='nav-item'
      v-for='route in routes'
      :to='route.path'
      :class="{'is-selected': $route.name === route.name }"
    >{{ route.name }} </router-link>
    <a class='nav-item' href='https://events.engineers.my/' target='_blank'>Events</a>
    <a class='nav-item' href='https://articles.engineers.my/' target='_blank'>Articles</a>
    <a class='nav-item' href='https://status.engineers.my/' target='_blank'>Status</a>
  </div>
</template>

<script>
import { routes } from '../../router/index'
const filteredRoutes = routes.filter((d) => {
  return d.name !== 'index'
})
export default {
  name: 'app-navbar',
  data () {
    return {
      routes: filteredRoutes
    }
  }
}
// https://engineersmy.herokuapp.com/
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '../../styles/theme.scss';
.app-navbar {
  display: block;
  line-height: 60px;
  font-size: 20px;
  font-weight: bold;
  // background: $wild-sand;
  text-align: center;
  padding: $block-10 0;
}
.nav-item {
  text-transform: capitalize;
  display: inline-block;
  text-decoration: none;
  color: #202020;
  padding: 0 $block-20;
}
.nav-item.is-selected {
  border-bottom: 4px solid $anakiwa;
}
</style>
