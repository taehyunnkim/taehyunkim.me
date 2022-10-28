import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';
  
  constructor(private renderer: Renderer2) { }

  displayOverlay(): void {
    const overlay: HTMLElement | null = document.getElementById('overlay');
    if (overlay != null) {
      this.renderer.setStyle(overlay, 'height', '100%');
    }
  }

  hideOverlay(): void {
    const overlay: HTMLElement | null = document.getElementById('overlay');
    if (overlay != null) {
      this.renderer.setStyle(overlay, 'height', '0%');
    }
  }
}
