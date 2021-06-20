<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">
        Uups. No hay nada por aquí...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        to="/"
        label="Ir a la página principal"
        no-caps
        unelevated
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Error404',
});
</script>
