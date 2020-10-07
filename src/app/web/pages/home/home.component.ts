import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {Subscription} from 'rxjs';
import {UiState} from '../../store/reducers/ui.reducer';
import {CoverSquareInterface} from '../../interfaces/cover-squares.interface';
import {SliderItem} from '../../interfaces/ui.interfaces';
import {Router} from '@angular/router';

declare function WOW(): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  sliders: SliderItem[];

  featured: CoverSquareInterface[] = [];

  videoItems = [
    // {
    //   code: 4,
    //   url: 'cJmyzpUPaRU',
    //   text: 'RELOJ INVICTA TRITNITE',
    // },
  ];

  uiSubscription: Subscription;

  constructor(private store: Store<AppState>, private router: Router) {
  }

  ngOnInit(): void {

    this.uiSubscription = this.store.select('uiState').subscribe((uiState: UiState) => {
      this.sliders = uiState.sliders;
      this.featured = uiState.coverSquares;
      setTimeout(() => {
        WOW().init();
      }, 0);
    });


  }

  redirectToText(slider: SliderItem): void {
    if (slider.target === 0) {
      this.router.navigateByUrl(`/vitrina/buscar/${slider.text}`);
    } else {
      window.open(`/vitrina/buscar/${slider.text}`, '_blank');
    }
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}
