import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppAdminState, selectFeatureGStore} from '../../store/admin-app.reducer';
import {Subscription} from 'rxjs';
import {GindarInfoInterface} from '../../interfaces/gindar-info.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EMAIL_REGEX, WEB_REGEX} from '../../../config/config';

@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styles: []
})
export class StoreInfoComponent implements OnInit, OnDestroy {

  storeInfo: GindarInfoInterface;
  loading: boolean;
  storeInfoForm: FormGroup;


  gStoreSubs: Subscription;

  constructor(private store: Store<AppAdminState>) {
  }

  ngOnInit(): void {
    // console.log('init');

    const phoneValidators = [Validators.maxLength(9), Validators.minLength(9)];

    this.storeInfoForm = new FormGroup({
      ruc: new FormControl(null, [Validators.required]),
      businessReason: new FormControl(null, [Validators.required]),
      phone1: new FormControl(null, phoneValidators),
      phone2: new FormControl(null, phoneValidators),
      phone3: new FormControl(null, phoneValidators),
      email: new FormControl(null, [Validators.pattern(EMAIL_REGEX)]),
      address1: new FormControl(null, [Validators.minLength(5)]),
      address2: new FormControl(null, [Validators.minLength(5)]),
      descriptionMeta: new FormControl(null, [Validators.minLength(15)]),
      facebookLink1: new FormControl(null, [Validators.pattern(WEB_REGEX)]),
      facebookLink2: new FormControl(null, [Validators.pattern(WEB_REGEX)]),
      instagramLink: new FormControl(null, [Validators.pattern(WEB_REGEX)]),
      youtubeLink: new FormControl(null, [Validators.pattern(WEB_REGEX)]),
      twitterLink: new FormControl(null, [Validators.pattern(WEB_REGEX)]),
      messengerLink: new FormControl(null, [Validators.pattern(WEB_REGEX)]),
    });

    this.gStoreSubs = this.store.select(selectFeatureGStore).subscribe((gstoreState) => {
      if (gstoreState.loaded === false) {
        // this.store.dispatch(new );
      }

      this.loading = gstoreState.loading;
      this.storeInfo = {...gstoreState};
      console.log(this.storeInfo);
    });
  }

  ngOnDestroy(): void {
    this.gStoreSubs.unsubscribe();
  }

  updateInfo(): void {
    console.log(this.storeInfoForm);
  }
}
