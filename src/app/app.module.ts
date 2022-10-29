import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { CardComponent } from './components/card/card.component';
import { TagComponent } from './components/tag/tag.component';
import { RouterModule } from '@angular/router';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ButtonComponent } from './components/button/button.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImageCardComponent,
    CardComponent,
    TagComponent,
    IntroductionComponent,
    ProjectListComponent,
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    RouterModule.forRoot([
      {path: 'home', component: IntroductionComponent},
      {path: 'projects', component: ProjectListComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: '**', component: ProjectListComponent},
    ]),
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIcons(...[faBars, faXmark]);
  }
}
