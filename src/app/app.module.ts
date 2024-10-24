import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePage } from './pages/home/home.page';
import { ProductPage } from './pages/product/product.page';
import { ProductCategoryPage } from './pages/product-category/product-category.page';
import { ProductStatusPage } from './pages/product-status/product-status.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { BackPageComponent } from './components/back-page/back-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SelectUploadImagesComponent } from './components/back-page/select-upload-images/select-upload-images.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './components/loading/loading.component';
import { LoginPage } from './pages/login/login.page';
import { TokenService } from './shared/utils/token.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    HomePage,
    ProductPage,
    ProductCategoryPage,
    ProductStatusPage,
    BackPageComponent,
    SelectUploadImagesComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgbModule,
    NgbCarouselModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
