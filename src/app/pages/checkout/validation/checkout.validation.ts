import { CheckoutComponent } from '../checkout.component';
export class CheckoutValidation {
  public input: any;
  public monthArray: string[] = [
    '',
    '31',
    '30',
    '31',
    '30',
    '31',
    '30',
    '31',
    '31',
    '30',
    '31',
    '30',
    '31',
  ];
  constructor(public checkoutComponent: CheckoutComponent) {
    this.input = {
      isFullname: 'fullname',
      isDay: 'day',
      isMonth: 'month',
      isYear: 'year',
      isAddress: 'address',
      isPhone: 'phone',
    };
  }

  get isFullname() {
    return this.checkoutComponent.formBody().get(this.input.isFullname);
  }

  get isFullnameInvalid() {
    return this.isFullname.invalid;
  }

  get isDay() {
    return this.checkoutComponent.formBody().get(this.input.isDay);
  }

  get isDayInvalid() {
    if (this.isYear.value && this.isMonth.value) {
      if (this.isMonth.value == 2) {
        if (this.checkNamNhuan(this.isYear.value)) {
          if (this.isDay.value > 29) return true;
        } else {
          if (this.isDay.value > 28) return true;
        }
      } else {
        if (
          this.isMonth.value > 0 &&
          this.isMonth.value <= 12 &&
          this.isDay.value > this.monthArray[this.isMonth.value]
        )
          return true;
      }
    }

    return this.isDay.invalid;
  }

  get isMonth() {
    return this.checkoutComponent.formBody().get(this.input.isMonth);
  }

  get isMonthInvalid() {
    return this.isMonth.invalid;
  }

  get isAddress() {
    return this.checkoutComponent.formBody().get(this.input.isAddress);
  }

  get isAddressInvalid() {
    return this.isAddress.invalid;
  }

  get isYear() {
    return this.checkoutComponent.formBody().get(this.input.isYear);
  }

  get isYearInvalid() {
    return this.isYear.invalid;
  }

  get isTimeInvalid() {
    return this.isYearInvalid || this.isDayInvalid || this.isMonthInvalid;
  }

  get isPhone() {
    return this.checkoutComponent.formBody().get(this.input.isPhone);
  }

  get isPhoneInvalid() {
    return this.isPhone.invalid;
  }

  get isSubmitInvalid() {
    // return (
    //   this.isAddressInvalid ||
    //   this.isDayInvalid ||
    //   this.isYearInvalid ||
    //   this.isMonthInvalid ||
    //   this.isPhoneInvalid ||
    //   this.isFullnameInvalid
    // );
    return this.checkoutComponent.appForm.invalid;
  }

  checkNamNhuan(year: number) {
    if (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
