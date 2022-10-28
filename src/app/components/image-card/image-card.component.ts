import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnInit {
  @Input() imgSrc: string;
  @Input() sizeBig: number;
  @Input() sizeMedium: number;
  @Input() sizeSmall: number;
  size: number;

  constructor(public breakpointObserver: BreakpointObserver) {
    this.imgSrc = "";
    this.sizeBig = 400;
    this.sizeMedium = 300;
    this.sizeSmall = 100; 
    this.size = 0;
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(min-width: 1100px)', '(min-width: 768px)'])
      .subscribe((state: BreakpointState) => {

        if (state.breakpoints['(min-width: 1100px)']) {
          this.size = this.sizeBig;
        } else if (state.breakpoints['(min-width: 768px)']) {
          this.size = this.sizeMedium;
        } else {
          this.size = this.sizeSmall;
        }
      });
  }
}
