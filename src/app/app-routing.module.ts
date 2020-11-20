import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { AuthGuardActivateService } from './services/auth/auth-guard-activate.service';
import { AuthGuardDeactivateService } from './services/auth/auth-guard-deactivate.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canDeactivate: [AuthGuardDeactivateService] },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardActivateService] },
  { path: 'product/:id', component: ProductComponent, canActivate: [AuthGuardActivateService] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuardActivateService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
