import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainNavigationComponent } from './navigation/main-navigation/main-navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app.routing.module';
import { StoriesComponent } from './stories/stories.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { RouteDetailsComponent } from './route-details/route-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavigationComponent,
    DashboardComponent,
    RouteDetailsComponent,
    SearchResultComponent,
    StoriesComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  exports: [RouterModule, RouteDetailsComponent],
  providers: [MainNavigationComponent],
  bootstrap: [AppComponent, MainNavigationComponent]
})
export class AppModule { }
