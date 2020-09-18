import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  prevPages: string[] = [];
  currentPage: string;

  storeSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.prevPages = this.activatedRoute.snapshot.data.prev || [];
    this.currentPage = this.activatedRoute.snapshot.data.page || 'Inicio';

    this.storeSubscription = this.store.select('uiState').subscribe((uiState) => {
      if (uiState.itemDetailName) {
        this.currentPage = uiState.itemDetailName;
      }
    });
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

}
