<template>
  <div class="w-full">
    <m-search v-model="inputValue" @input="handlerInput" @focus="handlerFocus">
      <template #dropdown>
        <div>dropdown</div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'

const inputValue = ref('')

const handlerInput = (v) => {
  console.log(v)
}

const handlerFocus = () => {
  console.log('focus')
}
</script>
