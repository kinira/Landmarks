import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { MainNavigationComponent } from './navigation/main-navigation/main-navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app.routing.module';
import { SearchResultComponent } from './search-result/search-result.component';
import { StoriesComponent } from './stories/stories.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavigationComponent,
    DashboardComponent,
    SearchResultComponent,
    StoriesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  exports: [RouterModule],
  providers: [MainNavigationComponent],
  bootstrap: [AppComponent, MainNavigationComponent]
})
export class AppModule { }
