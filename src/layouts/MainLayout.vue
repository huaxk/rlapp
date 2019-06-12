<template>
<div class="q-pa-none">
  <q-layout view="hHh lpR fFf">
    <q-header class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <!-- <q-icon name="menu" /> -->
        </q-btn>

        <!-- <q-avatar>
          <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
        </q-avatar> -->
        <q-toolbar-title>河湖管理信息系统</q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div>
        <q-btn
          flat
          dense
          round
          :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
          @click="$q.fullscreen.toggle()"
          class="q-ml-xs"
        /> -->
        <q-btn dense flat round icon="apps" @click="right = !right"/>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="260"
      :breakpoint="400"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-scroll-area
        style="height: calc(100% - 50px); margin-top: 50px; border-right: 1px solid #ddd"
      >
        <q-list>
          <!-- <q-item-label header>导航</q-item-label> -->
          <q-item to="/map">
            <q-item-section avatar>
              <q-icon name="school"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>地图面板</q-item-label>
            </q-item-section>
          </q-item>
          <q-expansion-item
            group="somegroup"
            icon="explore"
            label="First"
            default-opened
            header-class="text-primary"
          >
            <q-item to="/form">
              <q-item-section avatar>
                <q-icon name="school"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>表单测试</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable tag="a" target="_blank" href="https://github.com/quasarframework/">
              <q-item-section avatar>
                <q-icon name="code"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Github</q-item-label>
                <q-item-label caption>github.com/quasarframework</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-separator/>

          <q-expansion-item
            group="somegroup"
            icon="perm_identity"
            label="Second"
            header-class="text-teal"
          >
            <q-item clickable to="/" exact>
              <q-item-section avatar>
                <q-icon name="code"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Home</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
      <!-- <q-img
        class="absolute-top"
        src="https://cdn.quasar-framework.org/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar-framework.org/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold">Razvan Stoenescu</div>
          <div>@rstoenescu</div>
        </div>
      </q-img> -->
    </q-drawer>

    <q-drawer v-model="right" side="right" bordered>
      <q-date v-model="date"/>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</div>
</template>

<script lang="ts">
// import { openURL } from "quasar";
import { Vue, Component } from "vue-property-decorator"

// import Vue from "vue";
@Component
class MainLayout extends Vue {
  name = "MyLayout"
  right = false
  date = "2019/02/01"
  leftDrawerOpen = this.$q.platform.is.desktop
  // methods: {
  //   openURL
  // }
}

export default MainLayout;
</script>

<style></style>
