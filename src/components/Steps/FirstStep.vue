<template>
  <q-card class="FirstStep">
    <q-img :src="image.url" alt="Cat GIF" />

    <q-card-actions>
      <q-btn @click="counterIncrement" flat>{{ buttontText }}</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import axios from 'axios';

interface CatImage {
  breed_ids?: null;
  breeds: any[];
  created_at?: string;
  height: number;
  id: string;
  original_filename?: string;
  sub_id?: string;
  url: string;
  width: number;
}

export default defineComponent({
  name: 'FirstStep',
  components: {},
  setup() {
    const image = ref({} as CatImage);

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
        image.value = response.data[0] as CatImage;
      } catch (err) {
        console.log(err);
      }
    };

    void getImage();

    const counter = ref(0);

    const buttontText = computed(() => `Contador: ${counter.value}`);

    const counterIncrement = (): number => counter.value++;

    return {
      buttontText,
      counterIncrement,
      image,
    };
  },
});
</script>
