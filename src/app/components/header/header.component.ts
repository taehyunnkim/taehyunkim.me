import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() openOverlay: EventEmitter<any> = new EventEmitter();
  @Output() openCurtain: EventEmitter<any> = new EventEmitter();
  @Output() closeCurtain: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }

  displayOverlay() {
    this.openOverlay.emit(null);
  }

  displayCurtain() {
    this.openCurtain.emit(null);
  }

  hideCurtain() {
    this.closeCurtain.emit(null);
  }
}
