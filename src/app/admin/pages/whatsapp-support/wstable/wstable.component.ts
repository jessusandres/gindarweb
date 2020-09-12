import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-wstable',
  templateUrl: './wstable.component.html',
  styles: []
})
export class WstableComponent implements OnInit {

  @Input() ruc: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  addWhatsapp(): void {
    console.log(this.ruc);
  }
}
