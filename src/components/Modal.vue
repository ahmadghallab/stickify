<template>
<transition name="dialog">
  <div class="dialog-mask">
    <div class="dialog-wrapper" v-bind:style="{ 'max-width': width}">
      <div class="dialog-container">
        <!-- Header -->
        <div class="dialog-header">
          <slot name="header"></slot>
        </div>
        <!-- Body -->
        <div class="dialog-body">
          <slot name="body"></slot>
        </div>
        <!-- Footer -->
        <div class="dialog-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
export default {
  props: {
    width: {
      default: '720px',
      type: String
    }
  }
}
</script>
<style lang="css" scoped>
.dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(100,107,131,.4);
}
.dialog-wrapper {
  position: relative;
  margin: 2.75rem auto;
  pointer-events: none;
  width: 90%;
}
.dialog-container {
  position: relative;
  width: 100%;
  pointer-events: auto;
}
.dialog-mask, .dialog-enter-active, .dialog-leave-active {
  transition: all .3s ease;
}
.dialog-enter, .dialog-leave-to {
  -webkit-transform: translate(0, 5px);
  -ms-transform: translate(0, 5px);
  transform: translate(0, 5px);
  opacity: 0;
}

</style>
