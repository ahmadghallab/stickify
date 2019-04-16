<template>
  <div>
    <div class="row justify-content-between bootstrap-nav">
      <div class="col-auto align-self-center px-0">
        <h4 class="mb-0 font-weight-bold">
          <router-link :to="{ name: 'home' }">myCards</router-link></h4>
      </div>
      <div class="col-auto align-self-center">
        <router-link :to="{ name: 'studysets' }">Explore Study Sets</router-link>
      </div>
    </div>
  </div>
</template>
