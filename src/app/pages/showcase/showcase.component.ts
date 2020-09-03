import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {CategoriesState} from '../../store/reducers/categories.reducer';
import {ItemInterface} from '../../interfaces/item.interface';

declare function detailPluging(): any;

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styles: []
})
export class ShowcaseComponent implements OnInit {
  items: ItemInterface[] = [];

  constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    // console.log(this.activatedRoute.snapshot.params);
    this.store.select('categoriesState').subscribe((catState: CategoriesState) => {
      console.log(catState);
      this.items = catState.categories[0].items;
    });
    detailPluging();
  }

}
