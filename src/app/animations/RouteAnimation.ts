import { trigger, transition, style, animate } from '@angular/animations';

export const routeAnimations = 
    trigger('routeAnimations', [ 
      transition('HomePage => ProjectPage', [
        style({ opacity: 0 }), 
        animate("1000ms 500ms cubic-bezier(.23, 1, .32, 1)", style({opacity: 1}))
      ]) 
    ])