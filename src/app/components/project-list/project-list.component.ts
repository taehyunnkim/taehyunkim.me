import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/NavigationService';
import { PostService } from '../../services/PostService';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  constructor(
    private navigationService: NavigationService,
    private postService: PostService,
  ) { }

  ngOnInit(): void {

  }

  homeButtonClick(): void {
    this.navigationService.navigateHome(null);
  }

  showPost(title: string): void {
    this.postService.showPost(title);
  }
}
