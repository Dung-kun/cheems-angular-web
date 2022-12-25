import { Injectable } from '@angular/core';
import { NotificationModelType } from '@app/data/models/notification-model.model';
import { Subject, Observable } from 'rxjs';
import { NotificationModel } from '../../../data/models/notification-model.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _subject = new Subject<NotificationModel>();
  private _idx = 0;

  constructor() {}

  getObservable(): Observable<NotificationModel> {
    return this._subject.asObservable();
  }

  info(title: string, message: string, timeout = 2500) {
    this._subject.next(
      new NotificationModel(
        this._idx++,
        NotificationModelType.info,
        title,
        message,
        timeout
      )
    );
  }

  success(title: string, message: string, timeout = 2500) {
    this._subject.next(
      new NotificationModel(
        this._idx++,
        NotificationModelType.success,
        title,
        message,
        timeout
      )
    );
  }

  warning(title: string, message: string, timeout = 2500) {
    this._subject.next(
      new NotificationModel(
        this._idx++,
        NotificationModelType.warning,
        title,
        message,
        timeout
      )
    );
  }

  error(title: string, message: string, timeout = 0) {
    this._subject.next(
      new NotificationModel(
        this._idx++,
        NotificationModelType.error,
        title,
        message,
        timeout
      )
    );
  }
}
