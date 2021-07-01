<template>
  <q-card class="first-step">
    <q-img :src="image" @click.stop="counterIncrement" alt="Cat GIF">
      <div class="q-img--text">
        {{ imageText }}
      </div>
    </q-img>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'FirstStep',
  setup() {
    const image = ref('');

    const getImage = async (): Promise<void> => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        axios.defaults.headers.common['x-api-key'] =
          '6559f77b-4bda-4225-a8cb-a008a2c446e9';

        let response = await axios.get(
          'https://api.thecatapi.com/v1/images/search',
          { params: { limit: 1, size: 'full', mime_types: 'gif' } }
        );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        image.value = response.data[0].url as string;
      } catch (err) {
        console.log(err);
      }
    };

    void getImage();

    const counter = ref(0);

    const imageText = computed(() => `Contador: ${counter.value}`);

    const counterIncrement = (): number => counter.value++;

    return {
      imageText,
      counterIncrement,
      image,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/css/app.scss';

.first-step {
  .q-img {
    cursor: pointer;

    &--text {
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: flex-end;
      @include h5;
    }
  }
}
</style>
