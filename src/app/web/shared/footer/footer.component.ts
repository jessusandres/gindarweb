import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {Subscription} from "rxjs";
import {GindarInfoInterface} from "../../../admin/interfaces/gindar-info.interface";
import {UiState} from "../../store/reducers/ui.reducer";
import {WebPhones} from "../../interfaces/ui.interfaces";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
    '.custom-wspp {position: fixed; bottom: 100px; right: 15px; z-index: 16000160; background-color: #4dc247;}',
    '.fab .fa-whatsapp .fa-lg {font-size: 30px;}'
  ]
})
export class FooterComponent implements OnInit, OnDestroy {


  storeInfo: GindarInfoInterface;
  uiSubscription: Subscription;
  webPhones: WebPhones = null;
  year: number;

  constructor(private store: Store<AppState>) {
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('uiState').subscribe((uiState: UiState) => {
      this.storeInfo = uiState.storeInfo;
      this.webPhones = uiState.webPhones;
    })
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  whatsappRedirect(type: string) {

    if (type === 'G' && this.webPhones?.gindarPhones.length > 0) {

      const randomPhone = this.webPhones.gindarPhones[Math.floor(Math.random() * this.webPhones.gindarPhones.length)];
      window.open(`https://api.whatsapp.com/send?phone=${randomPhone.phone}`, '_blank');

    } else if (type === 'R' && this.webPhones?.rogerPhones.length > 0) {

      const randomPhone = this.webPhones.rogerPhones[Math.floor(Math.random() * this.webPhones.rogerPhones.length)];
      window.open(`https://api.whatsapp.com/send?phone=${randomPhone.phone}`, '_blank');

    }
  }
}
