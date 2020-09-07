export class LogUserModel {
  constructor(public email: string,
              public password: string) {
  }
}

export class UserModel {
  constructor(public name: string,
              public lastname: string,
              public email: string,
              public password: string = null,
              public token: string = null,
              public id: string = null) {
  }
}

export class UserRegisterModel {
  constructor(public name: string,
              public lastname: string,
              public email: string,
              public password: string,
              public phone: string,
              public address: string,
              public documentOI: string) {
  }
}

