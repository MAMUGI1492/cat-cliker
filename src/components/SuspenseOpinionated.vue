<template>
  <suspense>
    <template #default>
      <slot></slot>
    </template>

    <template #fallback>
      <load-spinner />
    </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoadSpinner from 'src/components/LoadSpinner.vue';

export default defineComponent({
  name: 'SuspenseOpinionated',
  components: { LoadSpinner },
});
</script>
