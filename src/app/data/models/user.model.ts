export class User {
  constructor(
    public id: string = '',
    public fullname: string = '',
    public email: string = '',
    public phone: string = '',
    public dob: string = '',
    public status: boolean = false,
    public password: string = '',
    public roleId: string = '',
    public mediaid: string = '',
  ) {}
}
