import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styles: []
})
export class VideoItemComponent implements OnInit {

  @Input() videoItem: any;
  safeUrl: SafeUrl = '';

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoItem.url}`);
  }

}
