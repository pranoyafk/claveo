<script setup lang="ts">
const props = defineProps<{
  showText: boolean;
}>();
</script>
<template>
  <div class="flex items-center gap-2">
    <div
      class="w-8 h-8 bg-linear-to-br from-neutral-800 to-neutral-700 border border-neutral-600 rounded-lg flex items-center justify-center"
    >
      <span class="text-neutral-50 font-bold text-lg">C</span>
    </div>
    <span v-if="props.showText" class="text-xl font-bold">Claveo</span>
  </div>
</template>
