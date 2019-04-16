<template>
  <div class="border-bottom">
    <div class="row justify-content-between bootstrap-nav">
      <div class="col-auto align-self-center px-0">
        <h4 class="mb-0 font-weight-bold">
          <router-link :to="{ name: 'home' }">inCard</router-link></h4>
      </div>
      <div class="col-auto align-self-center">
        <form>
          <input type="text" class="form-control search-box" autocomplete="off" placeholder="Search studysets">
        </form>
      </div>
      <div class="col-auto align-self-center">
        <router-link :to="{ name: 'studysets' }">
          <span class="circle circle-md grey text-white">ah</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
