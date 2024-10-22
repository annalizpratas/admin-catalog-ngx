import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { ResponseModel } from '../models/reponse.model';
import { environment } from 'src/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Product Status
  getProductStatus(): Observable<ResponseModel<ProductModel[]>> {
    return this.http.get<ResponseModel<ProductModel[]>>(`${this.url}/product-status-list`, {});
  }

  createProductStatus(data: ProductModel): Observable<ResponseModel<ProductModel>> {
    return this.http.post<ResponseModel<ProductModel>>(`${this.url}/product-status`, data, {});
  }

  updateProductStatus(data: ProductModel): Observable<ResponseModel<ProductModel>> {
    return this.http.put<ResponseModel<ProductModel>>(`${this.url}/product-status/${data.id}`, data, {});
  }

  deleteProductStatus(id: number): Observable<ResponseModel<ProductModel>> {
    return this.http.delete<ResponseModel<ProductModel>>(`${this.url}/product-status/${id}`, {});
  }

  // Product Category
  getProductCategory(): Observable<ResponseModel<ProductModel[]>> {
    return this.http.get<ResponseModel<ProductModel[]>>(`${this.url}/product-category-list`, {});
  }

  createProductCategory(data: ProductModel): Observable<ResponseModel<ProductModel>> {
    return this.http.post<ResponseModel<ProductModel>>(`${this.url}/product-category`, data, {});
  }

  updateProductCategory(data: ProductModel): Observable<ResponseModel<ProductModel>> {
    return this.http.put<ResponseModel<ProductModel>>(`${this.url}/product-category/${data.id}`, data, {});
  }

  deleteProductCategory(id: number): Observable<ResponseModel<ProductModel>> {
    return this.http.delete<ResponseModel<ProductModel>>(`${this.url}/product-category/${id}`, {});
  }
}
