<template>
  <article class="awesome-card shadow-5">
    <figure>
      <img :src="gifState.url" alt="Image" />
    </figure>

    <section class="text-container">{{ gifState.title }}</section>

    <section class="button-container">
      <q-btn @click="triggerNotify" color="primary" label="Ir" outline />
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import { GIFInterface } from 'src/lib/gifs-factory';

export default defineComponent({
  name: 'AwesomeCard',
  props: {
    gif: { required: true, type: Object },
  },
  setup(props) {
    const gifState = ref(props.gif as GIFInterface);

    const $q = useQuasar();

    const triggerNotify = () =>
      $q.notify({
        color: 'primary',
        icon: 'announcement',
        message: '¿A dónde?',
        position: 'center',
        progress: true,
        type: 'info',
      });

    return { gifState, triggerNotify };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/css/app.scss';

.awesome-card {
  $figureHeight: 60%;
  $sectionHeight: (100% - $figureHeight) / 2;

  height: $cardHeight;
  width: $cardWidth;
  border: medium solid $primary;

  > figure {
    margin: 0px;
    height: $figureHeight;
    width: 100%;
    @include center-flex;
    object-fit: fill;

    > img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  .text-container,
  .button-container {
    height: $sectionHeight;
  }

  .text-container {
    border-top: medium solid $primary;
    padding: $gap;
    @include center-flex;
    font-style: italic;
    color: $primary;
  }

  .button-container {
    padding: $gap $gap * 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
