import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class NavigationService {
    private emitNavigateHome = new Subject<any>();
    navigateHome$ = this.emitNavigateHome.asObservable();

    navigateHome(change: any) {
        this.emitNavigateHome.next(change);
    }
}