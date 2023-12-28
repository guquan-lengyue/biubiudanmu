<script setup lang="ts">
import { ref } from 'vue'
import { DanmuClient } from '@/lib/contract/client/danmu'
import type { Danmu } from '@/lib/contract/types/danmu'

let danmu = ref<Danmu>({
  txt: '',
  t: '',
  fs: '',
  fc: '',
  pt: '',
  lang: ''
})

function sendDanmu() {
  DanmuClient.send(danmu.value, { targetCharId: 66442, noteId: 1 })
}


let danmuList = ref<Danmu[]>()

async function findVideo() {
  danmuList.value = await DanmuClient.findDanmu({ targetCharId: 66442, noteId: 1 })
}

</script>

<template>
  <div>
    <div>txt: <input type="text" v-model="danmu.txt"></div>
    <div>t: <input type="text" v-model="danmu.t"></div>
    <div>fs: <input type="text" v-model="danmu.fs"></div>
    <div>fc: <input type="text" v-model="danmu.fc"></div>
    <div>pt: <input type="text" v-model="danmu.pt"></div>
    <div>lang?: <input type="text" v-model="danmu.lang"></div>
    <div>{{ danmu }}</div>
    <button @click="sendDanmu">发送</button>
  </div>
  <div>
    <button @click="findVideo">查找弹幕</button>
    <div v-for="(a,index) in danmuList" :key="index">
      {{ index }} ---{{ a }}
    </div>
  </div>
</template>

<style scoped>

</style>
