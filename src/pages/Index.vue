<template>
  <q-page class="page-index">
    <q-stepper
      v-model="step"
      :keep-alive="true"
      color="primary"
      ref="stepper"
      animated
    >
      <q-step :done="hasEndedFirstStep" :name="1" icon="person" title="Paso 1">
        <suspense-opinionated>
          <first-step />
        </suspense-opinionated>
      </q-step>

      <q-step :done="hasEndedSecondStep" :name="2" icon="group" title="Paso 2">
        <suspense-opinionated>
          <second-step />
        </suspense-opinionated>
      </q-step>

      <q-step :name="3" icon="space_dashboard" title="Paso 3">
        <suspense-opinionated>
          <third-step />
        </suspense-opinionated>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            v-if="hasBegin"
            @click="backward"
            color="primary"
            label="Atrás"
            flat
          />

          <q-btn
            @click="forward"
            :disable="hasEnded"
            color="primary"
            label="Continuar"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { QStepper } from 'quasar';
import SuspenseOpinionated from 'src/components/SuspenseOpinionated.vue';
import FirstStep from 'src/components/FirstStep.vue';
import SecondStep from 'src/components/SecondStep.vue';
import ThirdStep from 'src/components/ThirdStep.vue';

export default defineComponent({
  name: 'PageIndex',
  components: { FirstStep, SecondStep, SuspenseOpinionated, ThirdStep },
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
  .q-stepper {
    height: 100%;
    width: 100%;

    .q-stepper__nav {
      display: flex;
      gap: 8px;
    }

    .q-stepper__step ::v-deep(.q-stepper__step-content .q-stepper__step-inner) {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }
}
</style>
