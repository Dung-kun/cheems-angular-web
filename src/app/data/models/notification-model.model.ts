export class NotificationModel {

  constructor(
    public id: number,
    public type: NotificationModelType,
    public title: string,
    public message: string,
    public timeout: number,
  ) { }

}

export enum NotificationModelType {
  success = 0,
  warning = 1,
  error = 2,
  info = 3
}
