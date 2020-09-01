import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styles: []
})
export class CarouselItemComponent implements OnInit {

  @Input() advertisementText: string;
  @Input() active: boolean;

  constructor() {
  }

  ngOnInit(): void {
    // console.log(this.active);
  }

}
