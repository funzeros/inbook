import { set, useToggle } from '@vueuse/core'
import { computed, ref } from 'vue'
import { inbMessage } from './useMessage'

const DEFAULT_PAGE = 1

const DEFAULT_PAGE_SIZE = 10

interface UsePageOption<R, T> {
  api: PageFn<T>
  params: R
}
export const usePage = <R, T>(option: UsePageOption<R, T>) => {
  const { api, params } = option
  const getDefaultQueryParams = (): PageParams<R> => ({
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    ...params,
  })
  const [pageLoading, togglePageLoading] = useToggle(false)
  const queryParams = ref(getDefaultQueryParams())
  const pageData = ref<T[]>([])
  const pageTotal = ref(0)
  const setPage = (page: number) => (queryParams.value.pageSize = page)
  const setPageSize = (pageSize: number) => (queryParams.value.pageSize = pageSize)
  const loadPage = async () => {
    togglePageLoading(true)
    const { data, code, message } = await api(queryParams.value)
    if (code) {
      return inbMessage.error(message)
    }
    const { records, total, page, pageSize } = data
    pageTotal.value = total
    set(pageData, records)
    set(pageTotal, total)
    setPage(page)
    setPageSize(pageSize)
    togglePageLoading(false)
    return data
  }
  const resetPage = () => {
    set(queryParams, getDefaultQueryParams())
  }
  const initPage = async () => {
    resetPage()
    return await loadPage()
  }
  const maxPage = computed(() => {
    return 1 + (pageTotal.value % queryParams.value.pageSize)
  })
  const hasPrevPage = computed(() => {
    return queryParams.value.page > 1
  })
  const hasNextPage = computed(() => {
    return queryParams.value.page < maxPage.value
  })
  const onNextPage = () => {
    if (hasNextPage.value) {
      setPage(queryParams.value.page + 1)
      loadPage()
    }
  }
  const onPrevPage = () => {
    if (hasPrevPage.value) {
      setPage(queryParams.value.page - 1)
      loadPage()
    }
  }
  return {
    queryParams,
    pageData,
    loadPage,
    initPage,
    pageLoading,
    togglePageLoading,
    maxPage,
    hasPrevPage,
    hasNextPage,
    onNextPage,
    onPrevPage,
  }
}
