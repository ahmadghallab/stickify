<template>
  <div class="row justify-content-center">
    <div class="col">
      <Loader v-if="retrieveStudySetLoader" />
      <div class="default-card fade-up" v-else>
        <h4 class="font-weight-bold">{{ studySetTitle }}</h4>
        <p class="text-muted mb-0">
          {{ cards.length ? cards.length + ' cards' : 'No cards yet' }}
        </p>
      </div>
      <Loader v-if="listCardsLoader" />
      <div class="fade-up" v-else>
        <div v-if="cards.length">
          <transition name="card-slide" mode="out-in">
            <div :key="cardIdx">
              <div class="card__header text-white flashcard d-flex justify-content-center" 
                v-bind:class="cards[cardIdx].color">
                <transition name="card-slide" mode="out-in">
                  <div class="align-self-center" >
                    <transition name="card-slide" mode="out-in">
                      <h1 class="align-self-center text-center mb-0 font-weight-bold" v-if="flipTermDefinition" key="1">{{ cards[cardIdx].term }}</h1>
                      <h1 class="align-self-center mb-0 text-center"  
                        key="2" 
                        v-html="formatDefinition(cards[cardIdx].definition)" v-else></h1>
                    </transition>
                  </div>
                </transition>
              </div>
              <div class="card__footer">
                <div class="row justify-content-between">
                  <div class="col-auto align-self-center">
                    <small class="text-muted font-weight-bold d-block ">Answer With </small>
                    <a href="javascript:void(0)" 
                      class="badge badge-pill grey mr-2 text-white"
                      v-bind:class="{'green': answerWithTD}"
                      @click="answerWith()">term</a>
                    <a href="javascript:void(0)" 
                      class="badge badge-pill grey text-white"
                      v-bind:class="{'green': !answerWithTD}"
                      @click="answerWith()">definition</a>
                  </div>
                  <div class="col-auto">
                    <a href="javascript:void(0)"
                      @click="updateCardModal()" 
                      class="circle circle-md grey text-white mr-1">edit</a>
                    <a href="javascript:void(0)"
                      @click="deleteCardConfirmModal()" 
                      class="circle circle-md text-white grey mr-2">del</a>
                    <a href="javascript:void(0)" 
                      class="circle circle-md grey align-middle"
                      @click="flipCard"
                      v-shortkey="['space']" @shortkey="flipCard">
                      <svg class="icon" viewBox="0 0 512 512">
                        <path d="m63.613281 190.464844c-11.371093-11.371094-17.613281-26.4375-17.613281-42.464844s6.242188-31.09375 17.574219-42.425781l100.324219-99.757813c7.832031-7.785156 20.496093-7.75 28.285156.082032 7.789062 7.832031 7.75 20.496093-.082032 28.28125l-100.285156 99.71875c-3.734375 3.738281-5.816406 8.757812-5.816406 14.101562 0 5.339844 2.082031 10.363281 5.859375 14.140625l100.242187 99.675781c7.832032 7.789063 7.871094 20.453125.082032 28.285156-3.910156 3.929688-9.046875 5.898438-14.183594 5.898438-5.101562 0-10.199219-1.9375-14.101562-5.816406zm428.386719-62.464844h-327c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h327c11.046875 0 20-8.953125 20-20s-8.953125-20-20-20zm-143.898438 93.816406c-7.832031-7.785156-20.496093-7.75-28.285156.082032-7.789062 7.832031-7.75 20.496093.082032 28.28125l100.242187 99.679687c3.777344 3.773437 5.859375 8.796875 5.859375 14.140625 0 5.339844-2.082031 10.363281-5.816406 14.101562l-100.285156 99.714844c-7.832032 7.789063-7.871094 20.453125-.082032 28.285156 3.910156 3.929688 9.046875 5.898438 14.183594 5.898438 5.097656 0 10.199219-1.9375 14.101562-5.816406l100.324219-99.757813c11.332031-11.332031 17.574219-26.398437 17.574219-42.425781s-6.242188-31.09375-17.613281-42.46875zm18.898438 142.183594c0-11.046875-8.953125-20-20-20h-327c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h327c11.046875 0 20-8.953125 20-20zm0 0"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </transition>
          <div class="row justify-content-between mb-custom">
            <div class="col-auto align-self-center">
              <a href="javascript:void(0)"
                class="circle circle-md grey mr-1"
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
                    <text y="38" x="36" fill="#fff" font-size="18" text-anchor="middle" dominant-baseline="middle" >
                      {{ cardIdx+1 + '/' + cards.length }}
                    </text>
                  </g>
                </svg>
            </div>
            <div class="col-auto align-self-center">
              <a href="javascript:void(0)"
                @click="startShow()"
                v-shortkey="['p']" @shortkey="startShow()" 
                class="circle circle-md mr-2"
                v-bind:class="{
                  'grey': !playCards, 
                  'green': playCards
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
                class="circle circle-md grey">
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
        <span class="verline"></span>
        <div class="fade-up">
          <div class="card__header grey text-white"
            v-bind:class="cardColor">
            <h5 class="mb-0 font-weight-bold">New Card</h5>
          </div>
          <div class="card__footer">
            <form v-on:submit.prevent="createCard()">
              <div class="form-row">
                <div class="form-group col-12">
                  <input id="cardTerm" v-model="cardTerm" 
                    class="form-control" ref="cardTerm"
                    autocomplete="off"
                    placeholder="Enter term">
                </div>
                <div class="form-group col-12">
                  <textarea id="cardDefinition" v-model="cardDefinition" 
                    class="form-control"
                    autocomplete="off" rows="4" style="resize:none;"
                    placeholder="Enter Definition"></textarea>
                </div>
                <div class="form-group col-12">
                  <input type="hidden" v-model="cardColor">
                  <a href="javascript:void(0)" 
                    v-for="(color, idx) in colorPalette" v-bind:key="idx"
                    class="circle circle-md align-top mr-1 mt-1"
                    v-bind:class="color"
                    @click="selectColor(color)">
                    <svg v-if="cardColor == color" viewBox="0 -49 512.00075 512" class="icon">
                      <path d="m190.476562 413.828125c-20.628906 0-40.503906-8.0625-55.347656-22.652344l-129.148437-126.910156c-7.878907-7.742187-7.988281-20.40625-.246094-28.28125 7.742187-7.878906 20.40625-7.992187 28.285156-.25l129.144531 126.910156c8.105469 7.964844 19.246094 11.992188 30.570313 11.050781 11.324219-.945312 21.648437-6.757812 28.324219-15.953124l253.757812-349.492188c6.488282-8.9375 18.996094-10.921875 27.933594-4.433594 8.9375 6.492188 10.921875 19 4.433594 27.9375l-253.757813 349.488282c-13.523437 18.625-34.433593 30.402343-57.371093 32.3125-2.195313.183593-4.394532.273437-6.578126.273437zm0 0"/>
                    </svg>
                  </a>
                </div>
                <div class="col-12 mt-3">
                  <button type="submit" 
                    class="btn grey text-white"
                    v-bind:class="cardColor"
                    :disabled="newCardValidator || creatingCard">
                    {{ creatingCard ? 'Creating' : 'Create' }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- Edit Modal -->
        <Modal v-if="selectedCard == cards[cardIdx].id && toggleUpdateCardModal">
          <div slot="header">
            <div class="card__header" v-bind:class="cards[cardIdx].color">
              <div class="row justify_content-between">
                <div class="col align-self-center">
                  <h5 class="mb-0 text-white font-weight-bold">Edit Card</h5>
                </div>
                <div class="col-auto align-self-center">
                  <a href="javascript:void(0)" 
                  class="circle circle-md transparent-dark text-white"
                  @click="toggleUpdateCardModal = false">
                    <svg class="icon" viewBox="0 0 64 64">
                      <g>
                        <path d="M28.941,31.786L0.613,60.114c-0.787,0.787-0.787,2.062,0,2.849c0.393,0.394,0.909,0.59,1.424,0.59   c0.516,0,1.031-0.196,1.424-0.59l28.541-28.541l28.541,28.541c0.394,0.394,0.909,0.59,1.424,0.59c0.515,0,1.031-0.196,1.424-0.59   c0.787-0.787,0.787-2.062,0-2.849L35.064,31.786L63.41,3.438c0.787-0.787,0.787-2.062,0-2.849c-0.787-0.786-2.062-0.786-2.848,0   L32.003,29.15L3.441,0.59c-0.787-0.786-2.061-0.786-2.848,0c-0.787,0.787-0.787,2.062,0,2.849L28.941,31.786z"/>
                      </g>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div slot="footer">
            <div class="card__footer">
              <form v-on:submit.prevent="updateCard()">
                <div class="form-row">
                  <div class="form-group col-12">
                    <input type="text"
                      v-model="cards[cardIdx].term"
                      class="form-control" id="selectedCardTerm"
                      autocomplete="off" placeholder="Term">
                  </div>
                  <div class="form-group col-12">
                    <textarea id="selectedCardDefinition" 
                      v-model="cards[cardIdx].definition"
                      class="form-control" rows="5" style="resize:none;" 
                      placeholder="Enter Definition"></textarea>
                  </div>
                  <div class="form-group col-12">
                    <input type="hidden" v-model="cards[cardIdx].color">
                    <a href="javascript:void(0)" v-for="(color, idx) in colorPalette" v-bind:key="idx"
                      class="circle circle-md align-top mr-1 mt-1"
                      v-bind:class="color"
                      @click="updateColor(color)">
                      <svg v-if="cards[cardIdx].color == color" viewBox="0 -49 512.00075 512" class="icon">
                        <path d="m190.476562 413.828125c-20.628906 0-40.503906-8.0625-55.347656-22.652344l-129.148437-126.910156c-7.878907-7.742187-7.988281-20.40625-.246094-28.28125 7.742187-7.878906 20.40625-7.992187 28.285156-.25l129.144531 126.910156c8.105469 7.964844 19.246094 11.992188 30.570313 11.050781 11.324219-.945312 21.648437-6.757812 28.324219-15.953124l253.757812-349.492188c6.488282-8.9375 18.996094-10.921875 27.933594-4.433594 8.9375 6.492188 10.921875 19 4.433594 27.9375l-253.757813 349.488282c-13.523437 18.625-34.433593 30.402343-57.371093 32.3125-2.195313.183593-4.394532.273437-6.578126.273437zm0 0"/>
                      </svg>
                    </a>
                  </div>
                  <div class="col-12 mt-3">
                    <button type="submit" class="btn text-white"
                      v-bind:class="cards[cardIdx].color"
                      :disabled="updateCardValidator || updatingCard">
                      {{ updatingCard ? 'Updating' : 'Update' }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal>
        <!-- Delete Modal -->
        <Modal width="550px" v-if="selectedCard == cards[cardIdx].id && toggleDeleteCardModal">
          <div slot="body">
            <div class="default-card">
              <h4 class="font-weight-bold mb-3">{{ cards[cardIdx].term }}</h4>
              <p class="text-muted">
                You are about to delete this card. No one will be able to access this card ever again.
              </p>
              <p class="font-weight-bold my-4">Are you absolutely positive? There's no undo.</p>
              <div class="text-center">
                <button @click="deleteCard()"
                  class="btn red btn-lg btn-block text-white mb-3" :disabled="deletingCard">
                  {{ deletingCard ? 'Deleting' : 'Yes, delete' }}
                </button>
                <a href="javascript:void(0)" @click="toggleDeleteCardModal = false"
                  class="font-weight-bold">Cancel</a>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>
<script>
import appService from '../app.service.js'
import Loader from '../components/Loader.vue'
import Modal from '../components/Modal.vue'

export default {
  components: {
    Loader,
    Modal
  },
  data () {
    return {
      id: this.$route.params.id,
      studySetTitle: null,
      cardTerm: null,
      cardDefinition: null,
      cardColor: null,
      creatingCard: false,
      updatingCard: false,
      deletingCard: false,
      cardIdx: 0,
      listCardsLoader: true,
      retrieveStudySetLoader: true,
      flipTermDefinition: false,
      answerWithTD: true,
      playCards: false,
      slider: null,
      fliper: null,
      selectedCard: null,
      toggleUpdateCardModal: false,
      toggleDeleteCardModal: false,
      colorPalette: ['purple', 'green', 'blue', 'brown', 'red', 'orange'],
      cards: []
    }
  },
  computed: {
    newCardValidator () {
      return (this.cardTerm 
        && this.cardDefinition 
        && this.cardColor
        && this.cardTerm.length < 50
        && this.cardDefinition.length < 250) ? false : true
    },
    updateCardValidator () {
      return (this.cards[this.cardIdx].term 
        && this.cards[this.cardIdx].definition 
        && this.cards[this.cardIdx].color
        && this.cards[this.cardIdx].term.length < 50
        && this.cards[this.cardIdx].definition.length < 250) ? false : true
    },
    cardProgress () {
      const progressPercent = (this.cardIdx+1)/this.cards.length
      return 201.06192982974676 * (1 - progressPercent)
    },
    start () {
      return (this.cardIdx == -1) ? true : false
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
        }, 10000)
        this.slider = setInterval(() => {
          this.changeCard('next')
        }, 20000)
      } else {
        clearInterval(this.slider)
        clearInterval(this.fliper)
      }
    },
    end: function (val) {
      if (val) this.cardIdx = 0
    },
    start: function (val) {
      if (val) this.cardIdx = this.cards.length - 1
    }
  },
  methods: {
    formatDefinition (cardDefinition) {
      return cardDefinition.replace(/\*([^*]+)\*/g, "<b>$1</b>")
        .replace(/!([^!]+)!/g, "<em>$1</em>")
        .replace(/-([^-]+)-/g, "<u>$1</u>")
        .replace(/#([^#]+)#/g, "<small>$1</small>")
        .replace(/\^([^^]+)\^/g, "<sup>$1</sup>")
        .replace(/_([^_]+)_/g, "<sub>$1</sub>")
        .replace(/@([^@]+)@/g, "<span class='badge badge-pill transparent-dark'>$1</span>")
        .replace(/.+?[.?!](\s|$)/g, (txt) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })
        
    },
    answerWith() {
      this.answerWithTD = !this.answerWithTD
      this.flipTermDefinition = !this.answerWithTD
    },
    startShow () {
      this.playCards = !this.playCards
    },
    flipCard () {
      if (!this.end) this.flipTermDefinition = !this.flipTermDefinition
    },
    selectColor(color) {
      this.cardColor = color
    },
    updateColor(color) {
      this.cards[this.cardIdx].color = color
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
        this.cards.push(data)
        this.creatingCard = false
        this.$refs.cardTerm.focus()
      }).catch()
    },
    updateCardModal() {
      this.selectedCard = this.cards[this.cardIdx].id
      this.toggleUpdateCardModal = true
    },
    updateCard() {
      this.updatingCard = true
      appService.updateCard({
        id: this.selectedCard,
        term: this.cards[this.cardIdx].term,
        definition: this.cards[this.cardIdx].definition,
        color: this.cards[this.cardIdx].color
      }).then(() => {
        this.toggleUpdateCardModal = false
        this.updatingCard = false
      })
    },
    deleteCardConfirmModal() {
      this.selectedCard = this.cards[this.cardIdx].id
      this.toggleDeleteCardModal = true
    },
    deleteCard() {
      this.deletingCard = true
      appService.deleteCard(this.selectedCard)
      .then(() => {
        this.toggleDeleteCardModal = false
        this.deletingCard = false
        this.cards.splice(this.cardIdx, 1)
      })
    },
    shuffle () {
      for (let i = this.cards.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * i)
        
        let temp = this.cards[i]
        this.$set(this.cards, i, this.cards[randomIndex])
        this.$set(this.cards, randomIndex, temp)
      }
    },
    changeCard (dir) {
      this.flipTermDefinition = !this.answerWithTD
      if (dir == 'next') {
        this.cardIdx = this.cardIdx + 1
      }  
      if (dir == 'prev') {
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