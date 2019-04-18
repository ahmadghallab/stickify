<template>
  <div class="row justify-content-center">
    <div class="col">
      <Loader v-if="retrieveStudySetLoader" />
      <div class="default-card" v-else>
        <h4 class="font-weight-bold">{{ studySetTitle }}</h4>
        <p class="text-muted mb-0">{{ cards.length ? cards.length + ' cards' : 'No cards yet' }}</p>
      </div>
      <!-- 
      <div class="text-center mb-custom">
        <span class="circle circle-md text-white green font-weight-bold">new</span>
      </div> -->
      <!-- <div class="default-card">
        <form v-on:submit.prevent="createCard()">
          <div class="form-row">
            <div class="form-group col-12">
              <input id="cardTerm" v-model="cardTerm" 
                class="form-control" 
                placeholder="Enter term">
            </div>
            <div class="form-group col-12">
              <textarea id="cardDefinition" v-model="cardDefinition" 
                class="form-control" 
                placeholder="Enter Definition"></textarea>
            </div>
            <div class="form-group col-12">
              <input type="hidden" v-model="cardColor">
              <a href="javascript:void(0)" v-for="(color, idx) in colorPalette" v-bind:key="idx"
                class="circle circle-sm mr-1 mt-1"
                v-bind:class="[color, {'selected-color': cardColor == color}]"
                @click="selectColor(color)"></a>
            </div>
            <div class="col-12 mt-2">
              <button type="submit" class="btn primary" :disabled="newCardValidator || creatingCard">
                {{ creatingCard ? 'Creating' : 'Create' }}
              </button>
            </div>
          </div>
        </form>
      </div> -->
      <Loader v-if="listCardsLoader" />
      <div v-else>
        <div v-if="cards.length">
          <div class="row justify-content-between mb-custom">
            <div class="col-auto align-self-center">
              <a href="javascript:void(0)"
                class="circle circle-md grey mr-1" 
                v-bind:class="{'inactive': firstCard}"
                @click="changeCard('prev')"
                v-shortkey="['arrowleft']" @shortkey="changeCard('prev')">
                <svg class="icon" viewBox="0 0 512 512">
                  <g>
                    <path d="M379.644,477.872l-207.299-207.73c-7.798-7.798-7.798-20.486,0.015-28.299L379.643,34.128
                      c7.803-7.819,7.789-20.482-0.029-28.284c-7.819-7.803-20.482-7.79-28.284,0.029L144.061,213.574
                      c-23.394,23.394-23.394,61.459-0.015,84.838L351.33,506.127c3.907,3.915,9.031,5.873,14.157,5.873
                      c5.111,0,10.224-1.948,14.128-5.844C387.433,498.354,387.446,485.691,379.644,477.872z"/>
                  </g>
                </svg>
              </a>
              <a href="javascript:void(0)"
                class="circle circle-md grey ml-1"
                v-bind:class="{'inactive': lastCard}"
                @click="changeCard('next')"
                v-shortkey="['arrowright']" @shortkey="changeCard('next')">
                <svg class="icon" viewBox="0 0 512 512">
                  <g>
                    <path d="M367.954,213.588L160.67,5.872c-7.804-7.819-20.467-7.831-28.284-0.029c-7.819,7.802-7.832,20.465-0.03,28.284
                      l207.299,207.731c7.798,7.798,7.798,20.486-0.015,28.299L132.356,477.873c-7.802,7.819-7.789,20.482,0.03,28.284
                      c3.903,3.896,9.016,5.843,14.127,5.843c5.125,0,10.25-1.958,14.157-5.873l207.269-207.701
                      C391.333,275.032,391.333,236.967,367.954,213.588z"/>
                  </g>
                </svg>
              </a>
            </div>
            <div class="col-auto align-self-center">
              <svg width="52" viewBox="0 0 72 72">
                <g>
                  <use class="progress__value" stroke="#b7c0c7" stroke-width="5" transform="rotate(-90 36 36)" stroke-linecap="round" stroke-dashoffset="0" stroke-dasharray="201.06192982974676" xlink:href="#circle">
                    <circle id="circle" cx="36" cy="36" r="32" fill="#b7c0c7"></circle>
                  </use>
                  <use class="progress__value" stroke="#fff" stroke-width="5" stroke-linecap="round" transform="rotate(-90 36 36)" stroke-dasharray="201.06192982974676" v-bind:stroke-dashoffset="cardProgress" xlink:href="#circle">
                    <circle id="circle" cx="36" cy="36" r="32" fill="none"></circle>
                  </use>
                  <text y="38" x="36" fill="#fff" font-size="18" text-anchor="middle" dominant-baseline="middle">{{ cardIdx+1 + '/' + cards.length }}</text>
                </g>
              </svg>
            </div>
            <div class="col-auto align-self-center">
              <a href="javascript:void(0)"
                @click="startShow()"
                v-shortkey="['p']" @shortkey="startShow()" 
                class="circle circle-md mr-2"
                v-bind:class="{'grey': !playCards, 'green': playCards}">
                <svg class="icon" viewBox="0 0 511.999 511.999"   
                  style="enable-background:new 0 0 511.999 511.999;">
                  <g>
                    <path d="M443.86,196.919L141.46,10.514C119.582-2.955,93.131-3.515,70.702,9.016c-22.429,12.529-35.819,35.35-35.819,61.041
                      v371.112c0,38.846,31.3,70.619,69.77,70.829c0.105,0,0.21,0.001,0.313,0.001c12.022-0.001,24.55-3.769,36.251-10.909
                      c9.413-5.743,12.388-18.029,6.645-27.441c-5.743-9.414-18.031-12.388-27.441-6.645c-5.473,3.338-10.818,5.065-15.553,5.064
                      c-14.515-0.079-30.056-12.513-30.056-30.898V70.058c0-11.021,5.744-20.808,15.364-26.183c9.621-5.375,20.966-5.135,30.339,0.636
                      l302.401,186.405c9.089,5.596,14.29,14.927,14.268,25.601c-0.022,10.673-5.261,19.983-14.4,25.56L204.147,415.945
                      c-9.404,5.758-12.36,18.049-6.602,27.452c5.757,9.404,18.048,12.36,27.452,6.602l218.611-133.852
                      c20.931-12.769,33.457-35.029,33.507-59.55C477.165,232.079,464.729,209.767,443.86,196.919z"/>
                  </g>
                </svg>
              </a>
              <a href="javascript:void(0)"
                @click="shuffle()"
                v-shortkey="['h']" @shortkey="shuffle()" 
                class="circle circle-md grey mr-2">
                <svg class="icon" viewBox="0 0 512 512">
                  <g>
                    <path d="M494.246,359.453L432.084,297.8c-7.843-7.778-20.506-7.727-28.284,0.116c-7.778,7.843-7.726,20.506,0.116,28.284
                      l57.268,56.8h-24.406c-57.757,0-111.05-24.989-146.214-68.561c-6.937-8.597-19.529-9.94-28.124-3.003
                      c-8.596,6.937-9.94,19.528-3.003,28.124C302.232,392.588,366.87,423,436.778,423h22.39l-55.252,54.8
                      c-7.842,7.778-7.895,20.441-0.116,28.284c3.911,3.942,9.054,5.916,14.201,5.916c5.09,0,10.184-1.932,14.083-5.8l62.162-61.653
                      C505.695,433.192,512,418.081,512,402S505.695,370.809,494.246,359.453z"/>
                  </g>
                  <g>
                    <path d="M494.246,67.453L432.084,5.8c-7.843-7.778-20.506-7.727-28.284,0.116c-7.778,7.843-7.726,20.506,0.116,28.284L459.168,89
                      h-22.39c-81.666,0-157.271,43.051-197.313,112.351l-8.476,14.671l-13.676-23.671C177.272,123.051,101.666,80,20,80
                      C8.954,80,0,88.954,0,100s8.954,20,20,20c67.426,0,129.761,35.391,162.678,92.362L207.89,256l-25.213,43.638
                      C149.761,356.61,87.426,392,20,392c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20c81.666,0,157.271-43.051,197.313-112.351
                      l30.82-53.342c0.112-0.187,0.221-0.376,0.327-0.567l25.64-44.378C307.017,164.391,369.352,129,436.778,129h24.406l-57.268,56.8
                      c-7.842,7.778-7.895,20.441-0.116,28.284c3.911,3.942,9.054,5.916,14.201,5.916c5.09,0,10.184-1.932,14.083-5.8l62.162-61.653
                      C505.695,141.192,512,126.081,512,110S505.695,78.809,494.246,67.453z"/>
                  </g>
                </svg>
              </a>
              <a href="javascript:void(0)" class="circle circle-md grey"
                @click="flipCard"
                v-shortkey="['space']" @shortkey="flipCard">
                <svg class="icon" viewBox="0 0 512 512">
                  <path d="m63.613281 190.464844c-11.371093-11.371094-17.613281-26.4375-17.613281-42.464844s6.242188-31.09375 17.574219-42.425781l100.324219-99.757813c7.832031-7.785156 20.496093-7.75 28.285156.082032 7.789062 7.832031 7.75 20.496093-.082032 28.28125l-100.285156 99.71875c-3.734375 3.738281-5.816406 8.757812-5.816406 14.101562 0 5.339844 2.082031 10.363281 5.859375 14.140625l100.242187 99.675781c7.832032 7.789063 7.871094 20.453125.082032 28.285156-3.910156 3.929688-9.046875 5.898438-14.183594 5.898438-5.101562 0-10.199219-1.9375-14.101562-5.816406zm428.386719-62.464844h-327c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h327c11.046875 0 20-8.953125 20-20s-8.953125-20-20-20zm-143.898438 93.816406c-7.832031-7.785156-20.496093-7.75-28.285156.082032-7.789062 7.832031-7.75 20.496093.082032 28.28125l100.242187 99.679687c3.777344 3.773437 5.859375 8.796875 5.859375 14.140625 0 5.339844-2.082031 10.363281-5.816406 14.101562l-100.285156 99.714844c-7.832032 7.789063-7.871094 20.453125-.082032 28.285156 3.910156 3.929688 9.046875 5.898438 14.183594 5.898438 5.097656 0 10.199219-1.9375 14.101562-5.816406l100.324219-99.757813c11.332031-11.332031 17.574219-26.398437 17.574219-42.425781s-6.242188-31.09375-17.613281-42.46875zm18.898438 142.183594c0-11.046875-8.953125-20-20-20h-327c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h327c11.046875 0 20-8.953125 20-20zm0 0"/>
                </svg>
              </a>
            </div>
          </div>
          <transition name="card-slide" mode="out-in">
            <div :key="cardIdx">
              <div class="card__header text-white flashcard d-flex justify-content-center" v-bind:class="cards[cardIdx].color">
                <transition name="card-slide" mode="out-in">
                  <h1 class="align-self-center" v-if="flipTermDefinition" key="1">{{ cards[cardIdx].definition.slice(0,255) }}</h1>
                  <h1 class="align-self-center text-center" v-else key="2">{{ cards[cardIdx].term }}</h1>
                </transition>
              </div>
              <div class="card__footer">
                <kbd class="grey">←</kbd> <span class="text-muted mx-2">Prev</span>
                <kbd class="grey">→</kbd> <span class="text-muted mx-2">Next</span>
                <kbd class="grey">space</kbd> <span class="text-muted mx-2">Flip</span>
                <kbd class="grey">p</kbd> <span class="text-muted mx-2">Play</span>
                <kbd class="grey">h</kbd> <span class="text-muted mx-2">Shuffle</span>
              </div>
            </div>
          </transition>
          <div class="default-card" v-for="(card, index) in cards" v-bind:key="index">
            <div class="row">
              <div class="col-auto align-self-center">
                <span class="circle circle-md text-white"
                v-bind:class="card.color">{{ index+1 }}</span>
              </div>
              <div class="col-md-4 align-self-center">
                <h5 class="mb-0 font-weight-bold">{{ card.term }}</h5>
              </div>
              <div class="col align-self-center">
                <p class="mb-0 text-muted">{{ card.definition.slice(0,255) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import appService from '../app.service.js'
import Loader from '../components/Loader.vue'

export default {
  components: {
    Loader,
  },
  data () {
    return {
      id: this.$route.params.id,
      studySetTitle: null,
      cardTerm: null,
      cardDefinition: null,
      cardColor: null,
      creatingCard: false,
      cardIdx: 0,
      listCardsLoader: true,
      retrieveStudySetLoader: true,
      flipTermDefinition: false,
      playCards: false,
      slider: null,
      fliper: null,
      colorPalette: ['orange', 'deep-orange', 'green', 'brown', 'blue', 'indigo', 'purple', 'deep-purple', 'red', 'pink', 'teal', 'gray'],
      cards: []
    }
  },
  watch: {
    playCards: function (val) {
      if (val) {
        this.fliper = setInterval(() => {
          this.flipCard()
        }, 5000)
        this.slider = setInterval(() => {
          this.changeCard('next')
        }, 10000)
      } else {
        clearInterval(this.slider)
        clearInterval(this.fliper)
      }
    }
  },
  computed: {
    newCardValidator () {
      return (this.cardTerm && this.cardDefinition && this.cardColor) ? false : true
    },
    cardProgress () {
      let progressPercent = (this.cardIdx+1)/this.cards.length
      return 201.06192982974676 * (1 - progressPercent)
    },
    firstCard () {
      return (this.cardIdx == 0) ? true : false
    },
    lastCard () {
      return (this.cardIdx + 1 == this.cards.length) ? true : false
    }
  },
  methods: {
    startShow () {
      this.playCards = !this.playCards
    },
    flipCard () {
      this.flipTermDefinition = !this.flipTermDefinition
    },
    selectColor(color) {
      this.cardColor = color
    },
    listCards () {
      appService.listCards(this.id).then(data => {
        this.cards = data.results
        this.listCardsLoader = false
      })
    },
    retrieveStudySet () {
      appService.retrieveStudySet(this.id).then(data => {
        this.studySetTitle = data.title
        this.retrieveStudySetLoader = false
      })
    },
    createCard() {
      this.creatingCard = true
      appService.createCard({
        studyset: this.id,
        term: this.cardTerm,
        definition: this.cardDefinition,
        color: this.cardColor
      }).then((data) => {
        this.cardTerm = null
        this.cardDefinition = null
        this.cardColor = null
        this.cards.unshift(data)
        this.creatingCard = false
      }).catch()
    },
    shuffle () {
      let j, x, i
      for (i = this.cards.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = this.cards[i]
        this.cards[i] = this.cards[j]
        this.cards[j] = x
      }
      this.cardIdx = 0
    },
    changeCard (dir) {
      if (dir == 'next' && !this.lastCard) {
        this.cardIdx = this.cardIdx + 1
      }  
      if (dir == 'prev' && !this.firstCard) {
        this.cardIdx = this.cardIdx - 1
      }
    }
  },
  created() {
    this.listCards()
    this.retrieveStudySet()
  }
}
</script>
<style scoped>
.card-slide-enter-active, .card-slide-leave-active {
  transition: all .3s ease;
}
.card-slide-enter, .card-slide-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>