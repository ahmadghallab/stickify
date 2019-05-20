<template>
  <div class="wrapper">
    <Loader v-if="retrieveStudySetLoader" />
    <div class="default-card fade-up" v-else>
      <h1 class="font-weight-lighter">{{ studySetTitle }}</h1>
      <p class="text-muted font-weight-light mb-0">
        {{ cards.length ? cards.length + ' term' : 'No terms yet' }}
      </p>
      <div class="mt-3">
        <router-link :to="{ name: 'flashcards', params: {id: id} }" 
        class="circle circle-md purple mr-1 text-white">learn</router-link>
        <router-link :to="{ name: 'test', params: {id: id} }" 
        class="circle circle-md purple-outline ml-1 text-white"
        @click="deleteCardConfirmModal(card.id)">test</router-link>
      </div>
    </div>
    <Loader v-if="listCardsLoader" />
    <div class="fade-up" v-else>
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
                  class="btn purple text-white"
                  :disabled="newCardValidator || creatingCard">
                  {{ creatingCard ? 'Creating' : 'Create' }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div v-if="cards.length">
        <span class="verline"></span>
        <div class="default-card" v-for="(card, index) in cards" 
          v-bind:key="index">
          <div class="row justify-content-between">
            <div class="col align-self-center">
              <h2 class="font-weight-lighter">{{ card.term }}</h2>
              <p class="font-weight-light text-muted mb-0" v-html="formatText(card.definition)"></p>
            </div>
            <div class="col-auto align-self-center" v-if="authorized">
              <a href="javascript:void(0)" 
              class="circle circle-md purple mr-1 text-white"
              @click="updateCardModal(card.id)">edit</a>
              <a href="javascript:void(0)" 
              class="circle circle-md purple-outline ml-1 text-white"
              @click="deleteCardConfirmModal(card.id)">del</a>
            </div>
          </div>
          <!-- Edit Card Modal -->
          <Modal v-if="toggleUpdateCardModal && selectedCard == card.id ">
            <div slot="header">
              <div class="card__header purple">
                <div class="row justify_content-between">
                  <div class="col align-self-center">
                    <h2 class="mb-0 text-white font-weight-lighter">Edit Card</h2>
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
                <form v-on:submit.prevent="updateCard(index)">
                  <div class="form-row">
                    <div class="form-group col-12">
                      <input type="text"
                        v-model="card.term"
                        class="form-control" id="selectedCardTerm"
                        :disabled="updatingCard"
                        v-on:keydown.enter.shift="updateCard()"
                        autocomplete="off" placeholder="Term">
                    </div>
                    <div class="form-group col-12">
                      <textarea id="selectedCardDefinition" 
                        v-model="card.definition"
                        class="form-control" rows="4" 
                        :disabled="updatingCard"
                        v-on:keydown.enter.shift="updateCard()"
                        placeholder="Enter Definition"></textarea>
                    </div>
                    <div class="col-12 mt-2">
                      <button type="submit" class="btn purple text-white"
                        :disabled="updateCardValidator(index) || updatingCard">
                        {{ updatingCard ? 'Updating' : 'Update' }}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Modal>
          <!-- Delete Card Modal -->
          <Modal width="550px" v-if="toggleDeleteCardModal && selectedCard == card.id">
            <div slot="body">
              <div class="default-card pxy-custom">
                <h1 class="font-weight-lighter mb-4">{{ card.term }}</h1>
                <p class="text-muted font-weight-light">
                  You are about to delete this card. No one will be able to access this card ever again.
                </p>
                <p class="font-weight-bold my-4">Are you absolutely positive? There's no undo.</p>
                <button type="button" @click="deleteCard(index)"
                  class="btn purple-outline mr-1" :disabled="deletingCard">
                  {{ deletingCard ? 'Deleting' : 'Yes, delete' }}</button>
                <button type="button"
                  class="btn purple text-white ml-1" 
                  @click="toggleDeleteCardModal = false">No, cancel</button>
              </div>
            </div>
          </Modal>
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
      listCardsLoader: true,
      retrieveStudySetLoader: true,
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
      return index => (this.cards[index].term 
        && this.cards[index].definition
        && this.cards[index].term.length < 50
        && this.cards[index].definition.length < 250) ? false : true
    },
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
    updateCardModal(cardId) {
      this.selectedCard = cardId
      this.toggleUpdateCardModal = true
    },
    updateCard(index) {
      this.updatingCard = true
      appService.updateCard({
        id: this.selectedCard,
        term: this.cards[index].term,
        definition: this.cards[index].definition
      }).then(() => {
        this.toggleUpdateCardModal = false
        this.updatingCard = false
      })
    },
    deleteCardConfirmModal(cardId) {
      this.selectedCard = cardId
      this.toggleDeleteCardModal = true
    },
    deleteCard(index) {
      this.deletingCard = true
      appService.deleteCard(this.selectedCard)
      .then(() => {
        this.toggleDeleteCardModal = false
        this.deletingCard = false
        this.cards.splice(index, 1)
      })
    },
  },
  created() {
    this.listCards()
    this.retrieveStudySet()
  }
}
</script>
