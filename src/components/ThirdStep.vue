<template>
  <div class="third-step">
    <div class="list-container">
      <div
        v-for="(kitten, index) in kittens"
        :key="index"
        :class="listItemClasses(index)"
        @click="selectKitten(index)"
      >
        <span>{{ kitten.name }}</span>
      </div>
    </div>

    <kitten-card
      v-if="hasSelectedKitten"
      :kitten="kitten"
      @increase-counter="increaseCounter"
    />

    <div v-else class="kitten-fallback">
      <span>No has seleccionado ningún gatito</span>
      <q-icon name="sentiment_very_dissatisfied" size="xl" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import KittenCard from 'src/components/KittenCard.vue';
import { generateKittens, KittyInterface } from 'src/lib/kitten-factory';
import { ClassTyping } from 'src/typings';

export default defineComponent({
  name: 'ThirdStep',
  components: { KittenCard },
  async setup() {
    const kittens = ref([] as KittyInterface[]);

    const listItemClasses = (index: number): (ClassTyping | string)[] => [
      'list-item',
      { 'list-item--selected': index === indexSelectedKitten.value },
    ];

    const indexSelectedKitten = ref(-1);

    const selectKitten = (index: number) =>
      (indexSelectedKitten.value =
        indexSelectedKitten.value === index ? -1 : index);

    const hasSelectedKitten = computed(() => indexSelectedKitten.value !== -1);

    const kitten = computed(() => kittens.value[indexSelectedKitten.value]);

    const increaseCounter = () =>
      kittens.value[indexSelectedKitten.value].counter++;

    kittens.value.push(...(await generateKittens(20)));

    return {
      hasSelectedKitten,
      increaseCounter,
      kitten,
      kittens,
      listItemClasses,
      selectKitten,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/css/app.scss';

.third-step {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  gap: $gap * 2;

  .list-container {
    @include column-size;

    .list-item {
      @include h3;
      @include center-flex;

      &--selected span {
        color: $accent;
      }

      span {
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
          color: $primary;
        }
      }
    }
  }

  .kitten-fallback {
    @include column-size;
    @include center-flex;
    border: medium solid black;
    flex-direction: column;
    gap: $gap;

    > span {
      @include h3;
      text-align: center;
    }
  }
}
</style>
