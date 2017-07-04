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
import { MarkdownModule } from 'angular2-markdown';
import { AgmCoreModule } from '@agm/core';
import { CreateRouteComponent } from './create-route/create-route.component';
import { AuthModule } from './auth.module';

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
    CreateRouteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MarkdownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAlMwSVS-E3Qtq8napZuoIkwVouZt8hvt0',
      libraries: ['places']
    })
  ],
  exports: [RouterModule, AuthModule, RouteDetailsComponent],
  providers: [MainNavigationComponent],
  bootstrap: [AppComponent, MainNavigationComponent]
})
export class AppModule { }
