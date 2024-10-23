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
  
  // Product
  getProduct(is_promo: boolean, id_product_category?: number): Observable<ResponseModel<ProductModel[]>> {
    const url = id_product_category
      ? `${this.url}/product-list/${id_product_category}`
      : `${this.url}/product-list`;

    const params: any = {};
    if (is_promo !== undefined) {
      params.is_promo = is_promo;
    }

    return this.http.get<ResponseModel<ProductModel[]>>(`${url}`, { params });
  }

  createProduct(data: ProductModel): Observable<ResponseModel<ProductModel>> {
    return this.http.post<ResponseModel<ProductModel>>(`${this.url}/product`, data, {});
  }

  updateProduct(data: ProductModel): Observable<ResponseModel<ProductModel>> {
    return this.http.put<ResponseModel<ProductModel>>(`${this.url}/product/${data.id}`, data, {});
  }

  deleteProduct(id: number): Observable<ResponseModel<ProductModel>> {
    return this.http.delete<ResponseModel<ProductModel>>(`${this.url}/product/${id}`, {});
  }

  // Product Status
  getProductStatus(): Observable<ResponseModel<{id: number, name: string}[]>> {
    return this.http.get<ResponseModel<{id: number, name: string}[]>>(`${this.url}/product-status-list`, {});
  }

  createProductStatus(data: {id: number, name: string}): Observable<ResponseModel<{id: number, name: string}>> {
    return this.http.post<ResponseModel<{id: number, name: string}>>(`${this.url}/product-status`, data, {});
  }

  updateProductStatus(data: {id: number, name: string}): Observable<ResponseModel<{id: number, name: string}>> {
    return this.http.put<ResponseModel<{id: number, name: string}>>(`${this.url}/product-status/${data.id}`, data, {});
  }

  deleteProductStatus(id: number): Observable<ResponseModel<{id: number, name: string}>> {
    return this.http.delete<ResponseModel<{id: number, name: string}>>(`${this.url}/product-status/${id}`, {});
  }

  // Product Category
  getProductCategory(): Observable<ResponseModel<{id: number, name: string}[]>> {
    return this.http.get<ResponseModel<{id: number, name: string}[]>>(`${this.url}/product-category-list`, {});
  }

  createProductCategory(data: {id: number, name: string}): Observable<ResponseModel<{id: number, name: string}>> {
    return this.http.post<ResponseModel<{id: number, name: string}>>(`${this.url}/product-category`, data, {});
  }

  updateProductCategory(data: {id: number, name: string}): Observable<ResponseModel<{id: number, name: string}>> {
    return this.http.put<ResponseModel<{id: number, name: string}>>(`${this.url}/product-category/${data.id}`, data, {});
  }

  deleteProductCategory(id: number): Observable<ResponseModel<{id: number, name: string}>> {
    return this.http.delete<ResponseModel<{id: number, name: string}>>(`${this.url}/product-category/${id}`, {});
  }
}
