<template>
<transition name="dialog">
  <div class="dialog-mask">
    <div class="dialog-wrapper" v-bind:style="{ 'max-width': width}">
      <div class="dialog-container fade-up">
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