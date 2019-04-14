<template>
  <div>
    <div class="row justify-content-center mb-4">
      <div class="col-md-8">
        <div class="default-card white">
          <form v-on:submit.prevent="createStudySet()">
            <div class="form-row">
              <div class="form-group col-12">
                <input id="setTitle" 
                  v-model="studySetTitle"
                  class="form-control"
                  autocomplete="off" 
                  placeholder="New Study Set; Subject, chapter, unit">
              </div>
              <div class="col-12">
                <button type="button" class="btn primary" :disabled="newStudySetValidator || creatingStudySet">
                  {{ creatingStudySet ? 'Creating' : 'Create' }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Loader v-if="listStudySetsLoader" />
    <div class="card-deck" v-else>
      <div class="text-center" v-if="!studysets.results.length">
        <h6 class="mb-2">No studysets yet</h6>
        <p class="text-muted">use the form above to create a new studyset.</p>
      </div>
      <div class="card" v-for="(studyset, idx) in studysets.results" v-bind:key="idx">
        <div class="card-body">
          <h4 class="card-title font-weight-bold">{{ studyset.title }}</h4>
          <p class="card-text text-muted">21 terms</p>
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
      studySetTitle: null,
      creatingStudySet: false,
      page: 1,
      listStudySetsLoader: true,
      studysets: {}
    }
  },
  computed: {
    newStudySetValidator () {
      return (this.studySetTitle) ? false : true
    },
  },
  methods: {
    listStudySets () {
      appService.listStudySets(this.page).then(data => {
        this.studysets = data
        this.listStudySetsLoader = false
      })
    },
    createStudySet() {
      this.creatingStudySet = true
      appService.createStudySet({
        user: 2,
        title: this.studySetTitle
      }).then((data) => {
        this.studySetTitle = null
        this.studysets.results.unshift(data)
        this.creatingStudySet = false
      })
    }
  },
  created() {
    this.listStudySets()
  }
}
</script>
