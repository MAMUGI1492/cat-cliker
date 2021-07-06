<template>
  <kitty-card :kitty="kitty" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import KittyCard from 'src/components/KittenCard.vue';
import { generateKittens, KittyInterface } from 'src/lib/kitten-factory';

export default defineComponent({
  name: 'FirstStep',
  components: { KittyCard },
  async setup() {
    const kittens = ref([] as KittyInterface[]);

    const kitty = computed(() => ({ ...kittens.value[0], name: undefined }));

    kittens.value.push(...(await generateKittens()));

    return { kitty };
  },
});
</script>
