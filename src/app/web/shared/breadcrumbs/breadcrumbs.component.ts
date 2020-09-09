import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  prevPages: string[] = [];
  currentPage: string;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.prevPages = this.activatedRoute.snapshot.data.prev || [];
    this.currentPage = this.activatedRoute.snapshot.data.page || 'Inicio';
  }

}
