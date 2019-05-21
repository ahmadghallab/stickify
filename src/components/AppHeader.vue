<template>
  <div class="dark-purple top-nav fixed-top">
    <div class="row justify-content-between bootstrap-nav">
      <div class="col-auto"></div>
      <div class="col-auto align-self-center px-0 text-center">
        <h4 class="mb-0">
          <router-link exact :to="{ name: 'home' }" class="font-weight-bold text-white">
            Stickify
          </router-link>
        </h4>
      </div>
      <div class="col-auto align-self-center px-0">
        <span v-if="isAuthenticated">
          <router-link exact 
            :to="{ name: 'user', params: {id: userId} }"
            class="circle circle-md purple text-white">mya</router-link>
        </span>
        <span v-else>
          <router-link :to="{ name: 'login' }" class="circle circle-md purple text-white">Hi
          </router-link>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['userId','isAuthenticated']),
    }
  }
</script>