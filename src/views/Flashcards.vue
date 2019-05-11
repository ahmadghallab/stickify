<template>
  <div>
    <Loader v-if="retrieveStudySetLoader" />
    <div class="default-card fade-up" v-else>
      <h2 class="font-weight-bold">{{ studySetTitle }}</h2>
      <p class="text-muted mb-0">
        {{ cards.length ? cards.length + ' term' : 'No terms yet' }}
      </p>
       <div class="mt-3">
          <small class="mr-2 text-muted font-italic">answer with</small>
          <a href="javascript:void(0)" 
            class="circle circle-md green mr-1 text-white"
            v-bind:class="{'inactive': !answerWithTD}"
            @click="answerWith()">term</a>
          <a href="javascript:void(0)" 
            class="circle circle-md green text-white ml-1"
            v-bind:class="{'inactive': answerWithTD}"
            @click="answerWith()">defn</a>
          <router-link :to="{ name: 'test', params: {id: id} }" 
            class="circle circle-md coral align-middle text-white ml-3">
            test
          </router-link>
        </div>
    </div>
    <Loader v-if="listCardsLoader" />
    <div class="fade-up" v-else>
      <div v-if="cards.length">
        <span class="verline"></span>
        <div class="card__header light flashcard white-space d-flex justify-content-center">
          <transition name="card-slide-right" mode="out-in">
            <div :key="cardIdx" class="align-self-center">
              <div class="text-center" v-if="end">
                <svg width="100" viewBox="0 0 72 72">
                  <path fill="#6E8189" d="M51.066 8.161c-1.554 2.688-2.037 6.505-2.037 6.505s3.063-2.327 4.615-5.016c2.514-4.354-.066-5.843-2.578-1.489zm-7.412-2.39c-.002 3.104 1.486 6.652 1.486 6.652s1.49-3.549 1.492-6.652c.001-5.028-2.98-5.028-2.978 0zm14.242 6.504c-2.689 1.551-5.016 4.615-5.016 4.615s3.816-.484 6.505-2.036c4.355-2.514 2.865-5.094-1.489-2.579z"></path><path fill="#BD8700" d="M41.453 20.017c-.637-1.689-4.455-.704-3.934 3.934.558 4.939 1.596 5.424.596 8.355L19.006 13.197c-3.491-3.492-8.427 1.443-4.94 4.936l-1.93-1.93c-3.549-3.55-8.486 1.389-4.938 4.939l.906.908c-3.443-3.445-8.383 1.494-4.936 4.938l5.908 5.91c-3.422-3.422-8.361 1.516-4.937 4.938l18.082 18.113c5.915 5.914 14.565 9.287 22.32 1.533 12.93-12.928 1.668-24.842-3.088-37.465z"></path><path fill="#FDCA47" d="M43.255 20.857c.589 5.21 1.683 5.721.629 8.814l-3.379-2.874L19.904 47.4l7.214 7.215c6.241 6.24 15.366 9.798 23.547 1.617 13.639-13.639 1.759-26.208-3.26-39.525-.672-1.782-4.7-.742-4.15 4.15z"></path><path fill="#CC9200" d="M43.896 17.285c1.004-.6 2.137-.407 2.467.465 4.934 13.095 16.488 25.467 3.902 38.845.135-.127.27-.232.401-.364 13.637-13.637 1.757-26.206-3.262-39.523-.455-1.204-2.438-1.116-3.508.577z"></path><path fill="#FDCA47" d="M18.513 14.722L37.632 33.84l4.946-4.948L23.724 9.513c-3.685-3.686-8.894 1.524-5.211 5.209z"></path><path fill="#CC9200" d="M17.884 9.925c1.322-.893 3.2-.967 4.796.627L42.838 30.71l1.042-1.041L23.722 9.51c-2.091-2.091-4.669-1.318-5.838.415z"></path><path fill="#FDCA47" d="M11.266 17.894l22.197 22.197 5.211-5.21-22.198-22.197c-3.745-3.746-8.954 1.464-5.21 5.21z"></path><path fill="#CC9200" d="M10.592 13.051c1.324-.889 3.22-.949 4.838.672l16.991 16.99 1.042-1.041-16.991-16.991c-2.124-2.124-4.714-1.367-5.88.37z"></path><path fill="#FDCA47" d="M7.015 24.061l20.197 20.198 5.209-5.21-20.198-20.197c-3.633-3.634-8.843 1.576-5.208 5.209z"></path><path fill="#FDCA47" d="M8.041 35.506l16.044 16.046 5.21-5.209L13.25 30.296c-3.611-3.611-8.821 1.599-5.209 5.21z"></path><path fill="#CC9200" d="M6.422 19.303c1.325-.89 3.221-.949 4.84.671l15.95 15.949 1.041-1.042L11.96 18.625c-2.212-2.368-4.371-1.058-5.538.678zm1.043 11.462c1.323-.89 3.218-.95 4.84.671l10.738 10.739 1.041-1.041-10.968-10.959c-2.127-2.125-4.485-1.147-5.651.59z"></path><path fill="#CC9200" d="M25.126 40.091s-1.137 1.137-1.734 4.516c0 0-.033-3.442-2.464-5.871 3.062 2.492 4.198 1.355 4.198 1.355zm4.58-5.842s-1.988 1.424-2.842 3.411c0 0 .568-2.272-1.419-4.832 2.555 1.99 4.261 1.421 4.261 1.421zm5.319-5.098s-1.917.354-3.385 2.865c0 0 .638-2.203-1.444-4.287 2.082 2.084 4.829 1.422 4.829 1.422z"></path>
                </svg>
                <h2 class="font-weight-bold mt-3">Nice work</h2>
                <p class="mb-4 text-muted">You just studied {{ cards.length }} terms</p>
                <button class="btn green text-white"
                  v-shortkey="['space']" 
                  @shortkey="cardIdx = 0"
                  @click="cardIdx = 0">Start over</button>
              </div>
              <div class="align-self-center" v-else>
                <transition name="card-slide-up" mode="out-in">
                  <h1 class="align-self-center font-weight-bold text-center mb-0" 
                    v-if="flipTermDefinition" 
                    key="1">{{ cards[cardIdx].term }}
                  </h1>
                  <h1 class="align-self-center mb-0 text-center"  
                    key="2" 
                    v-html="formatText(cards[cardIdx].definition)" v-else>
                  </h1>
                </transition>
              </div>
            </div>
          </transition>
        </div>
        <div class="progressBar">
          <div class="progressBarChild coral"
            v-bind:style="{ width: progressBar + '%' }">
          </div>
        </div>
        <div class="card__footer">
          <div class="row justify-content-between">
            <div class="col-auto align-self-center">
              <a href="javascript:void(0)"
                class="circle circle-md green mr-1 align-middle"
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
                class="circle circle-md green mx-1 align-middle"
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
                @click="startShow()"
                v-shortkey="['p']" @shortkey="startShow()" 
                class="circle circle-md align-middle mr-1 green"
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
                class="circle circle-md green align-middle mx-1"
                @click="flipCard"
                v-shortkey="['space']" @shortkey="flipCard">
                <svg class="icon" viewBox="0 0 512 512">
                  <path d="m63.613281 190.464844c-11.371093-11.371094-17.613281-26.4375-17.613281-42.464844s6.242188-31.09375 17.574219-42.425781l100.324219-99.757813c7.832031-7.785156 20.496093-7.75 28.285156.082032 7.789062 7.832031 7.75 20.496093-.082032 28.28125l-100.285156 99.71875c-3.734375 3.738281-5.816406 8.757812-5.816406 14.101562 0 5.339844 2.082031 10.363281 5.859375 14.140625l100.242187 99.675781c7.832032 7.789063 7.871094 20.453125.082032 28.285156-3.910156 3.929688-9.046875 5.898438-14.183594 5.898438-5.101562 0-10.199219-1.9375-14.101562-5.816406zm428.386719-62.464844h-327c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h327c11.046875 0 20-8.953125 20-20s-8.953125-20-20-20zm-143.898438 93.816406c-7.832031-7.785156-20.496093-7.75-28.285156.082032-7.789062 7.832031-7.75 20.496093.082032 28.28125l100.242187 99.679687c3.777344 3.773437 5.859375 8.796875 5.859375 14.140625 0 5.339844-2.082031 10.363281-5.816406 14.101562l-100.285156 99.714844c-7.832032 7.789063-7.871094 20.453125-.082032 28.285156 3.910156 3.929688 9.046875 5.898438 14.183594 5.898438 5.097656 0 10.199219-1.9375 14.101562-5.816406l100.324219-99.757813c11.332031-11.332031 17.574219-26.398437 17.574219-42.425781s-6.242188-31.09375-17.613281-42.46875zm18.898438 142.183594c0-11.046875-8.953125-20-20-20h-327c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h327c11.046875 0 20-8.953125 20-20zm0 0"/>
                </svg>
              </a>
              <a href="javascript:void(0)"
                @click="shuffle()"
                v-shortkey="['h']" @shortkey="shuffle()" 
                class="circle circle-md green ml-1 align-middle">
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
            <div class="col-auto align-self-center" v-if="authorized">
              <a href="javascript:void(0)"
                @click="updateCardModal()"
                v-shortkey="['e']" @shortkey="updateCardModal()" 
                class="circle circle-md coral text-white mr-1">edit</a>
              <a href="javascript:void(0)"
                @click="deleteCardConfirmModal()" 
                class="circle circle-md text-white coral ml-1">del</a>
            </div>
          </div>
        </div>
        <!-- Edit Card Modal -->
        <Modal v-if="!end && toggleUpdateCardModal && selectedCard == cards[cardIdx].id ">
          <div slot="header">
            <div class="card__header blue">
              <div class="row justify_content-between">
                <div class="col align-self-center">
                  <h4 class="mb-0 text-white font-weight-bold">Edit Card</h4>
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
                      :disabled="updatingCard"
                      v-on:keydown.enter.shift="updateCard()"
                      autocomplete="off" placeholder="Term">
                  </div>
                  <div class="form-group col-12">
                    <textarea id="selectedCardDefinition" 
                      v-model="cards[cardIdx].definition"
                      class="form-control" rows="4" 
                      :disabled="updatingCard"
                      v-on:keydown.enter.shift="updateCard()"
                      placeholder="Enter Definition"></textarea>
                  </div>
                  <div class="col-12 mt-2">
                    <button type="submit" class="btn green text-white"
                      :disabled="updateCardValidator || updatingCard">
                      {{ updatingCard ? 'Updating' : 'Update' }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal>
        <!-- Delete Card Modal -->
        <Modal width="550px" v-if="!end && toggleDeleteCardModal && selectedCard == cards[cardIdx].id">
          <div slot="body">
            <div class="default-card">
              <h4 class="font-weight-bold mb-3" v-html="formatText(cards[cardIdx].term)"></h4>
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
      <div v-if="authorized">
        <span class="verline"></span>
        <div class="default-card">
          <form v-on:submit.prevent="createCard()">
            <div class="form-row">
              <div class="form-group col-12">
                <input id="cardTerm" v-model="cardTerm" 
                  class="form-control"
                  autocomplete="off"
                  :disabled="creatingCard"
                  v-on:keydown.enter.shift="createCard()"
                  placeholder="Enter term">
              </div>
              <div class="form-group col-12">
                <textarea id="cardDefinition" v-model="cardDefinition" 
                  class="form-control"
                  autocomplete="off" rows="4"
                  :disabled="creatingCard"
                  v-on:keydown.enter.shift="createCard()"
                  placeholder="Enter Definition"></textarea>
              </div>
              <div class="col-12">
                <button type="submit" 
                  class="btn green text-white"
                  :disabled="newCardValidator || creatingCard">
                  {{ creatingCard ? 'Creating' : 'Create' }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import appService from '../app.service.js'
import Loader from '../components/Loader.vue'
import Modal from '../components/Modal.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Loader,
    Modal
  },
  data () {
    return {
      id: this.$route.params.id,
      studySetTitle: null,
      studySetUser: null,
      cardTerm: null,
      cardDefinition: null,
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
      cards: []
    }
  },
  computed: {
    ...mapGetters(['userId']),
    authorized () {
      return (this.userId == this.studySetUser) ? true : false
    },
    newCardValidator () {
      return (this.cardTerm 
        && this.cardDefinition 
        && this.cardTerm.length < 50
        && this.cardDefinition.length < 250) ? false : true
    },
    updateCardValidator () {
      return (this.cards[this.cardIdx].term 
        && this.cards[this.cardIdx].definition
        && this.cards[this.cardIdx].term.length < 50
        && this.cards[this.cardIdx].definition.length < 250) ? false : true
    },
    progressBar () {
      if (this.end) return 100
      return ((this.cardIdx+1)/this.cards.length) * 100
    },
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
    listCards () {
      appService.listCards(this.id).then(data => {
        this.cards = data
        this.listCardsLoader = false
      })
    },
    retrieveStudySet () {
      appService.retrieveStudySet(this.id).then(data => {
        this.studySetTitle = data.title
        this.studySetUser = data.user
        this.retrieveStudySetLoader = false
      })
    },
    createCard() {
      this.creatingCard = true
      appService.createCard({
        studyset: this.id,
        term: this.cardTerm,
        definition: this.cardDefinition
      }).then((data) => {
        this.cardTerm = null
        this.cardDefinition = null
        this.cards.push(data)
        this.creatingCard = false
      }).catch()
    },
    updateCardModal() {
      if (this.authorized) {
        this.selectedCard = this.cards[this.cardIdx].id
        this.toggleUpdateCardModal = true
      }
    },
    updateCard() {
      this.updatingCard = true
      appService.updateCard({
        id: this.selectedCard,
        term: this.cards[this.cardIdx].term,
        definition: this.cards[this.cardIdx].definition
      }).then(() => {
        this.toggleUpdateCardModal = false
        this.updatingCard = false
      })
    },
    deleteCardConfirmModal() {
      if (this.authorized) {
        this.selectedCard = this.cards[this.cardIdx].id
        this.toggleDeleteCardModal = true
      }
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
      this.cardIdx = 0
    },
    changeCard (dir) {
      this.flipTermDefinition = !this.answerWithTD
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
