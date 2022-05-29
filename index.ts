// @ts-ignore
import Form from "./Form/index.vue";
// @ts-ignore
import Input from "./Input/index.vue";

const Validators = {
  required(el: HTMLInputElement) {
    if (!el.value) return "This field is required.";
    return true;
  },
  password(el: HTMLInputElement) {
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
    if (el.value !== "" && !regex.test(el.value))
      return "The password must contain at least one number, one uppercase letter, one lowercase letter, and one special character.";
    return true;
  },
  email(el: HTMLInputElement) {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (el.value !== "" && !regex.test(el.value))
      return "Enter a valid email address";
    return true;
  },
};

const Validators_ptBR = {
  required(el: HTMLInputElement) {
    if (!el.value) return "Este campo é obrigatório.";
    return true;
  },
  password(el: HTMLInputElement) {
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
    if (el.value !== "" && !regex.test(el.value))
      return "A senha deve conter pelo menos um número, uma letra maiúscula, uma letra menúscula e um caractere especial.";
    return true;
  },
  email(el: HTMLInputElement) {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (el.value !== "" && !regex.test(el.value))
      return "Digite um email válido";
    return true;
  },
  cpf(el: HTMLInputElement) {
    const regex = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/;
    if (el.value !== "" && !regex.test(el.value)) return "Digite um cpf válido";
    return true;
  },
  // phone(el: HTMLInputElement) {
  //   const regex = /\(?([0-9]{2})\) ?([0-9]) ?([0-9]{4})-?([0-9]{4})/;
  //   if (el.value !== "" && !regex.test(el.value))
  //     return "Digite um número válido";
  //   return true;
  // },
};

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

export { Form };
export { Input };
export { Validators };
export default { Form, Input, Validators, Validators_ptBR };
