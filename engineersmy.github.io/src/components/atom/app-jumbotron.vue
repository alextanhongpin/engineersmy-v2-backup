<template>
  <div class='app-jumbotron square-wrapper'>
    <div
    v-for='square in squares'
    class='square'
    :style='{
      left: square.left + "px",
      top: square.top + "px",
      background: square.background
    }'
  ></div>
    <div class='app-jumbotron-title'>
      <br>
        <div>

          <h1 class='app-jumbotron-heading'>Engineers.my</h1>

          <br>

          <p class='app-jumbotron-subheading'>An open source community for developers/designers to share, collaborate and improve the tech community in Malaysia.</p>
          <br>
          <br>
          <br>
          <p class='slack-invite-heading'>Join engineers.my Slack Community</p>
          <br>
          <a
            href='https://engineersmy.herokuapp.com/'
            class='button-slack-wrapper'
            title='Join engineers.my slack group here'>
            <img class='button-slack' src="/static/slack.png" alt='slack.png'>
          </a>
        </div>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-jumbotron',
  beforeMount () {
    this.start = null
    this.primaryColor = this.primaryColor
    this.secondaryColor = '#2761ef'
    const width = (window.innerWidth - 40)
    const height = (320 - 40)
    this.squares = Array(20).fill({
      left: (Math.floor(Math.random() * width / 40) * 40),
      top: (Math.floor(Math.random() * height / 40) * 40),
      background: this.primaryColor
    })
  },
  data () {
    return {
      squares: []
    }
  },
  mounted () {
    window.requestAnimationFrame(this.update)
  },
  methods: {
    update (timestamp) {
      if (!this.start) {
        this.start = timestamp
      }
      const width = (window.innerWidth - 40)
      const height = (320 - 40)

      const progress = timestamp - this.start
      if (progress < 2000) {
        window.requestAnimationFrame(this.update)
      }
      // Run every 1 second
      if (progress > 1000) {
        this.squares = this.squares.map((square) => {
          const moveX = Math.random() > 0.5
          const moveY = !moveX
          const movePositive = Math.random() > 0.5

          if (moveX) {
            if (movePositive) {
              const newX = square.left + 40
              if (newX > width) {
                return {
                  left: (Math.floor(Math.random() * width / 40) * 40),
                  top: square.top,
                  background: Math.random() < 0.5 ? this.primaryColor : this.secondaryColor
                }
                // Randomize a new position
              } else {
                return {
                  left: square.left + 40,
                  top: square.top,
                  background: Math.random() < 0.5 ? this.primaryColor : this.secondaryColor
                }
              }
            } else {
              const newX = square.left - 40
              if (newX < 0) {
                return {
                  left: (Math.floor(Math.random() * width / 40) * 40),
                  top: square.top,
                  background: Math.random() < 0.5 ? this.primaryColor : this.secondaryColor
                }
                // Randomize a new position
              } else {
                return {
                  left: square.left - 40,
                  top: square.top,
                  background: Math.random() < 0.5 ? this.primaryColor : this.secondaryColor
                }
              }
            }
          }
          if (moveY) {
            if (movePositive) {
              const newY = square.top + 40
              if (newY > height) {
                return {
                  left: square.left,
                  top: (Math.floor(Math.random() * height / 40) * 40),
                  background: Math.random() < 0.5 ? this.primaryColor : this.secondaryColor
                }
                // Randomize a new position
              } else {
                return {
                  left: square.left,
                  top: square.top + 40,
                  background: Math.random() < 0.5 ? this.primaryColor : this.secondaryColor
                }
              }
            } else {
              const newY = square.top - 40
              if (newY < 0) {
                return {
                  left: square.left,
                  top: (Math.floor(Math.random() * height / 40) * 40),
                  background: Math.random() < 0.5 ? this.primaryColor : this.secondaryColor
                }
                // Randomize a new position
              } else {
                return {
                  left: square.left,
                  top: square.top - 40,
                  background: Math.random() < 0.5 ? this.primaryColor : this.secondaryColor
                }
              }
            }
          }
        })
        this.start = timestamp
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '../../styles/theme.scss';
.app-jumbotron {
  background: $dodger-blue;
  padding: 0 $block-20;
}
.app-jumbotron-title {
  @extend %flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  align-items: center;
  color: white;
  height: 320px;
  position: relative;
  z-index: 10;
  overflow: hidden;
}

.app-jumbotron-heading {
  font-weight: bold;
  font-size: 4em;
}

@media (max-width: 480px) {
  .app-jumbotron-heading  {
    font-size: 2.5em;
  }
}

.app-jumbotron-subheading {
  color: rgba(white, .75);
  max-width: 480px;
  display: inline-block;
  line-height: 1.25em;
}

.slack-invite-heading {
  font-size: 12px;
  font-weight: bold;
}

.button-slack-wrapper {
  background: white;
  display: inline-block;
  padding: $block-10 $block-20;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(black, .25);
  vertical-align: middle;
}

.button-slack {
  height: 20px;
  width: auto;
}

.square-wrapper {
  position: relative;
  overflow: hidden;
}
.square {
  height: 40px;
  width: 40px;
  display: inline-block;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  transition: .174s all cubic-bezier(0.68, -0.55, 0.265, 1.55);
  background: $dodger-blue;
}
</style>
