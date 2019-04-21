<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8 fade-up">
        <transition name="card-slide" mode="out-in">
          <div v-if="toggleSigninSignup" key="1">
            <div class="default-card red text-white" v-if="userNotLoggedIn">
              <h6 class="mb-0 font-weight-bold">Your credentials are incorrect</h6>
            </div>
            <div class="card__header grey text-white">
              <h5 class="font-weight-bold mb-0">Have an account? Login</h5>
            </div>
            <div class="card__footer">
              <form v-on:submit.prevent="login()">
                <div class="form-row">
                  <div class="form-group col-12">
                    <input type="text"
                      v-model="loginUserName"
                      class="form-control"
                      id="loginUserName"
                      placeholder="username"
                      autocomplete="off">
                  </div>
                  <div class="form-group col-12">
                    <input type="password"
                      class="form-control"
                      v-model="loginPassword"
                      placeholder="password"
                      id="loginPassword">
                  </div>
                  <div class="form-group col-12 mt-2">
                    <button type="submit" class="btn grey text-white" :disabled="loginValidator || loggingIn">{{ loggingIn ? 'Logging' : 'Login' }}</button>
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
            <div class="card__header grey text-white">
              <h5 class="font-weight-bold mb-0">Don't have an account? Signup</h5>
            </div>
            <div class="card__footer">
              <div class="default-card red" v-if="accountNotCreated">
                <h6 class="mb-0 font-weight-bold">Account not created</h6>
              </div>
              <form v-on:submit.prevent="createUser()">
                <div class="form-row">
                  <div class="form-group col-12">
                    <input type="text"
                      v-model="newUserName"
                      class="form-control"
                      id="newUserName"
                      placeholder="username"
                      autocomplete="off">
                  </div>
                  <div class="form-group col-12">
                    <input type="email"
                      v-model="newUserEmail"
                      class="form-control"
                      id="newUserEmail"
                      placeholder="email"
                      autocomplete="off">
                  </div>
                  <div class="form-group col-12">
                    <input type="password"
                      class="form-control"
                      v-model="newUserPassword"
                      placeholder="password"
                      id="newUserPassword">
                  </div>
                  <div class="form-group col-12">
                    <input type="password"
                      class="form-control"
                      v-model="newUserPasswordConfirm"
                      placeholder="password again"
                      id="newUserPasswordConfirm">
                  </div>
                  <div class="form-group col-12 mt-3">
                    <button type="submit" class="btn grey text-white" :disabled="createUserValidator || creatingUser" @click="createUser()">{{ creatingUser ? 'Creating' : 'Create' }}</button>
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
        const redirect = `user/${this.userId}`
        this.$router.push(redirect)
      })
      .catch(() => {
        this.userNotLoggedIn = true
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
.card-slide-enter-active, .card-slide-leave-active {
  transition: all .3s ease;
}
.card-slide-enter, .card-slide-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
