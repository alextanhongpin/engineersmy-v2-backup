<template>
  <div>
    <transition-group name='app-notification' tag='div'>
      <div
        v-for='(model, index) in data'
        class='notification'
        v-on:mouseenter='pause(model.id)'
        v-on:mouseleave='start(model.id)'
        v-on:click='remove(model.id)'
        :style='{top: 10 + (index * 70) + "px"}'
        :key='model.id'
      > 
        <div class='title text-bold h4'><i class='fa fa-fw fa-check-circle-o'></i> {{model.title}} </div>
        <div class='description h5' v-html='model.description'></div>
      </div>
      
    </transition-group>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'app-notification',
  props: ['collection'],
  beforeCreate () {
    this.timer = {}
  },
  beforeMount () {
    this.data.map((model) => {
      this.start(model.id)
    })
  },
  computed: {
    ...mapGetters('notification', [
      'data'
    ])
  },
  methods: {
    ...mapActions('notification', [
      'remove',
      'start',
      'pause'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '../../styles/colors.scss';

.notification {
  position: fixed;
  top: 10px;
  right: 10px;
  background: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 1);
  color: $cod-gray;
  width: 300px;
  border-radius: 7px;
  padding: 10px;
  cursor: default;
  z-index: 2500;
}
.notification:hover {
  background: $silver;
}

.app-notification-enter {
  opacity: 0;
  transform: translateX(100%) scale(.95);
}
.app-notification-enter-to {
  transform: translateX(0) scale(1);
  opacity: 1;
}
.app-notification-enter-active {
  transition: .174s all ease-in;
}
.app-notification-leave {
}
.app-notification-leave-to {
  opacity: 0;
  transform: translateX(100%); 
}
.app-notification-leave-active {
  transition: .174s all ease-out;
}


@keyframes toast {
  0% {
    transform: translateX(100%) scale(0.95);
    opacity: .05;
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}
</style>
