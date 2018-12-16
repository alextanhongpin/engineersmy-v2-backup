<template>
  <div>
    <br v-for="count in counts"/>
  </div>
</template>

<script>
export default {
  name: 'break',
  props: ['rows'],
  computed: {
    counts () {
      return Array(parseInt(this.rows, 10)).fill(0)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped></style>
