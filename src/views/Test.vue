<template>
  <div class="row justify-content-center">
    <div class="col">
      <Loader v-if="retrieveStudySetLoader" />
      <div class="default-card fade-up" v-else>
        <h2 class="font-weight-bold">{{ studySetTitle }}</h2>
        <p class="text-muted mb-0">
          {{ cards.length ? cards.length + ' term' : 'No terms yet' }}
        </p>
      </div>
      <Loader v-if="listCardsLoader" />
      <div class="fade-up" v-else>
        <div v-if="cards.length">
          <span class="verline"></span>
          <transition name="card-slide-right" mode="out-in">
            <div v-if="end" key="1">
              <div class="card__header blue text-white pxy-custom text-center">
                <div v-if="resultPercent == 100">
                  <svg width="64" height="64">
                    <path fill="#785647" d="M32 62c-30.666 0-30.666-5.999 0-5.999 30.667 0 30.667 5.999 0 5.999z"></path><path fill="#785647" d="M9 54h46v5.002H9z"></path><path fill="#8A6859" d="M32 57c-30.666 0-30.666-6 0-6 30.667 0 30.667 6 0 6z"></path><path fill="#785647" d="M32 56c-25.332 0-25.332-4.799 0-4.799 25.334 0 25.334 4.799 0 4.799z"></path><path fill="#785647" d="M13 50.4h38v3.2H13z"></path><path fill="#8A6859" d="M32 52.801C6.668 52.801 6.668 48 32 48c25.334 0 25.334 4.801 0 4.801z"></path><path fill="#F59E01" d="M45.325 25.36c4.876 1.577 13.441-3.916 13.441-13.996 0-6.163-4.101-6.24-4.101-3.089 0 3.321-3.151 2.128-3.151-1.183C51.515-.941 62 .713 62 10.77c0 15.602-14.287 20.244-18.132 17.079-.845-.435-.557-3.141 1.457-2.489z"></path><path fill-rule="evenodd" clip-rule="evenodd" fill="#F9C802" d="M51.75 6.57c-.146.719 1.438-3.078 4.166-3.96 1.178-.38-3.181-.92-4.166 3.96z"></path><path fill="#F9C802" d="M18.676 25.36c-4.877 1.577-13.441-3.916-13.441-13.996 0-6.163 4.101-6.24 4.101-3.089 0 3.321 3.151 2.128 3.151-1.183C12.486-.941 2 .713 2 10.77c0 15.602 14.287 20.244 18.133 17.079.844-.435.556-3.141-1.457-2.489z"></path><path fill="#F9C802" d="M34.659 39.968C34.659 34.392 53 30.322 53 4.198c0-2.931-42-2.931-42 0 0 26.124 18.342 30.194 18.342 35.77 0 6.962-13.246 4.84-13.246 10.386 0 2.195 31.811 2.195 31.811 0-.001-5.546-13.248-3.424-13.248-10.386z"></path><path fill="#FEEC9A" d="M14.468 7.919c.765-.902 9.152-.824 14.757-1.224 3.757-.268-10.136.009-17.043-1.445.347 15.262 7.092 22.712 12.299 27.448C15.203 24.105 13 9.652 14.468 7.919zm4.079 42.513c0-3.786 6.984-3.6 10-6.878-4.25 3.097-11.432 2.625-11.432 6.654 0 .419 1.432.565 1.432.224z"></path><path fill="#D47706" d="M51 3.938c0 2.083-38 2.083-38 0s38-2.084 38 0z"></path><path fill="#F59E01" d="M34.659 39.969c0-5.574 18.997-9.848 18.452-35.732-.288.922-3.408 1.429-8.139 1.795-.564 24.476-12.313 28.494-12.313 33.938 0 6.962 8.247 4.839 8.247 10.385 0 .965-5.559 1.506-11.792 1.623 8.788.149 18.792-.391 18.792-1.623 0-5.547-13.247-3.424-13.247-10.386z"></path><path fill="#AB5C10" d="M13 3.938c0 .833 6.066 1.331 13.35 1.499a8.059 8.059 0 0 1-.951-2.973C18.547 2.651 13 3.142 13 3.938z"></path><path fill-rule="evenodd" clip-rule="evenodd" fill="#FEEC9A" d="M2.93 7.788c-.198.913 1.945-3.906 5.634-5.026 1.592-.483-4.301-1.168-5.634 5.026z"></path>
                  </svg>
                  <h2 class="my-4">
                    <b>Congratulations</b>, you've learned everything
                  </h2>
                  <p class="my-4">Keep reviewing to make sure they stick</p>
                </div>
                <div v-else-if="resultPercent == 0">
                  <svg width="64" height="64" viewBox="0 0 64 64">
                    <circle fill="#FDCA47" cx="32" cy="32" r="30"></circle><path fill="#F9B700" d="M51.654 9.346A29.869 29.869 0 0 1 59 29c0 16.569-13.432 30-30 30a29.871 29.871 0 0 1-19.654-7.345C14.846 57.99 22.952 62 32 62c16.568 0 30-13.431 30-30 0-9.047-4.012-17.152-10.346-22.654z"></path><path fill-rule="evenodd" clip-rule="evenodd" fill="#FFE8BB" d="M6.418 20.5C5.302 24.242 13 11 25 6.084c5.834-2.391-13.832-1.5-18.582 14.416z"></path><circle fill="#302C3B" cx="42.387" cy="24.677" r="4.999"></circle><path fill="#302C3B" d="M18.867 23.748a5 5 0 1 0 1.735 9.849 5 5 0 0 0-1.735-9.849zm25.389 17.236c-6.754-1.632-16.871-.215-21.526 6.138-.834 1.137-.022 2.335 1.144 1.559 4.455-2.965 13.092-4.799 19.311-3.322 2.375.564 3.557-3.748 1.071-4.375z"></path>
                  </svg>
                  <h2 class="my-4"><b>Unfortunately</b>, you've learned nothing</h2>
                  <p class="my-4">Don't give up. Keep trying</p>
                </div>
                <div v-else>
                  <svg width="100" viewBox="0 0 72 72">
                    <g>
                      <circle class="progress__value" stroke="rgba(255,255,255,0.2)" stroke-width="5" transform="rotate(-90 36 36)" stroke-linecap="round" stroke-dashoffset="0" stroke-dasharray="201.06192982974676" cx="36" cy="36" r="32" fill="none"></circle>
                      <circle class="progress__value" stroke="#fff" stroke-width="5" stroke-linecap="round" transform="rotate(-90 36 36)" stroke-dasharray="201.06192982974676" v-bind:stroke-dashoffset="resultPercentSVG" cx="36" cy="36" r="32" fill="none"></circle>
                      <text y="38" x="36" fill="#fff" font-size="22" text-anchor="middle" dominant-baseline="middle">
                        {{ resultPercent }}
                      </text>
                    </g>
                  </svg>
                  <h2 class="my-4">You have got <b>{{ correctCount }} correct</b> out of <b>{{ cards.length }}</b></h2>
                  <p class="my-4">Don't give up. Keep trying</p>
                </div>
                <button type="button" 
                  class="btn green text-white"
                  v-shortkey="['space']" 
                  @shortkey="shuffle" 
                  @click="shuffle"
                  >Start over</button>
              </div>
              <div class="card__footer text-center">
                <p class="text-muted mb-0">Keep reviewing and trying your most missed terms to make sure they stick</p>
              </div>
            </div>
            <div v-else-if="result" key="2">
              <div class="card__header pxy-custom text-center light">
                <div v-if="correct">
                  <svg width="64" height="64" viewBox="0 0 64 64"><circle fill="#FDCA47" cx="32" cy="32" r="30"></circle><path fill="#F9B700" d="M51.654 9.346A29.874 29.874 0 0 1 59 29c0 16.568-13.432 30-30 30a29.865 29.865 0 0 1-19.654-7.346C14.846 57.99 22.952 62 32 62c16.568 0 30-13.432 30-30 0-9.047-4.012-17.152-10.346-22.654z"></path><path fill-rule="evenodd" clip-rule="evenodd" fill="#FFE8BB" d="M6.418 20.5C5.302 24.242 13 11 25 6.084c5.834-2.391-13.832-1.5-18.582 14.416z"></path><circle fill="#302C3B" cx="20.5" cy="24.5" r="5"></circle><circle fill="#302C3B" cx="43.5" cy="24.5" r="5"></circle><path fill="#302C3B" d="M51 37.789c0-.893-.529-2.01-2.037-2.297C45.092 34.756 39.373 34 32 34h-.002c-7.369 0-13.091.756-16.961 1.492-1.508.287-2.037 1.404-2.037 2.297C13 45.867 19.271 54 31.998 54H32c12.729 0 19-8.133 19-16.211z"></path><path fill="#1A1626" d="M33.844 42c-.578-.012-1.471.455-1.145 1.688.163.621 1.191 1.375 1.191 2.381 0 2.045-3.783 2.045-3.783 0 0-1.006 1.027-1.76 1.193-2.381.327-1.232-.566-1.699-1.146-1.688-1.574.037-4.155 1.498-4.155 3.969C25.999 48.748 28.686 51 32 51c3.311 0 5.998-2.252 5.998-5.031 0-2.471-2.582-3.932-4.154-3.969z"></path><path fill="#F46C60" d="M24 50.082c2.313 1.051 4.979 1.668 8 1.668s5.688-.617 8-1.668c-2.23-1.139-4.887-1.832-8-1.832-3.115 0-5.768.693-8 1.832z"></path><path fill="#FFF" d="M46.504 38.037C43.996 37.66 38.688 37 31.998 37c-6.688 0-11.993.66-14.503 1.037-1.479.221-1.568.76-1.466 1.52.062.451.156 1 .302 1.588.162.652.291.824 1.447.836 2.221.027 26.222.027 28.444 0 1.156-.012 1.281-.184 1.445-.836.145-.588.242-1.137.301-1.588.106-.76.012-1.299-1.464-1.52z"></path></svg>
                  <h1 class="font-weight-bold mt-4">You are doing great</h1>
                  <p class="mb-4">Well done. That's the right answer</p>
                </div>
                <div v-else>
                  <svg width="64" height="64" viewBox="0 0 64 64">
                    <circle fill="#FDCA47" cx="32" cy="32" r="30"></circle><path fill="#F9B700" d="M51.654 9.346A29.869 29.869 0 0 1 59 29c0 16.569-13.432 30-30 30a29.871 29.871 0 0 1-19.654-7.345C14.846 57.99 22.952 62 32 62c16.568 0 30-13.431 30-30 0-9.047-4.012-17.152-10.346-22.654z"></path><path fill-rule="evenodd" clip-rule="evenodd" fill="#FFE8BB" d="M6.418 20.5C5.302 24.242 13 11 25 6.084c5.834-2.391-13.832-1.5-18.582 14.416z"></path><circle fill="#302C3B" cx="42.387" cy="24.677" r="4.999"></circle><path fill="#302C3B" d="M18.867 23.748a5 5 0 1 0 1.735 9.849 5 5 0 0 0-1.735-9.849zm25.389 17.236c-6.754-1.632-16.871-.215-21.526 6.138-.834 1.137-.022 2.335 1.144 1.559 4.455-2.965 13.092-4.799 19.311-3.322 2.375.564 3.557-3.748 1.071-4.375z"></path>
                  </svg>
                  <h1 class="font-weight-bold mt-4">Study this one</h1>
                  <p class="mb-4 text-muted">Unfortunately. Your answer is incorrect</p>
                </div>
                <button type="button" 
                  class="btn green text-white"
                  v-shortkey="['space']" 
                  @shortkey="next" 
                  @click="next">Continue</button>
              </div>
              <div class="card__footer text-center">
                <div class="white-space">
                  <h2 v-html="formatText(cards[cardIdx].definition)"></h2>
                </div>
                <p class="text-muted my-4 font-weight-bold">goes with</p>
                <h2 class="font-weight-bold">{{ cards[cardIdx].term }}</h2>
              </div>
            </div>
            <div key="3" v-else>
              <div class="text-center mb-custom">
                <span class="circle circle-md coral text-white">
                  {{ cardIdx+1 }}
                </span>
              </div>
              <div class="default-card text-center white-space">
                <h1 class="mb-0"  
                  v-html="formatText(cards[cardIdx].definition)">
                </h1>
              </div>
              <span class="verline"></span>
              <div class="default-card answer-list"
                v-for="(answer, index) in answers" v-bind:key="index"
                v-shortkey="[abc[index]]" 
                @shortkey="selectAnswer(answer.id)"
                @click="selectAnswer(answer.id)">
                <div class="row">
                  <div class="col-auto align-self-center">
                    <span class="circle circle-md green text-white">{{ abc[index] }}</span>
                  </div>
                  <div class="col align-self-center">
                    <h2 class="mb-0">{{ answer.term }}</h2>
                  </div>
                </div>
              </div>
            </div>
          </transition>
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
    Loader
  },
  data () {
    return {
      id: this.$route.params.id,
      studySetTitle: null,
      cardIdx: 0,
      listCardsLoader: true,
      retrieveStudySetLoader: true,
      cards: [],
      answers: [],
      abc: ['a', 'b', 'c' , 'd'],
      colorHl: ['orange-hl', 'green-hl', 'brown-hl', 'pink-hl'],
      result: false,
      correct: null,
      correctCount: 0,
    }
  },
  computed: {
    cardProgress () {
      if (this.end) return 201.06192982974676
      const progressPercent = (this.cardIdx+1)/this.cards.length
      return 201.06192982974676 * (1 - progressPercent)
    },
    resultPercentSVG () {
      const resultPercent = this.correctCount/this.cards.length
      return 201.06192982974676 * (1 - resultPercent)
    },
    resultPercent () {
      return ((this.correctCount/this.cards.length) * 100).toFixed(0)
    },
    end () {
      return (this.cardIdx == this.cards.length) ? true : false
    }
  },
  methods: {
    formatText (cardText) {
      return cardText.replace(
        /\*([^*]+)\*/g, "<b>$1</b>").replace(
        /@([^@]+)@/g, "<em>$1</em>").replace(
        /#([^#]+)#/g, "<span style='font-size:50%;'>$1</span>").replace(
        /\^([^^]+)\^/g, "<sup>$1</sup>").replace(
        /_([^_]+)_/g, "<sub>$1</sub>").replace(
        /y\[+([^\][]+)]+/g, "<span class='yellow-hl'>$1</span>").replace(
        /k\[+([^\][]+)]+/g, "<span class='pink-hl'>$1</span>").replace(
        /t\[+([^\][]+)]+/g, "<span class='teal-hl'>$1</span>").replace(
        /g\[+([^\][]+)]+/g, "<span class='green-hl'>$1</span>").replace(
        /b\[+([^\][]+)]+/g, "<span class='green-hl'>$1</span>").replace(
        /n\[+([^\][]+)]+/g, "<span class='brown-hl'>$1</span>").replace(
        /p\[+([^\][]+)]+/g, "<span class='green-hl'>$1</span>").replace(
        /o\[+([^\][]+)]+/g, "<span class='orange-hl'>$1</span>")
    },
    selectAnswer (answerId) {
      this.result = true
      if (this.cards[this.cardIdx].id == answerId) {
        this.correct = true
        this.correctCount = this.correctCount + 1
      } else {
        this.correct = false
      }
    },
    next () {
      this.result = false
      this.cardIdx = this.cardIdx + 1
      this.getAnswers()
    },
    getAnswers () {
      if (!this.end) {
        this.answers = []
        let randomCardIndex 
        let randomAnswerIndex
        let prevTerm = []
        for (let i = this.cards.length - 1; i > 0; i--) {
          randomCardIndex = Math.floor(Math.random() * i)
          if (!prevTerm.includes(this.cards[randomCardIndex].term) && this.cards[randomCardIndex].term != this.cards[this.cardIdx].term) {
            this.answers.push(this.cards[randomCardIndex])
          }
          if (this.answers.length == 3) break
          prevTerm.push(this.cards[randomCardIndex].term)
        }
        randomAnswerIndex = Math.floor(Math.random() * this.answers.length + 1)
        this.answers.splice(randomAnswerIndex, 0, this.cards[this.cardIdx])
      }
    },
    listCards () {
      appService.listCards(this.id).then(data => {
        this.cards = data
        this.shuffle()
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
      this.getAnswers()
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
</style>