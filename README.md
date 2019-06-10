# Typescript for Quasar 1.0 Beta
App Extension
Starter Kit
@quasar/testing

## Repos
https://github.com/quasarframework/app-extension-typescript
https://github.com/nothingismagick/quasar-starter-kit/tree/feature/typescript

## Install
```
$ cd your-quasar-v-one-project
$ quasar ext --add @quasar/typescript
```

## To Do
- starterkit with ts option
- ts-jest option in unit testing

## Resources
https://kulshekhar.github.io/ts-jest/user/config/
-> see the three preset config types

https://gist.github.com/snowyu/67f417c3f40f3471608aa78b6e182e39
https://gist.github.com/nickmessing/91f3e264f993790c5c6183f2e3e1b240

TS sourcemaps in vue (devtools)
https://github.com/vuejs/vue-cli/issues/2978#issuecomment-441426094

## Contributors
- @nothingismagick#9835
- @jeremyw#9147
- @khuguet#3769
- @Marty#5821
- @AdmTea#9234
- @whoistobias#1093
- @eKyNoX#9894
- @nklayman#4257

## Comments / Problems


1. This issue arose because @whoistobias renamed a js file to ts WHILE dev was running.

Attempting to switch the \store\index.js file to \store\index.ts results in the error:
```
Failed to compile.

./src/store/index.js
Module build failed (from ./node_modules/babel-loader/lib/index.js):
  Error: ENOENT: no such file or directory, open 'C:\Users\user\project\src\store\index.js'
```
It seems that the webpack config is still trying to find explicitly js files and it no longer finds the index.js file in that location. I don't have enough webpack knowledge to reconfigure it to search for ts files there. I also don't know how quasar bootstraps its entry components, therefore I can't edit that directly.

Similar issue referenced [here](https://github.com/quasarframework/quasar-cli/issues/64#issuecomment-368502630)

If I move the contents of index.js into store.ts in the same directory, and then replace the contents of index.js with
```
import store from './store'
export default store
```
it works correctly.
That further confirms the idea that index.js is hard coded.
this seems to apply for all the top level index.js files such as `router/index.js`, `i18n/index.js` etc.

-@whoistobias

2. Compile errors when using Vue Single file component and vue-class-component @Component class syntax in script section.
```
 error  in ./src/pages/Home.vue

Module Error (from ./node_modules/eslint-loader/index.js):

.\src\pages\Home.vue
  21:0  error  Parsing error: Using the export keyword between a decorator and a class is not allowed. Please use `export @dec class` instead.
```
Work arounds include use of standard Vue.extends syntax:
```
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    const message: string = 'This is a message'
    return {
      message
    }
  }
})
</script>
```
Or move the Typescript code to an external file:
Home.vue file script element
```
...
<script lang="ts" src="./Home.ts"/>
```
Home.ts
```
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Home extends Vue {
  public message: string = "This is a message";
}
```
-@khuguet
