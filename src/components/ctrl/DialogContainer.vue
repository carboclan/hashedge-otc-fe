<template>
<div class="dialog-mask" v-bind:class="extraClass" v-on:click="triggerMask" v-bind:style="{ display: showDialog ? 'flex' : 'none' }">
  <div ref="dialog" class="dialog-container">
    <div class="close-mark" v-on:click="closeDialog" v-if="!cannotSkip">
      <i class="material-icons">clear</i>
    </div>
    <slot></slot>
  </div>
</div>
</template>

<script>

export default {
  props: ['extraClass', 'forced', 'show', 'cannotSkip', 'onClose'],
  name: 'DialogContainer',
  mounted() {
  },
  computed: {
    showDialog() {
      if (this.$props.show !== undefined) {
        return this.$props.show;
      } else {
        return this.$store.state.dialog.show;
      }
    }
  },
  methods: {
    triggerMask(e) {
      if (!this.$props.forced && this.$refs.dialog) {
        if (!this.$refs.dialog.contains(e.target)) {
          // this.$store.commit('hideDialog');
        }
      }
    },
    closeDialog() {
      (this.$props.onClose && this.$props.onClose()) || this.$store.commit('hideDialog');
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
.close-mark {
  float: right;
  margin: 5px;
}
.dialog-container {
  border-radius: 4px;
}
</style>
