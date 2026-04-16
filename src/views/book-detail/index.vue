<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowLeftOutlined, ReadOutlined } from '@ant-design/icons-vue'
import type { BookDetail } from '@/types/book'
import { useRoute } from 'vue-router'
import { getBookDetail } from '@/api/book'
import { lendBook, returnBook } from '@/api/lend'
import { message } from 'ant-design-vue'

const defaultUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAj5Uhagb3HXssYzl0WyCiljWzdTbDnDpGRCZNmTaaOGAYjV-QrIdiEARZk11tVapMxD16HhNEsoI7ndRBLM7q4jxbLFjPLOk1vYXzPCMI4u865HpJpE2in-bTvr3vhrJV0zDLUdUMJ7OLxKEqkphaBRP6DNVCadgylQFx4kUdxETO1a-o28n8TB6l1U9U-4P-X8oueOKU13MH6J1_CZWs3XOikBdgyCLNpQ3SZmfe0xsRFjZLhMyi86OuDc7kPj4SjtlbI_5tCgQ8'
const bookData = ref<BookDetail | null>(null)
const loading = ref(true)

const route = useRoute()
const handleGetBookDetail = async () => {
  loading.value = true
  getBookDetail(Number(route.params.id))
    .then((res) => {
      bookData.value = res.data.data
    })
    .catch((error) => console.log(error))
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  handleGetBookDetail()
})
const handleLend = () => {
  lendBook(Number(route.params.id))
    .then(() => {
      message.success('借阅成功')
      handleGetBookDetail()
    })
    .catch((error) => console.log(error))
}
const handleReturn = () => {
  returnBook(Number(route.params.id))
    .then(() => {
      message.success('归还成功')
      handleGetBookDetail()
    })
    .catch((error) => console.log(error))
}
</script>

<template>
  <main class="flex-grow max-w-[1440px] mx-auto w-full px-8 py-8" v-if="!loading">
    <div class="flex items-center justify-between mb-8">
      <a-button
        type="link"
        class="flex items-center p-0 h-auto text-[#005faa] font-medium"
        @click="() => $router.back()"
      >
        <template #icon><ArrowLeftOutlined /></template>
        返回
      </a-button>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-12 mb-8">
      <div class="flex flex-col lg:flex-row gap-16 items-start">
        <div class="flex-shrink-0 w-full lg:w-[320px]">
          <div class="aspect-[3/4] rounded-lg overflow-hidden bg-[#eceef1] shadow-md group">
            <img
              :src="bookData?.coverUrl || defaultUrl"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div class="mt-6 flex flex-col gap-3">
            <a-config-provider
              :theme="{
                token: {
                  borderRadius: 4,
                  colorPrimary: '#005daa',
                  components: {
                    Button: {
                      controlHeight: 48
                    }
                  }
                }
              }"
            >
              <a-button
                v-if="bookData?.state !== 1 && bookData?.state !== 3"
                type="primary"
                block
                class="h-12 font-bold"
                @click="handleLend"
              >
                <template #icon><ReadOutlined /></template>
                借阅
              </a-button>
              <a-button
                v-else
                type="primary"
                danger
                block
                class="h-12 font-bold"
                @click="handleReturn"
              >
                <template #icon><ReadOutlined /></template>
                归还
              </a-button>
            </a-config-provider>
          </div>
        </div>

        <div class="flex-grow">
          <div class="mb-8">
            <h1
              class="text-4xl font-extrabold font-headline text-[#191c1e] leading-tight tracking-tight mb-2"
            >
              {{ bookData?.bookName }}
            </h1>
            <p class="text-xl text-[#005faa] font-medium mb-6">{{ bookData?.authorName }}</p>
          </div>

          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-12 border-t border-b border-[#e6e8eb] py-8"
          >
            <div
              v-for="(val, label) in {
                出版社: bookData?.publisherName,
                出版日期: bookData?.publishDate,
                ISBN: bookData?.isbn,
                语言: bookData?.language
              }"
              :key="label"
              class="flex flex-col gap-1"
            >
              <span class="text-xs uppercase tracking-widest text-[#404753] font-semibold">{{
                label
              }}</span>
              <span class="text-[#191c1e] font-medium">{{ val }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-xs uppercase tracking-widest text-[#404753] font-semibold"
                >借阅状态</span
              >
              <a-tag
                v-if="bookData?.state !== 1 && bookData?.state !== 3"
                color="success"
                class="mt-2 font-bold w-16 text-center"
              >
                可借阅
              </a-tag>
              <a-tag
                v-else-if="bookData?.state === 1"
                color="warning"
                class="mt-2 font-bold w-16 text-center"
              >
                已借阅
              </a-tag>
              <a-tag
                v-else-if="bookData?.state === 3"
                color="error"
                class="mt-2 font-bold w-16 text-center"
              >
                已逾期
              </a-tag>
            </div>
          </div>

          <section>
            <h3
              class="text-lg font-headline font-bold text-[#191c1e] mb-4 border-l-4 border-[#005faa] pl-4"
            >
              内容简介
            </h3>
            <div class="space-y-4 text-[#404753] leading-relaxed">
              <!-- 首行缩进2个字符 -->
              <p class="indent-4">{{ bookData?.introduction }}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>

  <main class="flex-grow max-w-[1440px] mx-auto w-full px-8 py-8" v-else>
    <a-skeleton active :paragraph="{ rows: 10 }" />
  </main>
</template>

<style scoped>
/* 使用 Tailwind CSS，CSS 中主要定义字体回退和特定动画 */
:deep(.ant-btn-primary) {
  display: flex;
  align-items: center;
  justify-content: center;
}

.font-headline {
  font-family: 'Manrope', sans-serif;
}

.font-body {
  font-family: 'Inter', sans-serif;
}
</style>
