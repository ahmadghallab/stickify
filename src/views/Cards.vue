<template>
  <div>
    <div class="row justify-content-center mb-4">
      <div class="col-md-8">
        <div class="default-card white">
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
        </div>
      </div>
    </div>
    <Loader v-if="listCardsLoader" />
    <div v-else>
      <div class="card-deck" v-if="cards.results.length">
        <div v-for="(card, idx) in cards.results" 
          v-bind:key="idx"
          class="card px-0 py-0" 
          @click="toggleTermDefinition(idx)">
          <div class="card__header py-2" v-bind:class="card.color"></div>
          <div class="card-body card__footer d-flex justify-content-center">
            <h5 class="align-self-center" 
              v-if="TermDefinitionIdx == idx && flipTermDefinition">{{ card.definition.slice(0,255) }}</h5>
            <h4 class="card-title font-weight-bold align-self-center"
                v-else>{{ card.term }}</h4>
          </div>
        </div>
      </div>
      <div class="text-center" v-else>
        <h6 class="font-weight-bold text-muted">No cards yet</h6>
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
      cardTerm: null,
      cardDefinition: null,
      cardColor: null,
      creatingCard: false,
      page: 1,
      listCardsLoader: true,
      TermDefinitionIdx: null,
      flipTermDefinition: false,
      colorPalette: ['yellow', 'orange', 'green', 'brown', 'blue', 'dark-blue', 'purple', 'red', 'pink', 'teal', 'gray'],
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
    toggleTermDefinition(idx) {
      if (this.TermDefinitionIdx != idx) {
        this.TermDefinitionIdx = idx
      }
      this.flipTermDefinition = !this.flipTermDefinition
    },
    listCards () {
      appService.listCards(this.id, this.page).then(data => {
        this.cards = data
        this.listCardsLoader = false
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
  }
}
</script>