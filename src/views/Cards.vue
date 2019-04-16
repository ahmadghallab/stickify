<template>
  <div class="row justify-content-center">
    <div class="col-md-10">
      <!-- <Loader v-if="retrieveStudySetLoader" />
      <div class="default-card" v-else>
        <h4 class="font-weight-bold">{{ studySetTitle }}</h4>
        <p class="text-muted mb-0">{{ cards.length ? cards.length + ' cards' : 'No cards yet' }}</p>
      </div> -->
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
          <transition name="flip" mode="out-in">
            <div v-if="flipTermDefinition" key="1">
              <div class="card__header"></div>
              <div class="card__body text-white flashcard d-flex justify-content-center" v-bind:class="cards[cardIdx].color">
                <h2 class="align-self-center">{{ cards[cardIdx].definition }}</h2>
              </div>
              <div class="card__footer"></div>
            </div>
            <div v-else key="2">
              <div class="card__header"></div>
              <div class="card__body text-white flashcard d-flex justify-content-center" v-bind:class="cards[cardIdx].color">
                <h1 class="align-self-center">{{ cards[cardIdx].term }}</h1>
              </div>
              <div class="card__footer"></div>
            </div>
          </transition>
          <div class="row justify-content-between mb-custom">
            <div class="col-auto align-self-center">
              <a href="javascript:void(0)" @click="changeCard('prev')"
                class="circle circle-md green text-white mr-1">prev</a>
              <a href="javascript:void(0)" @click="changeCard('next')"
                class="circle circle-md green text-white ml-1">next</a>
            </div>
            <div class="col-auto align-self-center">
              <svg width="52" viewBox="0 0 72 72">
                <g>
                  <use class="progress__value" stroke="#b7c0c7" stroke-width="5" transform="rotate(-90 36 36)" stroke-linecap="round" stroke-dashoffset="0" stroke-dasharray="201.06192982974676" xlink:href="#circle">
                    <circle id="circle" cx="36" cy="36" r="32" fill="#b7c0c7"></circle>
                  </use>
                  <use class="progress__value" stroke="#4caf50" stroke-width="5" stroke-linecap="round" transform="rotate(-90 36 36)" stroke-dasharray="201.06192982974676" v-bind:stroke-dashoffset="cardProgress" xlink:href="#circle">
                    <circle id="circle" cx="36" cy="36" r="32" fill="none"></circle>
                  </use>
                  <text y="38" x="36" fill="#fff" font-size="18" text-anchor="middle" dominant-baseline="middle">{{ cardNo + '/' + cards.length }}</text>
                </g>
              </svg>
            </div>
            <div class="col-auto align-self-center">
              <a href="javascript:void(0)" class="circle circle-md grey mr-2">
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
              <a href="javascript:void(0)" class="circle circle-md grey mr-2">
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
              <a href="javascript:void(0)" @click="flipTermDefinition = !flipTermDefinition" class="circle circle-md green">
                <svg class="icon" viewBox="0 0 22 17">
                  <path d="M.746 11.46l4.57 4.571v-3.398h7.97v-2.285h-7.97V6.949l-4.57 4.512zm15.938-7.968h-7.97v2.285h7.97v3.399l4.57-4.512-4.57-4.57v3.398z"></path>
                </svg>
              </a>
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
      cardNo: 1,
      cardIdx: 0,
      listCardsLoader: true,
      retrieveStudySetLoader: true,
      flipTermDefinition: false,
      colorPalette: ['orange', 'deep-orange', 'green', 'brown', 'blue', 'indigo', 'purple', 'deep-purple', 'red', 'pink', 'teal', 'gray'],
      cards: []
    }
  },
  computed: {
    newCardValidator () {
      return (this.cardTerm && this.cardDefinition && this.cardColor) ? false : true
    },
    cardProgress () {
      let progressPercent = this.cardNo/this.cards.length
      return 201.06192982974676 * (1 - progressPercent)
    },
  },
  methods: {
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
    changeCard (dir) {
      if (dir == 'next') {
        this.cardIdx = this.cardIdx + 1
      } else {
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
.flip-enter-active {
  transition: all 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}
.flip-leave-active {
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.flip-enter, .flip-leave-to {
  -webkit-transform: scaleY(0) translateZ(0);
          transform: scaleY(0) translateZ(0);
  opacity: 0;
}
.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}
</style>