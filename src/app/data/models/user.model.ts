import { Media } from "./media.model";

export class User {
  constructor(
    public id: string = '',
    public fullname: string = '',
    public email: string = '',
    public phone: string = '',
    public dob: Date = null,
    public status: boolean = false,
    public password: string = '',
    public roles: string = '',
    public medias: Media[] = [],
    public address: string = ''
  ) {}
}
