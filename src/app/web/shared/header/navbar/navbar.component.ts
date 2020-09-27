import {Component, OnDestroy, OnInit} from '@angular/core';
import {SublineInterface} from '../../../interfaces/subline.interface';
import {WebRuc} from '../../../types/types';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {Subscription} from 'rxjs';
import {UiState} from '../../../store/reducers/ui.reducer';
import {InvictaItem} from '../../../interfaces/ui.interfaces';

declare function mdbMinPlugin(): any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  subLines: SublineInterface[] = [];

  invictaMenu: InvictaItem[][];
  invictaMobileItems: InvictaItem[] = [];

  uiSubscription: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.subLines = [
      {
        rucPrefix: '20',
        ruc: WebRuc.GINDAR,
        name: 'RELOJES',
        code: '010107',
        imageCode: 1,
        filter: 1,
      },
      {
        ruc: WebRuc.GINDAR,
        rucPrefix: '20',
        name: 'CAJAS PARA RELOJ INVICTA',
        filter: 1,
        code: '010112',
        imageCode: 2
      },
      {
        ruc: WebRuc.GINDAR,
        rucPrefix: '20',
        name: 'CORREAS DE RELOJ',
        code: '010111',
        filter: 1,
        imageCode: 3
      },
      {
        ruc: WebRuc.ROGER,
        rucPrefix: '10',
        name: 'LENTES',
        filter: 1,
        code: '000000',
        imageCode: 4
      },
      {
        ruc: WebRuc.ROGER,
        rucPrefix: '10',
        name: 'CARTERAS',
        filter: 2,
        code: '000000',
        imageCode: 5
      },
      {
        ruc: WebRuc.ROGER,
        rucPrefix: '10',
        name: 'CROSSBODYS',
        filter: 2,
        code: '000000',
        imageCode: 6
      },
      {
        ruc: WebRuc.ROGER,
        rucPrefix: '10',
        name: 'RELOJES',
        filter: 2,
        code: '010109',
        imageCode: 7
      },
      {
        ruc: WebRuc.ROGER,
        rucPrefix: '10',
        name: 'LENTES',
        filter: 2,
        code: '000000',
        imageCode: 8
      }
    ];

    this.uiSubscription = this.store.select('uiState').subscribe((uiState: UiState) => {

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
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}
