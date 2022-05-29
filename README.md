# vue3-form-validator

## Form Validator with Smart Input Component for vue3 and nuxt3!

* Installation:
    * yarn add vue3-form-validator
    * npm install vue3-form-validator
    * Use on vue3:
      * In main.ts add:
         ```ts
          import { createApp } from "vue";
          import App from "./App.vue";
          const app = createApp(App)
      
          import { Form, Input } from 'vue3-form-validator';
        
          app.component('Form', Form)
          app.component('Input', Input)
        ```
    * Use on Nuxt3 globally:
      * In plugins directory add formValidator.ts:
         ```ts
        import { defineNuxtPlugin } from "#app";
        import { Form, Input } from 'vue3-form-validator';
      
        export default defineNuxtPlugin((nuxtApp) => {
           nuxtApp.vueApp.component("Form", Form);
           nuxtApp.vueApp.component("Input", Input);
        });
         ```
        
##
##


* How to use default validators:
    Locally import a validators:
    ```ts
    import { Validators } from 'vue3-form-validator'
    or
    import { Validators_ptBR as Validator } from 'vue3-form-validator'
    ```
    On Input component:
    ```vue
    <Input
       id="inputEmail"
       :v-model="formEditData.email"
       @update:value="formEditData.email = $event"
       type="email"
       label="Email:"
       :rules="[validators.required, validators.email]"
    />
    ```
* How to use a custom validators:
  * Compose a local custom validators:
      ```ts
      password(el: HTMLInputElement) {
        const regex =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
        if (el.value !== "" && !regex.test(el.value))
          return "[your error message].";
        return true;
      }
      ```
    On Input component:
      ```vue
      <Input
         id="inputPassword"
         :v-model="formEditData.passord"
         @update:value="formEditData.password = $event"
         type="password"
         label="Password:"
         :rules="[password]"
      />
      ```
  
##

* Preparing a mask directive for new versions...