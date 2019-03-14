<template>
<div class="dialog-mask" v-bind:class="extraClass" v-bind:style="{ display: show ? 'flex' : 'none' }">
  <div class="dialog-container">
    <slot></slot>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
export const DialogEventBus = new Vue();

export default {
  props: ['extraClass'],
  name: 'DialogContainer',
  mounted() {
    DialogEventBus.$on('show', (el) => {
      if (this.$el.isSameNode(el)) {
        this.$data.show = true;
      }
    });

    DialogEventBus.$on('hide', (el) => {
      if (this.$el.isSameNode(el)) {
        this.$data.show = false;
      }
    });
  },
  beforeDestroy() {
    DialogEventBus.$off('show');
    DialogEventBus.$off('hide');
  },
  data() {
    return {
      show: false
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
}

.dialog-container {
  border-radius: 4px;
}
</style>
