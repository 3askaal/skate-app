import { Component, ViewChild, Input, ElementRef, HostListener, AfterViewInit } from '@angular/core';

@Component({
  selector: 'content',
  templateUrl: './content.html',
})
export class Content implements AfterViewInit {
  @ViewChild('content') content;
  @Input() center: boolean;
  @Input() padding: boolean;
  @Input() noPaddingTop: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.scaleWrapper();
  }

  ngAfterViewInit() {
    this.scaleWrapper();
  }

  scaleWrapper() {
    let height = window.innerHeight;
    let offset = this.content.nativeElement.getBoundingClientRect().top;

    height = height - offset;

    let footer = document.querySelector('footer');
    if (footer) {
      height = height - footer.clientHeight;
    }

    this.content.nativeElement.style.height = height + 'px';
  }
}
