import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationService } from '../../services/NavigationService';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {

  }

  homeButtonClick() : void {
    this.navigationService.navigateHome(null);
  }

}
