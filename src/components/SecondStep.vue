<template>
  <div class="second-step">
    <kitten-card
      v-for="(kitten, index) in kittens"
      :key="index"
      :kitten="kitten"
      @increase-counter="increaseCounter(index)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import KittenCard from 'src/components/KittenCard.vue';
import { generateKittens, KittyInterface } from 'src/lib/kitten-factory';

export default defineComponent({
  name: 'SecondStep',
  components: { KittenCard },
  async setup() {
    const kittens = ref([] as KittyInterface[]);

    const increaseCounter = (index: number) => kittens.value[index].counter++;

    kittens.value.push(...(await generateKittens(2)));

    return { increaseCounter, kittens };
  },
});
</script>

<style lang="scss" scoped>
.second-step {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  gap: $gap * 2;
}
</style>
