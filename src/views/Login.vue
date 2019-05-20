<template>
  <div class="wrapper">
    <div class="row justify-content-center">
      <div class="col-md-8 fade-up">
        <transition name="card-slide-right" mode="out-in">
          <div v-if="toggleSigninSignup" key="1">
            <div class="default-card alert-danger" v-if="userNotLoggedIn">
              <h2 class="mb-0 font-weight-lighter">Your credentials are incorrect</h2>
            </div>
            <div class="default-card">
              <form v-on:submit.prevent="login()">
                <div class="form-row">
                  <div class="form-group col-12">
                    <input type="text"
                      v-model="loginUserName"
                      class="form-control"
                      id="loginUserName"
                      placeholder="username"
                      :disabled="loggingIn"
                      autocomplete="off">
                  </div>
                  <div class="form-group col-12">
                    <input type="password"
                      class="form-control"
                      v-model="loginPassword"
                      placeholder="password"
                      :disabled="loggingIn"
                      id="loginPassword">
                  </div>
                  <div class="form-group col-12">
                    <button type="submit" class="btn purple text-white" :disabled="loginValidator || loggingIn">{{ loggingIn ? 'Logging' : 'Login' }}</button>
                  </div>
                  <div class="col-12">
                    <a href="javascript:void(0)" 
                      class="font-weight-bold text-muted"
                      @click="toggleSigninSignup = !toggleSigninSignup">Don't have an account? Signup
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div key="2" v-else>
            <div class="default-card">
              <div class="default-card alert-danger" v-if="accountNotCreated">
                <h1 class="mb-0 font-weight-lighter">Account not created</h1>
              </div>
              <form v-on:submit.prevent="createUser()">
                <div class="form-row">
                  <div class="form-group col-12">
                    <input type="text"
                      v-model="newUserName"
                      class="form-control"
                      id="newUserName"
                      placeholder="username"
                      :disabled="creatingUser"
                      autocomplete="off">
                  </div>
                  <div class="form-group col-12">
                    <input type="email"
                      v-model="newUserEmail"
                      class="form-control"
                      id="newUserEmail"
                      placeholder="email"
                      :disabled="creatingUser"
                      autocomplete="off">
                  </div>
                  <div class="form-group col-12">
                    <input type="password"
                      class="form-control"
                      v-model="newUserPassword"
                      placeholder="password"
                      :disabled="creatingUser"
                      id="newUserPassword">
                  </div>
                  <div class="form-group col-12">
                    <input type="password"
                      class="form-control"
                      v-model="newUserPasswordConfirm"
                      placeholder="password again"
                      :disabled="creatingUser"
                      id="newUserPasswordConfirm">
                  </div>
                  <div class="form-group col-12">
                    <button type="submit" class="btn purple text-white" :disabled="createUserValidator || creatingUser" @click="createUser()">{{ creatingUser ? 'Creating' : 'Create' }}</button>
                  </div>
                  <div class="col-12">
                    <a href="javascript:void(0)" 
                      class="font-weight-bold text-muted"
                      @click="toggleSigninSignup = !toggleSigninSignup">Have an account? Signin
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import appService from '../app.service.js'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      toggleSigninSignup: true,
      loggingIn: false,
      creatingUser: false,
      loginUserName: null,
      loginPassword: null,
      newUserName: null,
      newUserEmail: null,
      newUserPassword: null,
      newUserPasswordConfirm: null,
      userNotLoggedIn: false,
      accountNotCreated: false,
    }
  },
  computed: {
    ...mapGetters(['userId']),
    loginValidator () {
      return (this.loginUserName && this.loginPassword) ? false : true
    },
    createUserValidator () {
      return (this.newUserName && this.newUserEmail && this.newUserPassword && this.newUserPasswordConfirm && this.newUserPassword == this.newUserPasswordConfirm) ? false : true
    }
  },
  methods: {
    login () {
      this.loggingIn = true
      this.$store.dispatch('login', {
        username: this.loginUserName,
        password: this.loginPassword
      })
      .then(() => {
        const purpleirect = `user/${this.userId}`
        this.$router.push(purpleirect)
      })
      .catch(() => {
        this.userNotLoggedIn = true
        this.loginPassword = null
        this.loggingIn = false
      })
    },
    createUser() {
      this.creatingUser = true
      appService.createUser({
        username: this.newUserName,
        email: this.newUserEmail,
        password: this.newUserPassword
      }).then(() => {
        this.loginUserName = this.newUserName
        this.newUserName = null
        this.newUserEmail = null
        this.newUserPassword = null
        this.newUserPasswordConfirm = null
        this.creatingUser = false
        this.toggleSigninSignup = !this.toggleSigninSignup
      }).catch(() => {
        this.accountNotCreated == true
        this.creatingUser = false
      })
    }
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
</style>