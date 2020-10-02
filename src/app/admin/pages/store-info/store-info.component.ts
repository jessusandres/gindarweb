import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppAdminState, selectFeatureGStore} from '../../store/admin-app.reducer';
import {Subscription} from 'rxjs';
import {GindarInfoInterface} from '../../interfaces/gindar-info.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EMAIL_REGEX, WEB_REGEX} from '../../../config/config';
import {AdminStoreInfoAction, AdminUpdateStoreInfoAction} from '../../store/actions/admin-dashboard.actions';

@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styles: []
})
export class StoreInfoComponent implements OnInit, OnDestroy {

  loading: boolean;
  loaded: boolean;
  errorMessage: string;
  storeInfoForm: FormGroup;


  gStoreSubs: Subscription;

  constructor(private store: Store<AppAdminState>) {
  }

  ngOnInit(): void {

    const phoneValidators = [Validators.maxLength(9), Validators.minLength(9)];


    this.storeInfoForm = new FormGroup({
      ruc: new FormControl(null, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ]),
      businessReason: new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ]),
      phone1: new FormControl(null, phoneValidators),
      phone2: new FormControl(null, phoneValidators),
      phone3: new FormControl(null, phoneValidators),
      email: new FormControl(null, [Validators.pattern(EMAIL_REGEX)]),
      address1: new FormControl(null, [Validators.minLength(5)]),
      address2: new FormControl(null, [Validators.minLength(5)]),
      metaDescription: new FormControl(null, [Validators.minLength(15)]),
      facebookLink1: new FormControl(null, [Validators.pattern(WEB_REGEX)]),
      facebookLink2: new FormControl(null, [Validators.pattern(WEB_REGEX)]),
      instagramLink: new FormControl(null, [Validators.pattern(WEB_REGEX)]),
      youtubeLink: new FormControl(null, [Validators.pattern(WEB_REGEX)]),
      twitterLink: new FormControl(null, [Validators.pattern(WEB_REGEX)]),
      messengerLink: new FormControl(null, [Validators.pattern(WEB_REGEX)]),
    });

    this.gStoreSubs = this.store.select(selectFeatureGStore).subscribe((gstoreState) => {

      this.loading = gstoreState.loading;
      this.errorMessage = gstoreState.errorMessage;
      this.loaded = gstoreState.loaded;
      this.storeInfoForm.patchValue({
        ...gstoreState
      });
    });

    if (!this.loaded) {
      this.store.dispatch(new AdminStoreInfoAction());
    }
  }

  ngOnDestroy(): void {
    this.gStoreSubs.unsubscribe();
  }

  updateInfo(): void {
    if (this.storeInfoForm.invalid) {
      this.errorMessage = 'Ingrese datos válidos';
      return;
    }
    this.errorMessage = null;

    const info = {
      ...this.storeInfoForm.value
    };

    this.store.dispatch(new AdminUpdateStoreInfoAction({info}));

  }
}
