import { computed, ref, unref } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { UserResDTO } from './user.dto'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(new UserResDTO())
  const userToken = computed(() => unref(userInfo).token)

  const setUserInfo = (payload: UserResDTO) => {
    userInfo.value = payload
  }
  return {
    userInfo,
    userToken,
    setUserInfo,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
