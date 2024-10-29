import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { ProductPage } from './pages/product/product.page';
import { ProductStatusPage } from './pages/product-status/product-status.page';
import { ProductCategoryPage } from './pages/product-category/product-category.page';
import { CanActivateService } from './shared/utils/can-activate.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'home', component: HomePage, canActivate: [CanActivateService] },
  {
    path: 'produtos',
    component: ProductPage,
    canActivate: [CanActivateService],
  },
  {
    path: 'status-produto',
    component: ProductStatusPage,
    canActivate: [CanActivateService],
  },
  {
    path: 'categorias-produto',
    component: ProductCategoryPage,
    canActivate: [CanActivateService],
  },
  { path: '**', component: LoginPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
