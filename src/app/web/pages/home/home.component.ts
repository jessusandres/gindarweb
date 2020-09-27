import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {Subscription} from 'rxjs';
import {UiState} from '../../store/reducers/ui.reducer';

declare function WOW(): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  sliders: { image: string }[];

  featured = [
    {code: 1, tag: 'example'},
    {code: 2, tag: 'example'},
    {code: 3, tag: 'example'},
    {code: 4, tag: 'example'},
    {code: 5, tag: 'example'},
    {code: 6, tag: 'example'},
    {code: 7, tag: 'example'},
    {code: 8, tag: 'example'}
  ];

  videoItems = [
    // {
    //   code: 4,
    //   url: 'cJmyzpUPaRU',
    //   text: 'RELOJ INVICTA TRITNITE',
    // },
  ];

  uiSubscription: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.uiSubscription = this.store.select('uiState').subscribe((uiState: UiState) => {
      this.sliders = uiState.sliders;
    });

    setTimeout(() => {
      WOW().init();
    }, 0);
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}
