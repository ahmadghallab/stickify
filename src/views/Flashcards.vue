<template>
<div class="flashcards-wrapper">
  <div class="flashcard d-flex justify-content-center white-space">
    <Loader v-if="listCardsLoader" />
    <div v-else-if="cards.length" class="fade-up align-self-center">
      <transition name="card-slide-right" mode="out-in">
        <div :key="cardIdx">
          <div v-if="end" class="text-center">
            <svg width="100" viewBox="0 0 72 72">
              <path fill="#6E8189" d="M51.066 8.161c-1.554 2.688-2.037 6.505-2.037 6.505s3.063-2.327 4.615-5.016c2.514-4.354-.066-5.843-2.578-1.489zm-7.412-2.39c-.002 3.104 1.486 6.652 1.486 6.652s1.49-3.549 1.492-6.652c.001-5.028-2.98-5.028-2.978 0zm14.242 6.504c-2.689 1.551-5.016 4.615-5.016 4.615s3.816-.484 6.505-2.036c4.355-2.514 2.865-5.094-1.489-2.579z"></path><path fill="#BD8700" d="M41.453 20.017c-.637-1.689-4.455-.704-3.934 3.934.558 4.939 1.596 5.424.596 8.355L19.006 13.197c-3.491-3.492-8.427 1.443-4.94 4.936l-1.93-1.93c-3.549-3.55-8.486 1.389-4.938 4.939l.906.908c-3.443-3.445-8.383 1.494-4.936 4.938l5.908 5.91c-3.422-3.422-8.361 1.516-4.937 4.938l18.082 18.113c5.915 5.914 14.565 9.287 22.32 1.533 12.93-12.928 1.668-24.842-3.088-37.465z"></path><path fill="#FDCA47" d="M43.255 20.857c.589 5.21 1.683 5.721.629 8.814l-3.379-2.874L19.904 47.4l7.214 7.215c6.241 6.24 15.366 9.798 23.547 1.617 13.639-13.639 1.759-26.208-3.26-39.525-.672-1.782-4.7-.742-4.15 4.15z"></path><path fill="#CC9200" d="M43.896 17.285c1.004-.6 2.137-.407 2.467.465 4.934 13.095 16.488 25.467 3.902 38.845.135-.127.27-.232.401-.364 13.637-13.637 1.757-26.206-3.262-39.523-.455-1.204-2.438-1.116-3.508.577z"></path><path fill="#FDCA47" d="M18.513 14.722L37.632 33.84l4.946-4.948L23.724 9.513c-3.685-3.686-8.894 1.524-5.211 5.209z"></path><path fill="#CC9200" d="M17.884 9.925c1.322-.893 3.2-.967 4.796.627L42.838 30.71l1.042-1.041L23.722 9.51c-2.091-2.091-4.669-1.318-5.838.415z"></path><path fill="#FDCA47" d="M11.266 17.894l22.197 22.197 5.211-5.21-22.198-22.197c-3.745-3.746-8.954 1.464-5.21 5.21z"></path><path fill="#CC9200" d="M10.592 13.051c1.324-.889 3.22-.949 4.838.672l16.991 16.99 1.042-1.041-16.991-16.991c-2.124-2.124-4.714-1.367-5.88.37z"></path><path fill="#FDCA47" d="M7.015 24.061l20.197 20.198 5.209-5.21-20.198-20.197c-3.633-3.634-8.843 1.576-5.208 5.209z"></path><path fill="#FDCA47" d="M8.041 35.506l16.044 16.046 5.21-5.209L13.25 30.296c-3.611-3.611-8.821 1.599-5.209 5.21z"></path><path fill="#CC9200" d="M6.422 19.303c1.325-.89 3.221-.949 4.84.671l15.95 15.949 1.041-1.042L11.96 18.625c-2.212-2.368-4.371-1.058-5.538.678zm1.043 11.462c1.323-.89 3.218-.95 4.84.671l10.738 10.739 1.041-1.041-10.968-10.959c-2.127-2.125-4.485-1.147-5.651.59z"></path><path fill="#CC9200" d="M25.126 40.091s-1.137 1.137-1.734 4.516c0 0-.033-3.442-2.464-5.871 3.062 2.492 4.198 1.355 4.198 1.355zm4.58-5.842s-1.988 1.424-2.842 3.411c0 0 .568-2.272-1.419-4.832 2.555 1.99 4.261 1.421 4.261 1.421zm5.319-5.098s-1.917.354-3.385 2.865c0 0 .638-2.203-1.444-4.287 2.082 2.084 4.829 1.422 4.829 1.422z"></path>
            </svg>
            <h3 class="font-weight-bold mt-3">Nice work</h3>
            <p class="mb-4 text-muted font-weight-light">You just studied {{ cards.length }} terms. Are you ready for a quick test?</p>
            <span class="text-muted font-italic"></span>
            <router-link :to="{ name: 'test', params: {id: id} }" 
              class="btn purple text-white mr-2">Yes</router-link>
            <button 
              class="btn purple text-white ml-2"
              @click="cardIdx = 0">No, start over</button>
          </div>
          <div v-else>
            <transition name="card-slide-up" mode="out-in">
              <h3 class="text-center mb-0 font-weight-bold" 
                v-if="flipTermDefinition" 
                key="1">{{ cards[cardIdx].term }}
              </h3>
              <h3 class="mb-0"  
                key="2" 
                v-html="formatText(cards[cardIdx].definition)" v-else>
              </h3>
            </transition>
          </div>
        </div>
      </transition>
    </div>
    <div v-else>
      <h3 class="mb-0 font-weight-bold">No cards yet</h3>
    </div>
  </div>
  <div class="bg-white fixed-bottom fade-up">
      <div class="row justify-content-between bootstrap-nav">
        <div class="col-auto align-self-center">
          <a href="javascript:void(0)"
            class="circle circle-md purple align-middle mr-1"
            v-bind:class="{'inactive': start}"
            @click="changeCard('prev')"
            v-shortkey="['arrowleft']" @shortkey="changeCard('prev')">
           <svg class="icon" viewBox="0 0 512 512">
              <g>
                <path d="M45.833,270.143c-7.797-7.798-7.797-20.487,0.018-28.302L221.145,66.114c7.8-7.82,7.785-20.484-0.035-28.285
                  c-7.821-7.8-20.485-7.785-28.286,0.035L17.549,213.572c-23.395,23.395-23.395,61.462-0.018,84.839l175.293,175.725
                  c3.908,3.917,9.033,5.875,14.161,5.875c5.11,0,10.222-1.947,14.125-5.841c7.82-7.801,7.836-20.465,0.035-28.285L45.833,270.143z"
                  />
              </g>
              <g>
                <path d="M491.999,235.999H128.98c-11.047,0-20.001,8.954-20.001,20.001s8.954,20.001,20.001,20.001h363.018
                  c11.047,0,20.001-8.954,20.001-20.001S503.045,235.999,491.999,235.999z"/>
              </g>
            </svg>
          </a>
          <a href="javascript:void(0)"
            class="circle circle-md purple align-middle ml-1"
            v-bind:class="{'inactive': end}"
            @click="changeCard('next')"
            v-shortkey="['arrowright']" @shortkey="changeCard('next')">
            <svg class="icon" viewBox="0 0 512 512">
              <g>
                <path d="M494.469,213.589L319.176,37.864c-7.802-7.821-20.465-7.835-28.286-0.035c-7.82,7.801-7.836,20.465-0.035,28.285
                  l175.311,175.744c7.797,7.798,7.797,20.487-0.018,28.302L290.855,445.886c-7.8,7.82-7.785,20.484,0.035,28.285
                  c3.904,3.894,9.016,5.84,14.126,5.84c5.126,0,10.253-1.959,14.161-5.876l175.275-175.707
                  C517.846,275.033,517.846,236.966,494.469,213.589z"/>
              </g>
              <g>
                <path d="M383.019,235.999H20.001C8.954,235.999,0,244.954,0,256s8.954,20.001,20.001,20.001h363.018
                  c11.047,0,20.001-8.954,20.001-20.001S394.066,235.999,383.019,235.999z"/>
              </g>
            </svg>
          </a>
        </div>
        <div class="col-auto align-self-center">
          <a href="javascript:void(0)" 
            class="circle circle-md purple align-middle"
            @click="flipCard"
            v-shortkey="['space']" @shortkey="flipCard">
            <svg class="icon" viewBox="0 0 512 512">
              <path d="m63.613281 190.464844c-11.371093-11.371094-17.613281-26.4375-17.613281-42.464844s6.242188-31.09375 17.574219-42.425781l100.324219-99.757813c7.832031-7.785156 20.496093-7.75 28.285156.082032 7.789062 7.832031 7.75 20.496093-.082032 28.28125l-100.285156 99.71875c-3.734375 3.738281-5.816406 8.757812-5.816406 14.101562 0 5.339844 2.082031 10.363281 5.859375 14.140625l100.242187 99.675781c7.832032 7.789063 7.871094 20.453125.082032 28.285156-3.910156 3.929688-9.046875 5.898438-14.183594 5.898438-5.101562 0-10.199219-1.9375-14.101562-5.816406zm428.386719-62.464844h-327c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h327c11.046875 0 20-8.953125 20-20s-8.953125-20-20-20zm-143.898438 93.816406c-7.832031-7.785156-20.496093-7.75-28.285156.082032-7.789062 7.832031-7.75 20.496093.082032 28.28125l100.242187 99.679687c3.777344 3.773437 5.859375 8.796875 5.859375 14.140625 0 5.339844-2.082031 10.363281-5.816406 14.101562l-100.285156 99.714844c-7.832032 7.789063-7.871094 20.453125-.082032 28.285156 3.910156 3.929688 9.046875 5.898438 14.183594 5.898438 5.097656 0 10.199219-1.9375 14.101562-5.816406l100.324219-99.757813c11.332031-11.332031 17.574219-26.398437 17.574219-42.425781s-6.242188-31.09375-17.613281-42.46875zm18.898438 142.183594c0-11.046875-8.953125-20-20-20h-327c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h327c11.046875 0 20-8.953125 20-20zm0 0"/>
            </svg>
          </a>
          <a href="javascript:void(0)"
            @click="startShow()"
            v-shortkey="['p']" @shortkey="startShow()" 
            class="circle circle-md align-middle mx-2 purple"
            v-bind:class="{
              'inactive': !playCards,
            }">
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
            class="circle circle-md purple align-middle">
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
      cardIdx: 0,
      listCardsLoader: true,
      retrieveStudySetLoader: true,
      flipTermDefinition: false,
      playCards: false,
      slider: null,
      fliper: null,
      cards: []
    }
  },
  computed: {
    start () {
      return (this.cardIdx == 0) ? true : false
    },
    end () {
      return (this.cardIdx == this.cards.length) ? true : false
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
    },
    end: function (val) {
      if (val) this.playCards = false
    }
  },
  methods: {
    formatText (cardText) {
      return cardText.replace(
        /\*([^*]+)\*/g, "<b>$1</b>").replace(
        /@([^@]+)@/g, "<em>$1</em>").replace(
        /\^([^^]+)\^/g, "<sup>$1</sup>").replace(
        /_([^_]+)_/g, "<sub>$1</sub>").replace(
        /h\[+([^\][]+)]+/g, "<span class='yellow-hl'>$1</span>")
    },
    startShow () {
      this.playCards = !this.playCards
    },
    flipCard () {
      if (!this.end) this.flipTermDefinition = !this.flipTermDefinition
    },
    listCards () {
      appService.listCards(this.id).then(data => {
        this.cards = data
        this.listCardsLoader = false
      })
    },
    retrieveStudySet () {
      appService.retrieveStudySet(this.id).then(data => {
        this.studySetTitle = data.title
        this.retrieveStudySetLoader = false
      })
    },
    shuffle () {
      for (let i = this.cards.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * i)
        
        let temp = this.cards[i]
        this.$set(this.cards, i, this.cards[randomIndex])
        this.$set(this.cards, randomIndex, temp)
      }
      this.cardIdx = 0
    },
    changeCard (dir) {
      this.flipTermDefinition = false
      if (dir == 'next' && !this.end) {
        this.cardIdx = this.cardIdx + 1
      }  
      if (dir == 'prev' && !this.start) {
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
.card-slide-right-enter-active, .card-slide-right-leave-active {
  transition: all .3s ease;
}
.card-slide-right-enter, .card-slide-right-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.card-slide-up-enter-active, .card-slide-up-leave-active {
  transition: all .3s ease;
}
.card-slide-up-enter, .card-slide-up-leave-to {
  transform: translateY(5px);
  opacity: 0;
}
</style>
