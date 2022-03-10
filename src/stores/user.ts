import { computed, ref, unref } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { UserResDTO } from './user.dto'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(new UserResDTO())
  const userToken = computed(() => unref(userInfo).token)

  const onValidLoginState = () => {
    if (userToken.value) return
    console.log(1)
  }
  return {
    userInfo,
    userToken,
    onValidLoginState,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
