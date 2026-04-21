<script setup lang="ts">
defineOptions({ name: 'LayoutContainer' })
</script>
<template>
  <div class="bg-surface text-on-surface min-h-screen flex flex-col font-body">
    <slot name="header" />
    <slot name="content" />
    <slot name="footer" />
  </div>
</template>
