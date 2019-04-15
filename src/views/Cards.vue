<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <Loader v-if="retrieveStudySetLoader" />
      <div class="default-card" v-else>
        <h4 class="font-weight-bold">{{ studySetTitle }}</h4>
        <p class="text-muted mb-0">{{ cards.results.length ? cards.results.length + ' cards' : 'No cards yet' }}</p>
      </div>
      <span class="verline"></span>
      <div class="text-center mb-custom">
        <span class="circle circle-md text-white green font-weight-bold">new</span>
      </div>
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
        <div v-if="cards.results.length">
          <div v-for="(card, idx) in cards.results" 
          v-bind:key="idx">
            
            <div class="text-center mb-custom">
              <span class="circle circle-md text-white" v-bind:class="card.color">{{ idx + 1 }}</span>
            </div>
            <div class="card__header" v-bind:class="card.color">
              <h4 class="text-white mb-0 font-weight-bold">{{ card.term }}</h4>
            </div>
            <div class="card__footer">
              <h5 class="mb-0">{{ card.definition }}</h5>
            </div>
            <span class="verline"></span>
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
      page: 1,
      listCardsLoader: true,
      retrieveStudySetLoader: true,
      flipTermDefinition: false,
      colorPalette: ['orange', 'deep-orange', 'green', 'brown', 'blue', 'indigo', 'purple', 'deep-purple', 'red', 'pink', 'teal', 'blue-gray'],
      cards: {}
    }
  },
  computed: {
    newCardValidator () {
      return (this.cardTerm && this.cardDefinition && this.cardColor) ? false : true
    },
  },
  methods: {
    selectColor(color) {
      this.cardColor = color
    },
    listCards () {
      appService.listCards(this.id, this.page).then(data => {
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
        this.cards.results.unshift(data)
        this.creatingCard = false
      }).catch()
    }
  },
  created() {
    this.listCards()
    this.retrieveStudySet()
  }
}
</script>