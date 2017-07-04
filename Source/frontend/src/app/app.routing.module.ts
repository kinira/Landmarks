import { SearchResultComponent } from './search-result/search-result.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoriesComponent } from './stories/stories.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateRouteComponent } from './create-route/create-route.component';
import { RouteDetailsComponent } from './route-details/route-details.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'search/:keyword', component: SearchResultComponent },
  { path: 'stories', component: StoriesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-route/:city', component: CreateRouteComponent },
  { path: 'routes/:routeId', component: RouteDetailsComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
