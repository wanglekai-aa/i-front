<template>
  <!-- 一级 路由出口 -->
  <div class="h-screen fixed top-0 left-0 w-screen">
    <!-- <router-view /> -->
    <m-transition-router-view
      :routerType="$store.getters.routerType"
      mainComponentName="home"
    />
  </div>
</template>

<script setup></script>
