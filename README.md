# vue3-form-validator

## Form validator with smile Input component for vue3, nuxt 3 and more...

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
    * Use on Nuxt3 globally:
      * In plugins directory add formValidator.ts:
       ```ts
      import { defineNuxtPlugin } from "#app";
      import { Form, Input } from 'vue3-form-validator';
      
      export default defineNuxtPlugin((nuxtApp) => {
         nuxtApp.vueApp.component("Form", Form);
         nuxtApp.vueApp.component("Input", Input);
      });
    
* Preparing a mask directive for new versions...