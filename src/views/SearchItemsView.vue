<script setup lang="ts">
import SearchItemsForm from '@/components/SearchItemsForm.vue'
</script>

<template>
  <div class="w-[calc(100%-208px)] lg:w-[calc(100%-320px)] flex flex-col h-dvh items-center justify-center">
    <div class="mx-4">
      <h1 class="mb-2 font-bold">Faça uma busca pelo título</h1>
      <p class="text-gray-400 mb-6">A API retornará todos os itens que contém o título informado separados por categoria</p>

      <SearchItemsForm />
    </div>
  </div>
</template>
