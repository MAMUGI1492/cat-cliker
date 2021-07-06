<template>
  <div class="second-step">
    <kitty-card v-for="(kitty, index) in kittens" :key="index" :kitty="kitty" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import KittyCard from 'src/components/KittenCard.vue';
import { generateKittens, KittyInterface } from 'src/lib/kitten-factory';

export default defineComponent({
  name: 'SecondStep',
  components: { KittyCard },
  async setup() {
    const kittens = ref([] as KittyInterface[]);

    kittens.value.push(...(await generateKittens(2)));

    return { kittens };
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
