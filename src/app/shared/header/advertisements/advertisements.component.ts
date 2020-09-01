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
    this.genericDataService.getAdvertisements()
      .subscribe((advertisements) => {
        this.advertisements = advertisements;
      });
  }

}
