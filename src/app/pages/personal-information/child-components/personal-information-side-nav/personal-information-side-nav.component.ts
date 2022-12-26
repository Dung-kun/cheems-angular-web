import { Component, Input, OnInit, Output } from '@angular/core';
import { PageViewModelBasedComponent } from '@app/shares/base/framework/page-view-model-based-component';
import { BehaviorSubject, combineLatest, tap } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { PersonalInformationAccountDisplayViewData } from './child-components/personal-information-account-display/models/personal-information-account-display-view-data.model';
import { PersonalInformationSideNavPageViewModel } from './models/personal-information-side-nav-page-view.model';
import { PersonalInformationSideNavViewData } from './models/personal-information-side-nav-view-data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-information-side-nav',
  templateUrl: './personal-information-side-nav.component.html',
  styleUrls: ['./personal-information-side-nav.component.scss']
})
export class PersonalInformationSideNavComponent extends PageViewModelBasedComponent<PersonalInformationSideNavPageViewModel> implements OnInit {
  @Input() isOpen: Boolean = true;
  @Output() closeNav = new EventEmitter();

  personalInformationAccountDisplayViewData$: BehaviorSubject<PersonalInformationAccountDisplayViewData>;

  constructor(
    private router: Router
  ) {
    super();

    this.personalInformationAccountDisplayViewData$ = new BehaviorSubject<PersonalInformationAccountDisplayViewData>(new PersonalInformationAccountDisplayViewData(''));
  }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.items$]).pipe(
      tap(([value]) =>{
        const viewData = value as PersonalInformationSideNavViewData;
        this.pageViewModel$.next({
          ...this.pageViewModel$.getValue(),
          personalIdentifier: viewData.personalIdentifier
        })
      })
    ).subscribe(() => {
      this.personalInformationAccountDisplayViewData$.next({
        ...this.personalInformationAccountDisplayViewData$.getValue(),
        personalIdentifier: this.pageViewModel$.getValue().personalIdentifier
      })
    })
  }

  onClose() {
    this.closeNav.emit('close');
  }

  navigateTo(url: string) {
    let userId = this.pageViewModel$.getValue().personalIdentifier;
    this.router.navigate(["personal-information", url, userId]);
  }
}
