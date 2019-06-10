<template>
  <div class="flex justify-center full-height items-center">
    <div class style="width:300px;margin-top:100px">
      <q-card square style="width: 400px; padding:50px">
        <q-card-section>
          <div class="text-h6">登录</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="username" type="text" float-label="Float Label" placeholder="姓名"/>
          <q-input v-model="password" type="text" float-label="Float Label" placeholder="密码"/>
        </q-card-section>
        <q-card-actions vertical align="center">
          <q-btn type="submit" color="primary" label="登录" @click="onSubmit" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"

@Component
class LoginPage extends Vue {
  username = null
  password = null

  onSubmit(): void {
    this.$q.notify(this.username)
  }
}
export default LoginPage;
</script>

<style lang="stylus" scoped>
.my-card {
  width: 100%;
  max-width: 500px;
}
</style>
