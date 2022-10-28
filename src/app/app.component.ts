import { Component, Renderer2 } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { NavigationService } from './services/NavigationService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[NavigationService],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  curtainOpen: boolean = false;
  curtains: NodeListOf<HTMLElement> | null = null;
  overlay: HTMLElement | null = null;
  subscription: Subscription | null = null;
  
  constructor(
    private renderer: Renderer2, 
    private router: Router,
    private navigationService: NavigationService,
  ) {
    this.router.events.subscribe((routerData) => {
      if(routerData instanceof ResolveEnd){ 
        if(routerData.url === '/projects'){
          this.openCurtain()
        } else {
          this.closeCurtain()
        }
      } 
    })
  }

  ngOnInit(): void {
    this.curtains = document.querySelectorAll('.curtain');
    this.overlay = document.getElementById('overlay');

    if (this.curtainOpen && this.curtains) {
      this.curtains.forEach((curtain: HTMLElement) => {
        this.renderer.setStyle(curtain, 'width', '100%');
      });
    } else {
      this.curtains?.forEach((curtain: HTMLElement) => {
        this.renderer.setStyle(curtain, 'width', '0%');
      });
    }

    this.subscription = this.navigationService.navigateHome$
      .subscribe( _ => {
        this.router.navigate(["home"]);
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }  

  displayOverlay(): void {
    if (this.overlay != null) {
      this.renderer.setStyle(this.overlay, 'height', '100%');
    }
  }

  hideOverlay(): void {
    if (this.overlay != null) {
      this.renderer.setStyle(this.overlay, 'height', '0%');
    }
  }

  openCurtain(): void {
    if (this.curtains != null && !this.curtainOpen) {
      this.curtainOpen = !this.curtainOpen;
      this.hideOverlay();
      this.curtains.forEach((curtain: HTMLElement) => {
        this.renderer.setStyle(curtain, 'width', '100%');
      });

      this.router.navigate(["projects"]);
    }
  }

  closeCurtain(): void {
    if (this.curtains != null && this.curtainOpen) {
      this.curtainOpen = !this.curtainOpen;
      this.curtains.forEach((curtain: HTMLElement) => {
        this.renderer.setStyle(curtain, 'width', '0%');
      });

      this.router.navigate([""]);
    }
  }
}
