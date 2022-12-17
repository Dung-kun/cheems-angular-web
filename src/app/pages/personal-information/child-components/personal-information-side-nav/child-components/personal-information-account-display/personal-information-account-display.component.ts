import { Component, OnInit } from '@angular/core';
import { PersonalInformation } from '@app/pages/personal-information/models/personal-information.model';
import { PageViewModelBasedComponent } from '@app/shares/base/framework/page-view-model-based-component';
import { BehaviorSubject, combineLatest, tap } from 'rxjs';
import { PersonalInformationAccountDisplayPageViewModel } from './models/personal-information-account-display-page-view.model';
import { PersonalInformationAccountDisplayViewData } from './models/personal-information-account-display-view-data.model';

@Component({
  selector: 'app-personal-information-account-display',
  templateUrl: './personal-information-account-display.component.html',
  styleUrls: ['./personal-information-account-display.component.scss']
})
export class PersonalInformationAccountDisplayComponent extends PageViewModelBasedComponent<PersonalInformationAccountDisplayPageViewModel> implements OnInit {



  constructor() {
    super();
  }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.items$]).pipe(
      tap(([value]) =>{
        const viewData = value as PersonalInformationAccountDisplayViewData;
        this.pageViewModel$.next({
          ...this.pageViewModel$.getValue(),
          personalIdentifier: viewData.personalIdentifier
        })
      })
    ).subscribe(() => {
      let _identifier = this.pageViewModel$.getValue().personalIdentifier;
      if(!!!_identifier) {
        this.pageViewModel$.next({
          ...this.pageViewModel$.getValue(),
          personalInformation: new PersonalInformation
        })
      }
      else {
        let MUT_VALS = {
          input: {
            id: _identifier,
          }
        }
      }
    })

    this.subscriptions$.push(onInit$);
  }

}
