<template>
  <div>
    <Loader v-if="retrieveUserLoader" />
    <div class="default-card" v-else>
      <h4 class="font-weight-bold">{{ username }}</h4>
      <p class="text-muted mb-0">
        {{ studysets.results.length ? studysets.results.length + ' studyset' : 'No studysets yet' }}
      </p>
    </div>
    <span class="verline"></span>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card__header grey text-white">
          <h5 class="mb-0 font-weight-bold">New Study Set</h5>
        </div>
        <div class="card__footer">
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
                <button type="submit" class="btn grey text-white" :disabled="newStudySetValidator || creatingStudySet">
                  {{ creatingStudySet ? 'Creating' : 'Create' }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <span class="verline"></span>
    <Loader v-if="listStudySetsLoader" />
    <div class="card-deck" v-else>
      <div class="text-center" v-if="!studysets.results.length">
        <h6 class="mb-2">No studysets yet</h6>
        <p class="text-muted">use the form above to create a new studyset.</p>
      </div>
      <div class="card studyset" v-for="(studyset, idx) in studysets.results" v-bind:key="idx">
        <div class="card-body">
          <router-link :to="{ name: 'cards', params: {id: studyset.id} }">
            <h4 class="card-title font-weight-bold">{{ studyset.title }}</h4>
          </router-link>
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
      id: this.$route.params.id,
      username: null,
      studySetTitle: null,
      creatingStudySet: false,
      listStudySetsLoader: true,
      retrieveUserLoader: true,
      studysets: {}
    }
  },
  computed: {
    newStudySetValidator () {
      return (this.studySetTitle) ? false : true
    },
  },
  methods: {
    listUserStudySets () {
      appService.listUserStudySets(this.id).then(data => {
        this.studysets = data
        this.listStudySetsLoader = false
      })
    },
    createStudySet() {
      this.creatingStudySet = true
      appService.createStudySet({
        user: this.id,
        title: this.studySetTitle
      }).then((data) => {
        this.studySetTitle = null
        this.studysets.results.unshift(data)
        this.creatingStudySet = false
      })
    },
    retrieveUser () {
      appService.retrieveUser(this.id).then(data => {
        this.username = data.username
        this.retrieveUserLoader = false
      })
    },
  },
  created() {
    this.listUserStudySets()
    this.retrieveUser()
  }
}
</script>
