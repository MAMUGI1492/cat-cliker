<template>
  <q-page class="row items-center justify-evenly">
    <q-stepper v-model="step" ref="stepper" color="primary" animated>
      <q-step :name="1" title="Paso 1" icon="person" :done="step > 1">
        To do component
      </q-step>

      <q-step :name="2" title="Paso 2" icon="group" :done="step > 2">
        To do component
      </q-step>

      <q-step :name="3" title="Paso 3" icon="space_dashboard">
        To do component
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            @click="forward"
            :disable="hasEnded"
            color="primary"
            label="Continuar"
          />

          <q-btn
            v-if="step > 1"
            @click="backward"
            class="q-ml-sm"
            color="primary"
            label="Atrás"
            flat
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { QStepper } from 'quasar';

export default defineComponent({
  name: 'PageIndex',
  components: {},
  setup() {
    const stepper = ref(QStepper);
    const step = ref(1);

    const hasEnded = computed(() => step.value >= 3);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const forward = (): void =>
      !hasEnded.value ? stepper.value.next() : void 0;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const backward = (): void => stepper.value.previous();

    return {
      stepper,
      step,
      hasEnded,
      forward,
      backward,
    };
  },
});
</script>
