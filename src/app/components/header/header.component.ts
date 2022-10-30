import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() hamburgerClick: EventEmitter<any> = new EventEmitter();
  @Output() displayProjectPage: EventEmitter<any> = new EventEmitter();
  @Output() closeCurtain: EventEmitter<any> = new EventEmitter();
  
  ngOnInit(): void {
  }

  toggleOverlay(): void {
    this.hamburgerClick.emit(null);
  }

  showProjectPage(): void {
    this.displayProjectPage.emit(null);
  }

  hideCurtain(): void {
    this.closeCurtain.emit(null);
  }
}
