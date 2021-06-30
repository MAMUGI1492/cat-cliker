<template>
  <q-page class="page-index">
    <q-stepper v-model="step" color="primary" ref="stepper" animated>
      <q-step :done="hasEndedFirstStep" :name="1" icon="person" title="Paso 1">
        To do component
      </q-step>

      <q-step :done="hasEndedSecondStep" :name="2" icon="group" title="Paso 2">
        To do component
      </q-step>

      <q-step :name="3" icon="space_dashboard" title="Paso 3">
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

    const hasEndedFirstStep = computed(() => step.value > 1);
    const hasEndedSecondStep = computed(() => step.value > 2);
    const hasEnded = computed(() => step.value >= 3);

    const forward = (): void =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      !hasEnded.value ? stepper.value.next() : void 0;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const backward = (): void => stepper.value.previous();

    return {
      stepper,
      step,
      hasEndedFirstStep,
      hasEndedSecondStep,
      hasEnded,
      forward,
      backward,
    };
  },
});
</script>
