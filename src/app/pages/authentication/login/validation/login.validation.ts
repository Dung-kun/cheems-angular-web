import { LoginComponent } from '../login.component';

export class LoginValidation {
  input: any;
  constructor(public loginComponent: LoginComponent) {
    this.input = {
      isEmail: 'email',
      isPassword: 'password',
    };
  }

  get isEmail() {
    return this.loginComponent.formBody().get(this.input.isEmail);
  }

  get isEmailInvalid() {
    return this.isEmail.invalid && (this.isEmail.dirty || this.isEmail.touched);
  }

  get isEmailValid() {
    return this.isEmail.valid && (this.isEmail.dirty || this.isEmail.touched);
  }

  get isPassword() {
    return this.loginComponent.formBody().get(this.input.isPassword);
  }

  get isPasswordInvalid() {
    return (
      this.isPassword.invalid &&
      (this.isPassword.dirty || this.isPassword.touched)
    );
  }

  get isPasswordValid() {
    return (
      this.isPassword.valid &&
      (this.isPassword.dirty || this.isPassword.touched)
    );
  }

  get submitInvalid() {
    return this.loginComponent.appForm.invalid;
  }
}
