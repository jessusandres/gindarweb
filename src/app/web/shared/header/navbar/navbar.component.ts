import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {Subscription} from 'rxjs';
import {UiState} from '../../../store/reducers/ui.reducer';
import {InvictaItem} from '../../../interfaces/ui.interfaces';
import {GenderItemInterface, GenderMenuInterface} from '../../../interfaces/gender-menu.interface';
import {GindarInfoInterface} from '../../../../admin/interfaces/gindar-info.interface';

declare function mdbMinPlugin(): any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  invictaMenu: InvictaItem[][];
  invictaMobileItems: InvictaItem[] = [];

  manMobileMenu: GenderItemInterface[] = [];
  womanMobileMenu: GenderItemInterface[] = [];
  genderMenu: GenderMenuInterface;
  storeInfo: GindarInfoInterface = null;

  uiSubscription: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.uiSubscription = this.store.select('uiState').subscribe((uiState: UiState) => {

      this.storeInfo = uiState.storeInfo;

      if (this.invictaMenu !== uiState.invictaMenuTags) {

        this.invictaMenu = uiState.invictaMenuTags;

        if (this.invictaMenu.length > 0) {
          const itemsForMobileMenu = [];
          this.invictaMenu.forEach((item) => {
            item.forEach((tag) => {
              itemsForMobileMenu.push(tag);
            });
          });

          this.invictaMobileItems = itemsForMobileMenu;
        }

        setTimeout(() => {
          mdbMinPlugin();
        });
      }

      if (this.genderMenu !== uiState.genderMenu) {
        this.genderMenu = uiState.genderMenu;

        if (this.genderMenu) {
          const womanmenu: GenderItemInterface[] = [];
          this.genderMenu.womanMenu.forEach(item => {
            item.forEach(tag => womanmenu.push(tag));
          });

          this.womanMobileMenu = womanmenu;

          const manmenu: GenderItemInterface[] = [];
          this.genderMenu.manMenu.forEach(item => {
            item.forEach(tag => manmenu.push(tag));
          });

          this.manMobileMenu = manmenu;

          setTimeout(() => {
            mdbMinPlugin();
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}
