<template>
<div class="dialog-mask" v-bind:class="extraClass" v-on:click="triggerMask" v-bind:style="{ display: show ? 'flex' : 'none' }">
  <div ref="dialog" class="dialog-container">
    <slot></slot>
  </div>
</div>
</template>

<script>

export default {
  props: ['extraClass', 'forced'],
  name: 'DialogContainer',
  mounted() {
  },
  computed: {
    show() {
      return this.$store.state.dialog.show
    }
  },
  methods: {
    triggerMask(e) {
      if (!this.$props.forced && this.$refs.dialog) {
        if (!this.$refs.dialog.contains(e.target)) {
          this.$store.commit('hideDialog');
        }
      }
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.dialog-mask {
  justify-content:center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background-color: rgba(255, 255, 255, 0.3);
  z-index: 1010;
}

.dialog-container {
  border-radius: 4px;
}
</style>
