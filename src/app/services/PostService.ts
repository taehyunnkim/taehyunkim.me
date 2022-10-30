import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class PostService {
    private emitShowPost = new Subject<string>();
    showPost$ = this.emitShowPost.asObservable();

    showPost(post: string) {
        this.emitShowPost.next(post);
    }
}