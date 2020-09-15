import {Component, Input, OnInit} from '@angular/core';
import {ItemInterface} from '../../../interfaces/item.interface';

@Component({
  selector: 'app-promotion-item',
  templateUrl: './promotion-item.component.html',
  styles: [
  ]
})
export class PromotionItemComponent implements OnInit {

  @Input() item: ItemInterface;
  constructor() { }

  ngOnInit(): void {
  }

}
