import { Media } from "./media.model";
import { Role } from "./role.model";

export class User {
  constructor(
    public id: string = '',
    public fullname: string = '',
    public email: string = '',
    public phone: string = '',
    public dob: Date = null,
    public status: boolean = false,
    public password: string = '',
    public roles: Role[] = [],
    public medias: Media[] = [],
    public address: string = ''
  ) {}
}
