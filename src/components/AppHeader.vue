<template>
  <div class="purple fixed-top">
    <div class="row justify-content-between bootstrap-nav">
      <div class="col-auto align-self-center px-0">
        <h4 class="mb-0 font-weight-bold">
          <router-link exact :to="{ name: 'home' }">nutshell</router-link></h4>
      </div>
      <div class="col-auto align-self-center px-0">
        <span v-if="isAuthenticated">
          <router-link exact 
            :to="{ name: 'user', params: {id: userId} }"
            class="mr-2 font-weight-bold">my Nutshells</router-link>
          <a href="javascript:void(0)" @click="logout" class="ml-2 font-weight-bold">logout</a>
        </span>
        <span v-else>
          <router-link :to="{ name: 'login' }" class="font-weight-bold">Log In
          </router-link>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['userId','isAuthenticated']),
    },
    methods: {
      ...mapActions({
        logout: 'logout'
      }),
      logout () { 
        this.$store.dispatch('logout').then(() => { 
          this.$router.push('/login')
        })
      },
    }
  }
</script>