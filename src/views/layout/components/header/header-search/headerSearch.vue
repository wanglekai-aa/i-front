<template>
  <div class="w-full">
    <m-search v-model="inputValue" @input="handlerInput" @focus="handlerFocus">
      <template #dropdown>
        <div>
          <!-- 搜索提示 -->
          <search-hint
            v-show="inputValue"
            :searchText="inputValue"
            @itemClick="onSearchHandler"
          />
          <!-- 最近搜索 -->
          <search-histroy v-show="!inputValue" @itemClick="onSearchHandler" />
        </div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import searchHint from './searchHint.vue'
import searchHistroy from './searchHistroy.vue'

const store = useStore()

const inputValue = ref('')

const handlerInput = (v) => {
  console.log(v)
}

const handlerFocus = () => {
  console.log('focus')
}

const onSearchHandler = (v) => {
  inputValue.value = v
  store.commit('search/addHistory', v)
}
</script>
