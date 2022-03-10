const enum UserAuth {
  normal,
  admin,
}
export class UserResDTO {
  'id' = 0
  'username' = ''
  'token' = ''
  'email' = ''
  'auth': UserAuth = 0
}
