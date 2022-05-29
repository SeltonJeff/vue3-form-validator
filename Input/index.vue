<template>
  <div class="input" :class="`theme-${theme ? theme : 'default'} input`">
    <label v-if="label" :for="id" class="input__label">
      {{ label }}
    </label>
    <input
      ref="Input"
      v-model="content"
      :id="id"
      :name="name || id"
      :type="type ? type : 'text'"
      :rules="rules ? rules : ''"
      class="input__input-concrete"
      @input="$emit('update:value', content)"
    />
    <span class="input__error-message">{{ errorMessage }}</span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, reactive, ref, onMounted, onBeforeUnmount } from "vue";

// Props
const props = defineProps<{
  id: string;
  name?: string;
  label?: string;
  type?: string;
  rules?: Array<(...args: any) => true | string>;
  theme?: string;
  value?: string | number | null;
}>();
// Data
let content = reactive(props).value;
let errorMessage = ref<string | null>("");
let observer: MutationObserver | null = null;
// Refs
const Input = ref<HTMLInputElement | null>(null);
// Hooks
onMounted(() => {
  incrementValidateEvent();
  rulesMutationObserver();
});
onBeforeUnmount(() => {
  observer!.disconnect();
});

// Methods
function validateHandler(event: InputEvent): boolean {
  const currentRules = props.rules;
  for (const rule of currentRules!) {
    const result = rule(event.target);
    if (typeof result === "string") {
      Input.value!.classList.add("error");
      Input.value!.setAttribute("error", result);
      return false;
    }
  }
  Input.value!.classList.remove("error");
  Input.value!.removeAttribute("error");
  return true;
}

function incrementValidateEvent() {
  const validate = new Event("validate");
  // @ts-ignore
  Input.value!.addEventListener("validate", validateHandler);
  Input.value!.addEventListener("input", () =>
    Input.value!.dispatchEvent(validate)
  );
}

function rulesMutationObserver() {
  const config = { attributes: true };
  const callback = function (mutationList: MutationObserver[] | any[]) {
    for (const mutation of mutationList) {
      if (mutation.type === "attributes") {
        errorMessage.value = Input.value!.getAttribute("error");
      }
    }
  };
  observer = new MutationObserver(callback);
  observer.observe(Input.value!, config);
}
</script>
