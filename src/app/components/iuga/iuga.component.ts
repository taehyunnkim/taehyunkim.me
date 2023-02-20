import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './iuga.component.html',
  styleUrls: ['./iuga.component.scss'],
})
export class IugaComponent implements OnInit {
  pdfSrc = "/assets/pdf/iuga-it-compressed.pdf";
  
  constructor() { }

  ngOnInit(): void {
  }

}
