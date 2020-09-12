import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styles: []
})
export class AdminFooterComponent implements OnInit {
  year: any;

  constructor() {
  }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }

}
