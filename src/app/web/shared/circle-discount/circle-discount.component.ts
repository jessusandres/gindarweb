import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-circle-discount',
  templateUrl: './circle-discount.component.html',
  styles: [
  ]
})
export class CircleDiscountComponent implements OnInit {
  @Input() discount: string;

  constructor() { }

  ngOnInit(): void {
  }

}
