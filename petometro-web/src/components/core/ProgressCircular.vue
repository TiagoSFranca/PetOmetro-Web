<template>
  <div class="progress">
    <v-progress-circular v-if="show" :size="100" :width="7" color="primary" indeterminate></v-progress-circular>
  </div>
</template>

<script>
export default {
  props: ['show'],
};
</script>
