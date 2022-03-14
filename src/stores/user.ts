import { computed, ref, unref } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { UserResDTO } from './user.dto'
import { set } from '@vueuse/core'
import { merge } from 'lodash-unified'
import store from 'store2'
import { userLoginByTokenReq } from '~/apis/user'

export const NAME_SPACE = 'inb-user'
export const enum UserStorageKey {
  userInfo = 'user-info',
  token = 'X-AUTH-TOKEN',
}
export const userStorage = store.namespace(NAME_SPACE)

export const useUserStore = defineStore(NAME_SPACE, () => {
  const userInfo = ref(new UserResDTO())
  const userToken = computed(() => unref(userInfo).token)

  const setUserInfo = (payload?: UserResDTO) => {
    set(userInfo, merge(new UserResDTO(), payload))
    userStorage.set(UserStorageKey.userInfo, userInfo.value)
    userStorage.set(UserStorageKey.token, userToken.value)
  }
  setUserInfo(userStorage.get(UserStorageKey.userInfo))

  const clearUserInfo = () => setUserInfo()

  const logout = () => {
    clearUserInfo()
  }

  const loginByToken = async () => {
    const { data } = await userLoginByTokenReq()
    data ? setUserInfo(data) : logout()
  }
  userToken.value && loginByToken()

  return {
    userInfo,
    userToken,
    setUserInfo,
    loginByToken,
    logout,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
