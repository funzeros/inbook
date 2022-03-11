const enum UserAuth {
  normal,
  admin,
}

export class UserBase {
  username = ''
}
export class UserSignForm extends UserBase {
  password = ''
  email = ''
}
export class UserResDTO extends UserBase {
  id = 0
  token = ''
  auth: UserAuth = 0
}
