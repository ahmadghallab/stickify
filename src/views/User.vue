<template>
  <div>
    <Loader v-if="retrieveUserLoader" />
    <div class="default-card fade-up" v-else>
      <h4 class="font-weight-bold">{{ username }}</h4>
      <p class="text-muted mb-0">
        {{ studysets.length ? studysets.length + ' studyset' : 'No studysets yet' }}
      </p>
    </div>
    <Loader v-if="listStudySetsLoader" />
    <div class="fade-up" v-else>
      <div class="default-card" v-if="authorized">
        <form v-on:submit.prevent="createStudySet()">
          <div class="form-row">
            <div class="form-group col-12">
              <input id="setTitle" 
                v-model="studySetTitle"
                class="form-control"
                autocomplete="off"
                :disabled="creatingStudySet" 
                placeholder="New Study Set; Subject, chapter, unit">
            </div>
            <div class="col-12">
              <button type="submit" class="btn purple text-white" :disabled="newStudySetValidator || creatingStudySet">
                {{ creatingStudySet ? 'Creating' : 'Create' }}
              </button>
            </div>
          </div>
        </form>
      </div>
      <span class="verline"></span>
      <div class="text-center" v-if="!studysets.length">
        <h6 class="mb-2">No studysets yet</h6>
        <p class="text-muted">use the form above to create a new studyset.</p>
      </div>
      <div class="default-card" v-for="(studyset, idx) in studysets"   
        v-bind:key="idx">
        <div class="row justify-content-between">
          <div class="col align-self-center">
            <router-link :to="{ name: 'flashcards', params: {id: studyset.id} }">
              <h4 class="font-weight-bold">{{ studyset.title }}</h4>
              <p class="mb-0 text-muted">55 cards</p>
            </router-link>
          </div>
          <div class="col-auto align-self-center" v-if="authorized">
            <a href="javascript:void(0)" 
              class="circle circle-md purple mr-1 text-white"
              @click="updateStudySetModal(studyset.id)">edit</a>
            <!-- Edit Modal -->
            <Modal v-if="selectedStudySet == studyset.id && toggleUpdateStudySetModal">
              <div slot="header">
                <div class="card__header purple">
                  <div class="row justify_content-between">
                    <div class="col align-self-center">
                      <h5 class="mb-0 text-white font-weight-bold">Edit Study Set</h5>
                    </div>
                    <div class="col-auto align-self-center">
                      <a href="javascript:void(0)" 
                      class="circle circle-md transparent-dark text-white"
                      @click="toggleUpdateStudySetModal = false">
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
                  <form v-on:submit.prevent="updateStudySet(idx)">
                    <div class="form-row">
                      <div class="form-group col-12">
                        <input type="text"
                          v-model="studyset.title"
                          class="form-control" id="selectedStudySet"
                          :disabled="updatingStudySet"
                          autocomplete="off" placeholder="Study Set Title">
                      </div>
                      <div class="col-12">
                        <button type="submit" class="btn purple text-white"
                          :disabled="updateStudySetValidator(idx) || updatingStudySet">
                          {{ updatingStudySet ? 'Updating' : 'Update' }}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Modal>
            <a href="javascript:void(0)" 
              class="circle circle-md purple ml-1 text-white"
              @click="deleteStudySetConfirmModal(studyset.id)">del</a>
            <!-- Delete Modal -->
            <Modal width="550px" v-if="selectedStudySet == studyset.id && toggleDeleteStudySetModal">
              <div slot="body">
                <div class="default-card">
                  <h4 class="font-weight-bold mb-3">{{ studyset.title }}</h4>
                  <p class="text-muted">
                    You are about to delete this study set. No one will be able to access this study set ever again.
                  </p>
                  <p class="font-weight-bold my-4">Are you absolutely positive? There's no undo.</p>
                  <div class="text-center">
                    <button @click="deleteStudySet(idx)"
                      class="btn red btn-lg btn-block text-white mb-3" :disabled="deletingStudySet">
                      {{ deletingStudySet ? 'Deleting' : 'Yes, delete' }}
                    </button>
                    <a href="javascript:void(0)" @click="toggleDeleteStudySetModal = false"
                      class="font-weight-bold">Cancel</a>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
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
      username: null,
      currentUserId: null,
      studySetTitle: null,
      creatingStudySet: false,
      updatingStudySet: false,
      deletingStudySet: false,
      selectedStudySet: null,
      listStudySetsLoader: true,
      retrieveUserLoader: true,
      toggleUpdateStudySetModal: false,
      toggleDeleteStudySetModal: false,
      studysets: []
    }
  },
  computed: {
    ...mapGetters(['userId']),
    authorized () {
      return (this.userId == this.currentUserId) ? true : false
    },
    newStudySetValidator () {
      return (this.studySetTitle) ? false : true
    },
    updateStudySetValidator () {
      return index => (this.studysets[index].title) ? false : true
    },
  },
  methods: {
    listUserStudySets () {
      appService.listUserStudySets(this.id).then(data => {
        this.studysets = data.results
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
        this.studysets.unshift(data)
        this.creatingStudySet = false
      })
    },
    retrieveUser () {
      appService.retrieveUser(this.id).then(data => {
        this.username = data.username
        this.currentUserId = data.id
        this.retrieveUserLoader = false
      })
    },
    updateStudySetModal(studySetId) {
      this.selectedStudySet = studySetId
      this.toggleUpdateStudySetModal = true
    },
    updateStudySet(index) {
      this.updatingStudySet = true
      appService.updateStudySet({
        id: this.selectedStudySet,
        title: this.studysets[index].title,
      }).then(() => {
        this.toggleUpdateStudySetModal = false
        this.updatingStudySet = false
      })
    },
    deleteStudySetConfirmModal(studySetId) {
      this.selectedStudySet = studySetId
      this.toggleDeleteStudySetModal = true
    },
    deleteStudySet(index) {
      this.deletingStudySet = true
      appService.deleteStudySet(this.selectedStudySet)
      .then(() => {
        this.toggleDeleteStudySetModal = false
        this.deletingStudySet = false
        this.studysets.splice(index, 1)
      })
    },
  },
  created() {
    this.listUserStudySets()
    this.retrieveUser()
  }
}
</script>
