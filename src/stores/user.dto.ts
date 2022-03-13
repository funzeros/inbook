import md5 from 'md5'
const enum UserAuth {
  normal,
  admin,
}

export class UserBase {
  username = ''
  email = ''
}
export class UserSignForm extends UserBase {
  password = ''
  static encrypt(payload: UserSignForm) {
    return {
      ...payload,
      password: md5(payload.password),
    }
  }
}
export class UserResDTO extends UserBase {
  id = 0
  token = ''
  auth: UserAuth = 0
}
