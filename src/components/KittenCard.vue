<template>
  <q-card class="kitten-card">
    <q-img :src="kittenState.url" @click.stop="counterIncrement" alt="Cat GIF">
      <div class="q-img--text">
        <span v-if="hasName">{{ nameText }}</span>

        <span>{{ counterText }}</span>
      </div>

      <template #loading>
        <load-spinner />
      </template>
    </q-img>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import LoadSpinner from 'src/components/LoadSpinner.vue';
import { KittyInterface } from 'src/lib/kitten-factory';

const fallbackName = 'Foo kitten';

export default defineComponent({
  name: 'KittenCard',
  components: { LoadSpinner },
  props: {
    kitten: {
      default: () => ({ counter: 0, name: fallbackName, url: 'cat.gif' }),
      type: Object,
    },
  },
  emits: ['increase-counter'],
  setup(props, { emit }) {
    const kittenState = ref(props.kitten as KittyInterface);

    const counterIncrement = () => emit('increase-counter');

    const counterText = computed(
      () => `Contador: ${kittenState.value.counter}`
    );

    const hasName = computed(() => !!kittenState.value.name);
    const nameText = computed(
      () =>
        `Nombre: ${
          kittenState.value.name ? kittenState.value.name : fallbackName
        }`
    );

    watch(
      () => props.kitten,
      () => (kittenState.value = props.kitten as KittyInterface)
    );

    return {
      counterIncrement,
      counterText,
      hasName,
      kittenState,
      nameText,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/css/app.scss';

.kitten-card {
  @include column-size;

  .q-img {
    cursor: pointer;

    &--text {
      left: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      @include h3;
    }
  }
}
</style>
