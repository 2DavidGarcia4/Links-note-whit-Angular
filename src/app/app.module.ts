import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule  } from '@angular/material/icon'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { GroupComponent } from './components/group/group.component';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './pages/home/home.component';
import { LinkCardComponent } from './components/link-card/link-card.component';
import { LinkGroupComponent } from './components/link-card/link-group/link-group.component';
import { GroupPageComponent } from './pages/group-page/group-page.component';
import { LinksComponent } from './components/links/links.component';
import { AboutComponent } from './pages/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToolbarComponent,
    GroupComponent,
    FormComponent,
    LinkCardComponent,
    HomeComponent,
    LinkGroupComponent,
    GroupPageComponent,
    LinksComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    MatIconModule,
    NgOptimizedImage,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
