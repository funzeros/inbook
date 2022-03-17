import { computed, ref, unref } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { UserAuth, UserResDTO } from './user.dto'
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
  /**
   * @author Gems
   * @date 2022/03/16 20:43:14
   * @description 启动时初始化一次UserInfo
   */
  setUserInfo(userStorage.get(UserStorageKey.userInfo))

  const clearUserInfo = () => setUserInfo()

  const logout = () => {
    clearUserInfo()
    location.reload()
  }

  const loginByToken = async () => {
    const { data } = await userLoginByTokenReq()
    data ? setUserInfo(data) : logout()
  }
  /**
   * @author Gems
   * @date 2022/03/16 20:43:05
   * @description 初始化UserInfo后如果有token执行一次token登录
   */
  userToken.value && loginByToken()

  const isAdmin = computed(() => {
    return userInfo.value.auth === UserAuth.admin
  })

  return {
    userInfo,
    userToken,
    isAdmin,
    setUserInfo,
    loginByToken,
    logout,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
