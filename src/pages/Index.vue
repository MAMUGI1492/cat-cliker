<template>
  <q-page class="page-index">
    <h1 class="title">Buenos GIFs</h1>

    <section class="cards-container">
      <awesome-card v-for="(gif, index) in gifs" :key="index" :gif="gif" />
    </section>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AwesomeCard from 'src/components/AwesomeCard.vue';
import { generateGIFs, GIFInterface } from 'src/lib/gifs-factory';

export default defineComponent({
  name: 'PageIndex',
  components: { AwesomeCard },
  setup() {
    const gifs = ref([] as GIFInterface[]);

    void (async () => gifs.value.push(...(await generateGIFs())))();

    console.log(JSON.stringify(gifs.value, null, 2));

    return { gifs };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/css/app.scss';

.page-index {
  margin-bottom: $gap * 8;

  .title {
    padding: 0 $gap * 8;
    display: flex;
    align-items: center;
    color: $primary;
    font-size: clamp(1.5rem, 20vw, 6rem);
  }

  .cards-container {
    height: 100%;
    width: 100%;
    display: grid;
    grid-auto-rows: $cardHeight;
    grid-template-columns: repeat(auto-fill, $cardWidth);
    gap: $gap * 4;
    justify-content: center;
    align-content: center;
  }
}
</style>
