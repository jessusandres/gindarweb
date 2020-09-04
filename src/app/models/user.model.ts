export class LogUserModel {
  constructor(public name: string,
              public password: string) {
  }
}

export class UserModel {
  constructor(public name: string,
              public email: string,
              public password: string,
              public token: string = null,
              public id: string = null) {
  }
}

