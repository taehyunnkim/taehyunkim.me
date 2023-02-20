import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';


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
import { PostComponent } from './components/post/post.component';
import { IugaComponent } from './components/iuga/iuga.component';

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
    IugaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    NgxExtendedPdfViewerModule,
    RouterModule.forRoot([
      {
        path: 'home', 
        component: IntroductionComponent,
        data: { animation: 'HomePage' }
      },
      {
        path: 'projects', 
        component: ProjectListComponent,
        data: { animation: 'ProjectPage' }
      },
      {
        path: 'projects/:string', 
        component: PostComponent,
        data: { animation: 'PostPage' }
      },
      {
        path: 'iuga', 
        component: IugaComponent,
        data: { animation: 'PostPage' }
      },
      {
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full'
      },
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
