import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@app/shares/base/services/notification.service';
import { Subscription } from 'rxjs';
import { NotificationModel, NotificationModelType } from '../../../data/models/notification-model.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notifications: NotificationModel[] = [];
  private _subscription: Subscription;
  constructor(private _notificationService: NotificationService) { }
  icons = {
    success: "ai-circle-check",
    info: "ai-info",
    warning: "ai-circle-alert",
    error: "ai-circle-x"
  };

  private _addNotification(notification: NotificationModel) {
    this.notifications.push(notification);
    console.log('ditmemay');
    if (notification.timeout !== 0) {
      setTimeout(() => this.close(notification), notification.timeout);

    }
  }

 ngOnInit() {
    this._subscription = this._notificationService.getObservable().subscribe(notification => this._addNotification(notification));
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  close(notification: NotificationModel) {
    this.notifications = this.notifications.filter(value => value.id !== notification.id);
  }


className(notification: NotificationModel): string {

    let style: string;

    switch (notification.type) {

      case NotificationModelType.success:
        style = 'success';
        break;

      case NotificationModelType.warning:
        style = 'warning';
        break;

      case NotificationModelType.error:
        style = 'error';
        break;

      default:
        style = 'info';
        break;
    }

    return style;
  }

  iconStyle(notification: NotificationModel) {
    let className = this.className(notification);
    return this.icons[className as keyof typeof this.icons];
  }
}

