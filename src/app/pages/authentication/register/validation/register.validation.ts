import { RegisterComponent } from '../register.component';
export class RegisterValidation {
  input: any;
  constructor(public registerComponent: RegisterComponent) {
    this.input = {
      isEmail: 'email',
      isPassword: 'password',
      isFullname: 'fullname',
      isDob: 'dob',
      isRePassword: 'rePassword',
    };
  }

  get isEmail() {
    return this.registerComponent.formBody().get(this.input.isEmail);
  }

  get isEmailInvalid() {
    return this.isEmail.invalid && (this.isEmail.dirty || this.isEmail.touched);
  }

  get isEmailValid() {
    return this.isEmail.valid && (this.isEmail.dirty || this.isEmail.touched);
  }

  get isPassword() {
    return this.registerComponent.formBody().get(this.input.isPassword);
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

  get isRePassword() {
    return this.registerComponent.formBody().get(this.input.isRePassword);
  }

  get isRePasswordInvalid() {
    return (
      (this.isRePassword.invalid || this.isRePassword.value != this.isPassword.value) &&
      (this.isRePassword.dirty || this.isRePassword.touched)
    );
  }

  get isRePasswordValid() {
    return (
      this.isRePassword.valid &&
      (this.isRePassword.dirty || this.isRePassword.touched) &&
      this.isRePassword.value == this.isPassword.value
    );
  }

  get isDob() {
    return this.registerComponent.formBody().get(this.input.isDob);
  }

  get isDobInvalid() {
    return (this.isDob.invalid || ((new Date()).getFullYear() - new Date(this.isDob.value).getFullYear() < 16))  && (this.isDob.dirty || this.isDob.touched);
  }

  get isDobValid() {
    return (this.isDob.valid && (this.isDob.dirty || this.isDob.touched)) && ((new Date()).getFullYear() - new Date(this.isDob.value).getFullYear() >= 16);
  }

  get isFullname() {
    return this.registerComponent.formBody().get(this.input.isFullname);
  }

  get isFullnameInvalid() {
    return (
      this.isFullname.invalid &&
      (this.isFullname.dirty || this.isFullname.touched)
    );
  }

  get isFullnameValid() {
    return (
      this.isFullname.valid &&
      (this.isFullname.dirty || this.isFullname.touched)
    );
  }


  get submitInvalid() {
    return this.isDobInvalid || this.isRePasswordInvalid || this.registerComponent.appForm.invalid;
  }
}
