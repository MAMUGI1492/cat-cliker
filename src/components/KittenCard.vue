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
import { computed, defineComponent, reactive } from 'vue';
import LoadSpinner from 'src/components/LoadSpinner.vue';
import { KittyInterface } from 'src/lib/kitten-factory';

const fallbackName = 'Foo kitten';

export default defineComponent({
  name: 'KittenCard',
  components: { LoadSpinner },
  props: {
    kitty: {
      default: () => ({ counter: 0, name: fallbackName, url: 'cat.gif' }),
      type: Object,
    },
  },
  setup(props) {
    const kittenState = reactive(props.kitty) as KittyInterface;

    const counterIncrement = (): number => kittenState.counter++;

    const counterText = computed(() => `Contador: ${kittenState.counter}`);

    const hasName = computed(() => !!kittenState.name);
    const nameText = computed(
      () => `Nombre: ${kittenState.name ? kittenState.name : fallbackName}`
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

.kitten-card .q-img {
  cursor: pointer;

  &--text {
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    @include h3;
  }
}
</style>
