import {Component, OnInit} from '@angular/core';
import {GenericDataService} from '../../../services/generic-data.service';
import {CategorieInterface} from '../../../interfaces/categories.response.interface';


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
    const data =
      {
        ok: true,
        categories: [
          {
            subCategorieName: 'RELOJES',
            categorieCode: 1,
            subCategorieCode: 12,
            imageCode: 1
          },
          {
            subCategorieName: 'CAJAS PARA RELOJ INVICTA',
            categorieCode: 1,
            subCategorieCode: 10,
            imageCode: 2
          },
          {
            subCategorieName: 'CORREAS DE RELOJ',
            categorieCode: 1,
            subCategorieCode: 9,
            imageCode: 3
          },
          {
            subCategorieName: 'LENTES',
            categorieCode: 1,
            subCategorieCode: 15,
            imageCode: 4
          },
          {
            subCategorieName: 'CARTERAS',
            categorieCode: 2,
            subCategorieCode: 5,
            imageCode: 5
          },
          {
            subCategorieName: 'CROSSBODYS',
            categorieCode: 2,
            subCategorieCode: 17,
            imageCode: 6
          },
          {
            subCategorieName: 'RELOJES',
            categorieCode: 2,
            subCategorieCode: 4,
            imageCode: 7
          },
          {
            subCategorieName: 'LENTES',
            categorieCode: 2,
            subCategorieCode: 16,
            imageCode: 8
          }
        ]
      };

    this.categories = data.categories;
    // this.genericDataService.getCategories().subscribe((categories: CategorieInterface[]) => this.categories = categories);
  }

}
