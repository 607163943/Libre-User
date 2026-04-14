<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { getUserLendTotal } from '@/api/home'

const userStore = useUserStore()
const router = useRouter()
// 接口定义
interface BookItem {
  id: number
  title: string
  author: string
  cover: string
  year?: string
  category?: string
  isHot?: boolean
  holds?: number
  isNew?: boolean
  timeLabel: string
}

interface HomeDataCard {
  label: string
  title: string
  icon: string
  value: number
  unit: string
  color: string
}

// 状态变量
const searchQuery = ref<string>('')
const stats = ref<HomeDataCard[]>([
  {
    label: 'Active Loans',
    title: '当前借阅',
    icon: 'book',
    value: 5,
    unit: '当前借阅',
    color: '#005daa'
  },
  {
    label: 'Warning',
    title: '即将逾期',
    icon: 'schedule',
    value: 1,
    unit: '即将逾期',
    color: '#934600'
  },
  {
    label: 'Overdue',
    title: '已逾期',
    icon: 'priority_high',
    value: 0,
    unit: '已逾期',
    color: '#ba1a1a'
  }
])

const trendingBooks = ref<BookItem[]>([
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: '1925',
    isHot: true,
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDY7ftiVqJEySOwa14v7uZbnVweh_zMW5cLScW1Tf-MGtDrRFJTOUyG9grDmve5JdcwwElRg9VgddcIEdP0LLYpN_DvSH8uIIEhDlvl5GY_-R1HExz_tmHdOE9O-BfoJtL5a4Ne1aEZh61pZxHBE0W5YIF8AqFVsRD_NBtcTurN3Zk3b9rtJSNa1hY-P3NSUKJOM3NuvM-HiiXpcteh6iLvVBM6uOkY4skIc78g0St6RXc_ArYIrAMvyl0YKpXrCXlTPAGdh-zjehw',
    timeLabel: ''
  },
  {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    year: '2018',
    holds: 24,
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAg0DuScKaSPaAOFEDwf3cj8-9G4D1u75jkp__uBQip40TSWBf8oJKL7iwCfWqupwweQvtvaQJcxTvCJ6J8mCOPIehwlkJRrtf5XfiWv9ykCXQAE8Wcafpwl6f2J_tViqdKxVcgYBy--L9H_W4IvpD-VIGHzXVS-kz5Ld7F-YZL8jnZCZiz9tibzkIAD272NQHQosq0rHOwCBzqow7NrJ1ayCg4Ik94IlpYsuuDLn4SuK2lKVoo7YpFYdmKeBG2OLV7AVpR8RJOKq8',
    timeLabel: ''
  },
  {
    id: 3,
    title: 'Norwegian Wood',
    author: 'Haruki Murakami',
    year: '1987',
    holds: 12,
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD0qr8el_U4yHhdK9l_kFFGEjJku7glKjkaECr6kI2X10I-Lly6X1bj83JKpoD6qKaGDlTpUvHVR06vaB0YCK5iWB6cZBRpupj2uBjI-XtYIjtAou5cpuUjrp14WpZbpPMRveZIF4CccZxZk39PLowAac7YkXqIbyL-8BJdp8C4vylte7u2-eDgCsGFynqyuj221xVIXUAZIGJdbZWRr_3NzbK6ViwzS82yI8BhPm_JoZuks-5L7bqLXLaaET53-GZ3q1DX33Roid8',
    timeLabel: ''
  }
])

const newArrivals = ref<BookItem[]>([
  {
    id: 4,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Computer Science',
    isNew: true,
    timeLabel: 'Added 2h ago',
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAY_mJhNrzOMTIa07c5VdgcEybOHaHEthCdlkXxuI-7DrbqnhS9gIIXN2B2aO85bUi0Cpkw2JrHN6P8fxIxHSBP2gS_U7_nITH6oBANpvmn-mOzGXH0DghJeUSIXzDXS71ve1Fy2-pItj7TMwvsqXaABFXEEz3QJ9fzH_WszJHPul2fK15NSB8VMOZuF99c7SikpgAVRcRwdkdAMsxKtl7VrsT8aGxASQRwBiWvHIPt7F91iUVe_TvYdwM0I5ck2ixlyj3wTGO5oEo'
  },
  {
    id: 5,
    title: 'The Art of War',
    author: 'Sun Tzu',
    category: 'Philosophy',
    timeLabel: 'Today',
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuArFWzG46bx0mbdm4-Tz5bfN5S-Tumrb5G_noHTkH1dCVm6NdN60lvevKSM7vz_OBWEfZD8E7OXTuURfDL7z0ekkZybYRVRowfQmmU3H3TqYCpiFjFe8BSC-YYk07UqYY_Qm96_nKogl_GCHbC3eMfz9uE6vgVcvCAGa_ce7DidszFMiFXAJl0yjFX3bXMCPLIs1AVzKsmlMvg9y0yqoS_lVARDu-E1wfcfvIJQIMSd2rcptDW0mWh_L1zT-JmsxJccpXJu6nCzx4g'
  },
  {
    id: 6,
    title: 'Design Patterns',
    author: 'Gamma et al.',
    category: 'Engineering',
    timeLabel: 'Yesterday',
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAgLrxSxJjmo2r3zr9bK5SwTGTHHFp7LmjgxWczjruKCiEO-CS5rROFQ_8jS9AzbL5O84pEg25il1SUnN-ys-p9zbu7wtuprzLni2TywryiCVVJIKN8MKwUag4zYTfoLDcorhjbTIe9uwNdwFbeRec685MvemFsj9M6Vd7Hea5htWT16MR3FSYmVNuwf_mN_t4werET0bEWDJErhD9DeM46ou5M0M6v5AM8Fl3SbOAptP3KfRjpL5pm7fkCduQf1DVrv3mEE7IkmZw'
  }
])

// 搜索回调
const onSearch = (searchValue: string) => {
  // 跳转到搜索页并携带查询参数
  router.push({ name: 'Search', query: { q: searchValue } })
}

/**
 * 获取用户借阅统计
 */
const handleUserLendTotal = () => {
  getUserLendTotal().then((res) => {
    stats.value[0]!.value = res.data.data.lendCount
    stats.value[1]!.value = res.data.data.soonOverdueCount
    stats.value[2]!.value = res.data.data.overdueCount
  })
}

// 生命周期
onMounted(() => {
  /**
   * TODO: 在此处调用 API 初始化首页数据
   * 1. 获取当前用户的借阅统计数据 (GET /api/user/stats)
   * 2. 获取热门借阅列表 (GET /api/books/trending)
   * 3. 获取最新入馆列表 (GET /api/books/new-arrivals)
   */
  handleUserLendTotal()
})
</script>

<template>
  <main class="flex-grow w-full max-w-[1440px] mx-auto px-8 py-12">
    <header class="mb-16 flex flex-col md:flex-row gap-12">
      <div class="w-full md:w-1/3">
        <h1 class="text-5xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">
          Libre
        </h1>
        <p class="text-on-surface-variant text-sm uppercase tracking-widest font-label">
          图书馆管理系统
        </p>
      </div>
      <div class="flex-grow w-full">
        <a-config-provider
          :theme="{
            components: {
              Input: {
                controlHeight: 60,
                fontSize: 20
              },
              Button: {
                controlHeight: 60,
                fontSize: 20
              }
            }
          }"
        >
          <a-input-search
            v-model:value="searchQuery"
            placeholder="输入书名、作者或 ISBN 开始搜索..."
            @search="onSearch"
            enter-button
            class="libre-search-input"
          >
          </a-input-search>
        </a-config-provider>
      </div>
    </header>

    <!-- 用户借阅统计卡片（登陆后可见） -->
    <section v-if="userStore.userInfo" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <a-card v-for="stat in stats" :key="stat.title" :bordered="false" class="stat-card">
        <div class="flex justify-between items-start mb-4">
          <span class="text-on-surface-variant font-label text-xs uppercase tracking-widest">{{
            stat.label
          }}</span>
          <span class="material-symbols-outlined" :style="{ color: stat.color }">{{
            stat.icon
          }}</span>
        </div>
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-headline font-bold text-on-surface">{{ stat.value }}</span>
          <span class="text-sm text-on-surface-variant">{{ stat.unit }}</span>
        </div>
      </a-card>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="bg-white rounded-lg overflow-hidden flex flex-col shadow-sm">
        <div class="p-6 pb-0 flex items-center justify-between">
          <h2 class="text-xl font-headline font-bold text-on-surface">热门借阅 (Trending)</h2>
        </div>
        <div class="p-6 flex flex-col gap-3">
          <div
            v-for="book in trendingBooks"
            :key="book.id"
            @click="router.push({ name: 'BookDetail', params: { id: book.id } })"
            class="flex items-center gap-4 p-3 rounded hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            <div class="w-12 h-16 bg-slate-200 rounded shadow-sm overflow-hidden flex-shrink-0">
              <img :src="book.cover" class="w-full h-full object-cover" />
            </div>
            <div class="flex-grow">
              <h3 class="text-sm font-bold text-on-surface leading-snug">{{ book.title }}</h3>
              <p class="text-xs text-on-surface-variant">{{ book.author }} · {{ book.year }}</p>
            </div>
            <div class="text-right">
              <a-tag v-if="book.isHot" color="orange" class="m-0 border-none font-bold">HOT</a-tag>
              <span v-else class="text-xs font-medium text-on-surface-variant"
                >{{ book.holds }} Holds</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg overflow-hidden flex flex-col shadow-sm">
        <div class="p-6 pb-0 flex items-center justify-between">
          <h2 class="text-xl font-headline font-bold text-on-surface">最新入馆 (New Arrivals)</h2>
        </div>
        <div class="p-6 flex flex-col gap-3">
          <div
            v-for="book in newArrivals"
            :key="book.id"
            @click="router.push({ name: 'BookDetail', params: { id: book.id } })"
            class="flex items-center gap-4 p-3 rounded hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div class="w-12 h-16 bg-slate-200 rounded shadow-sm overflow-hidden flex-shrink-0">
              <img :src="book.cover" class="w-full h-full object-cover" />
            </div>
            <div class="flex-grow">
              <h3 class="text-sm font-bold text-on-surface leading-snug">{{ book.title }}</h3>
              <p class="text-xs text-on-surface-variant">{{ book.author }} · {{ book.category }}</p>
            </div>
            <div class="text-right flex flex-col items-end">
              <span v-if="book.isNew" class="text-[10px] uppercase font-bold text-orange-600"
                >New</span
              >
              <span class="text-[10px] text-on-surface-variant uppercase">{{
                book.timeLabel
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* 原生 CSS 修改 Ant Design Vue 组件样式 */

/* 搜索框深度美化 */
:deep(.libre-search-input .ant-input-wrapper .ant-input-affix-wrapper) {
  background-color: #e0e3e6;
  border: none;
  border-radius: 8px;
  padding-left: 1rem;
  font-size: 1.125rem;
}

:deep(.libre-search-input .ant-input-search-button) {
  border: none;
  background-color: #005daa; /* primary */
  border-radius: 0 8px 8px 0;
}

:deep(.libre-search-input .ant-input-affix-wrapper-focused) {
  box-shadow: 0 0 0 2px rgba(0, 93, 170, 0.2);
  background-color: #ffffff;
}

/* 统计卡片样式微调 */
.stat-card {
  background-color: #ffffff;
  transition: all 0.3s ease;
  cursor: pointer;
}

.stat-card:hover {
  background-color: #e6e8eb; /* surface-container-high */
  transform: translateY(-2px);
}

/* 字体家族适配 */
.font-headline {
  font-family: 'Manrope', sans-serif;
}
</style>
