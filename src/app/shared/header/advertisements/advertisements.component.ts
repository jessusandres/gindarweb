import {Component, OnInit} from '@angular/core';
import {GenericDataService} from '../../../services/generic-data.service';

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styles: []
})
export class AdvertisementsComponent implements OnInit {

  advertisements: { advertisement: string }[] = [];

  constructor(public genericDataService: GenericDataService) {
  }

  ngOnInit(): void {
    // this.genericDataService.getAdvertisements()
    //   .subscribe((advertisements) => {
    //     this.advertisements = advertisements;
    //   });
    const advertisements = {
      ok: true,
      advertisements: [
        {
          advertisement: 'Tenemos un regalo para ti! Usa este código para obtener un 10% de descuento.'
        },
        {
          advertisement: 'Marquesina de pruebas actualizado.'
        }
      ]
    };
    this.advertisements = advertisements.advertisements;
  }

}
