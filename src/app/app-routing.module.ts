import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { ProductPage } from './pages/product/product.page';
import { ProductStatusPage } from './pages/product-status/product-status.page';
import { ProductCategoryPage } from './pages/product-category/product-category.page';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'produtos', component: ProductPage },
  { path: 'status-produto', component: ProductStatusPage },
  { path: 'categorias-produto', component: ProductCategoryPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
