<template>
  <kitten-card :kitten="kitten" @increase-counter="increaseCounter" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import KittenCard from 'src/components/KittenCard.vue';
import { generateKittens, KittyInterface } from 'src/lib/kitten-factory';

export default defineComponent({
  name: 'FirstStep',
  components: { KittenCard },
  async setup() {
    const kittens = ref([] as KittyInterface[]);

    const kitten = computed(() => ({ ...kittens.value[0], name: undefined }));

    const increaseCounter = () => kittens.value[0].counter++;

    kittens.value.push(...(await generateKittens()));

    return { increaseCounter, kitten };
  },
});
</script>
