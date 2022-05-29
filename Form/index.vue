<template>
  <form
    ref="Form"
    @submit.prevent="submitHandler"
    @reset="resetHandler"
    autocomplete="off"
  >
    <slot />
  </form>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from "vue";
// Props
const props = defineProps({
  validators: Object,
  clearBeforeSubmit: Boolean,
});
// Emits
const emit = defineEmits(["submit", "reset"]);
// Refs
const Form: Ref<HTMLFormElement> | Ref<null> = ref(null);
// Data
let FormElement: HTMLFormElement | null = null;
let Inputs: NodeListOf<HTMLInputElement> | null = null;
// Hooks
onMounted(() => {
  FormElement = Form.value;
  Inputs = FormElement!.querySelectorAll("input");
});

// Methods
function submitHandler() {
  const event = new Event("input");
  Inputs!.forEach((input) => input.dispatchEvent(event));
  if (!validateHandler()) return null;
  emit("submit");
  if (props.clearBeforeSubmit) {
    Form.value!.reset();
  }
}

function resetHandler() {
  Inputs!.forEach((input) => {
    input.value = "";
  });
  emit("reset");
}

function validateHandler(): boolean {
  let validation = true;
  Inputs!.forEach((input) => {
    const error = input.getAttribute("error");
    if (error) {
      validation = false;
    }
  });
  return validation;
}
</script>
