import { Component, Renderer2 } from '@angular/core';
import {ActivatedRoute, ChildrenOutletContexts, ResolveEnd, Router } from '@angular/router';
import { NavigationService } from './services/NavigationService';
import { PostService } from './services/PostService';
import { Subscription } from 'rxjs';
import { routeAnimations } from './animations/RouteAnimation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[NavigationService, PostService],
  styleUrls: ['./app.component.scss'],
  animations: [
    routeAnimations
  ]
})
export class AppComponent {
  curtainOpen: boolean = false;
  overlayOpen: boolean = false;
  curtains: NodeListOf<HTMLElement> | null = null;
  overlay: HTMLElement | null = null;
  navigationSubscription: Subscription | null = null;
  postSubscription: Subscription | null = null;
  
  constructor(
    private renderer: Renderer2, 
    private router: Router,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private postService: PostService,
    private contexts: ChildrenOutletContexts,
  ) {
    this.router.events.subscribe((routerData) => {
      if(routerData instanceof ResolveEnd){ 
        console.log(routerData);
        if(routerData.url != '/' && routerData.url != '/home'){
          this.openCurtain()
        } else {
          this.closeCurtain()
        }
      } 
    });
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

    this.navigationSubscription = this.navigationService.navigateHome$
      .subscribe( _ => {
        this.router.navigate(["home"]);
      });
  }

  ngOnDestroy() {
    this.navigationSubscription?.unsubscribe();
  }  

  displayOverlay(): void {
    if (this.overlay != null) {
      this.renderer.setStyle(this.overlay, 'height', '100%');
      this.overlayOpen = true;
    }
  }

  hideOverlay(): void {
    if (this.overlay != null) {
      this.renderer.setStyle(this.overlay, 'height', '0%');
      this.overlayOpen = false;
    }
  }

  toggleOverlay(): void {
    if (this.overlayOpen) {
      this.hideOverlay();
    } else {
      this.displayOverlay();
    }
  }

  displayProjectPage(): void {
    this.openCurtain();
    this.router.navigate(["projects"]);
  }

  openCurtain(): void {
    if (this.curtains != null) {
      this.curtainOpen = true;
      this.hideOverlay();

      this.curtains.forEach((curtain: HTMLElement) => {
        this.renderer.setStyle(curtain, 'width', '100%');
      });
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
    
    this.hideOverlay();
  }

  getRouteAnimationData(): string {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
