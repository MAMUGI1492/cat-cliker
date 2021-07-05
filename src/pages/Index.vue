<template>
  <q-page class="page-index">
    <q-stepper v-model="step" color="primary" ref="stepper" animated>
      <q-step :done="hasEndedFirstStep" :name="1" icon="person" title="Paso 1">
        <first-step />
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
            v-if="hasBegin"
            @click="backward"
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
import FirstStep from 'src/components/FirstStep.vue';

export default defineComponent({
  name: 'PageIndex',
  components: { FirstStep },
  setup() {
    const stepper = ref(QStepper);
    const step = ref(1);

    const hasEndedFirstStep = computed(() => step.value > 1);
    const hasEndedSecondStep = computed(() => step.value > 2);
    const hasEnded = computed(() => step.value >= 3);
    const hasBegin = computed(() => step.value > 1);

    const forward = () => stepper.value.next();

    const backward = () => stepper.value.previous();

    return {
      stepper,
      step,
      hasBegin,
      hasEndedFirstStep,
      hasEndedSecondStep,
      hasEnded,
      forward,
      backward,
    };
  },
});
</script>

<style lang="scss" scoped>
.page-index {
  display: flex;
  justify-content: center;
  align-items: center;

  .q-stepper .q-stepper__nav {
    display: flex;
    gap: 8px;
  }
}
</style>
