<template>
  <header class='app-header'>
    <router-link to='/' class='header-icon'>
      <slot name='icon'></slot>
    </router-link> 
    <h2 class='header-title'>Engineers.my</h2>
  </header>
</template>

<script>
export default {
  name: 'app-header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '../../styles/theme.scss';

header {
  background: linear-gradient(30deg, $dodger-blue, pink);
  color: white;
  height: 60px;
  line-height: 60px;
  padding: 0 $block-20;
}
.header-icon {
  display: none;
}
.header-icon,
.header-title {
  display: inline-block;
  vertical-align: middle;
}
.header-title {
  font-weight: bold;
}
</style>
