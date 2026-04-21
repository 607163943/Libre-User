<script setup lang="ts">
defineOptions({
  name: 'LayoutMenu'
})
</script>

<template>
  <nav class="bg-white shadow-sm sticky top-0 z-50">
    <div class="flex justify-between items-center px-8 h-16 w-full max-w-[1440px] mx-auto">
      <div class="flex items-center gap-8">
        <slot name="left" />
      </div>

      <div class="flex items-center gap-4">
        <slot name="right" />
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
