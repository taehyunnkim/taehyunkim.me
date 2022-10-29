import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() startDate: string;
  @Input() imgSrc: string;
  @Input() title: string;
  @Input() description: string;
  @Input() tags: string[];
  @Input() link: string;
  
  constructor(public breakpointObserver: BreakpointObserver) {
    this.startDate = "January 2000";
    this.title = "Placeholder title"
    this.description = "This is a place holder description for this card."
    this.imgSrc = "";
    this.link = "";
    this.tags = [];
  }

  ngOnInit(): void {
    if (this.breakpointObserver.isMatched("(max-width: 480px)")) {
      this.tags = this.tags.slice(0, 4)
    }
  }

  onClick(): void {
    if (this.link) {
      window.open(this.link, '_blank');
    }
  }
}
