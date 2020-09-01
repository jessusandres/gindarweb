import {Component, OnInit} from '@angular/core';
import {GenericDataService} from '../../../services/generic-data.service';
import {CategorieInterface} from '../../../interfaces/categories.response';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  categories: CategorieInterface[] = [];

  constructor(public genericDataService: GenericDataService) {
  }

  ngOnInit(): void {

    this.genericDataService.getCategories().subscribe((categories: CategorieInterface[]) => this.categories = categories);
    console.log(this.categories);
  }

}
