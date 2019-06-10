<template>
  <div class="q-pa-md" style="max-width: 300px">
    <form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input ref="name" outlined v-model="name" label="姓名"/>
    </form>
    <div class="row justify-end">
      <q-btn
        type="submit"
        @click="onSubmit"
        label="Save"
        class="q-mt-md"
        color="teal"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

@Component
class Sample extends Vue{
  name = null

  onSubmit(): void {
    // this.$q.notify(this.$refs.name);
    this.$q.notify(this.name)
  }
  onReset(): void {
    this.name = null;
  }
}

export default Sample
</script>
