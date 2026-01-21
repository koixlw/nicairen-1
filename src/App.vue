<template>
  <Toaster position="top-right" />
  <div class="app-wrapper">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
    <BackToTop />
    <BackgroundMusic />
  </div>
</template>

<script setup lang="ts">
  import BackgroundMusic from "@/components/BackgroundMusic.vue";
  import BackToTop from "@/components/BackToTop.vue";
  import Footer from "@/components/Footer.vue";
  import Header from "@/components/Header.vue";
  import "vue-sonner/style.css";
  import { Toaster, toast } from "vue-sonner";
</script>

<style scoped>
  .app-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main-content {
    flex: 1;
  }
</style>
