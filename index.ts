import {
  defineComponent,
  defineEmits,
  defineProps,
  onBeforeUnmount,
  onMounted,
  reactive,
  Ref,
  ref,
} from "vue";

export const Form = defineComponent({
  name: "Form",
  template: `
      <form
          ref="Form"
          @submit.prevent="submitHandler"
          @reset="resetHandler"
          autocomplete="off"
      >
      <slot/>
      </form>`,
  setup() {
    // Props
    const props = defineProps({
      validators: Object,
      clearBeforeSubmit: Boolean,
    });
    // Emits
    const emit = defineEmits(["submit", "reset"]);
    // Refs
    const Form: Ref<HTMLFormElement | null> = ref(null);
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
      if (validateHandler() === false) return null;
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
  },
});

export const Input = defineComponent({
  name: "Input",
  template: `
      <div class="input" :class="'theme-' + theme ? theme : 'default' + 'input'">
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
      </div>`,
  setup() {
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
  },
});

// const mask = (Input: HTMLInputElement | any, biding: any) => {
//   if (!biding.value) return null;
//   const Me = Input;
//   const patternLiterals = biding.value;
//   const pattern: any[] = [];
//   const allItems = patternLiterals.split("");
//   resolvePattern();
//   setMaxLength();
//   const patternCurrentIndex = pattern.map((patternStep) => patternStep.index);
//   if (patternCurrentIndex.includes(Input.value.length))
//     Me.value += pattern.filter(
//       (cur) => cur.index === Input.value.length
//     )[0].item;
//
//   // Methods
//   function resolvePattern() {
//     allItems.forEach((item: string, index: number) => {
//       if (item !== "#") pattern.push({ item, index });
//     });
//   }
//   function setMaxLength() {
//     Me.maxLength = patternLiterals.length;
//   }
// };
