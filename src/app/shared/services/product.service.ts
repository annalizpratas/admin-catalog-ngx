import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpUtilsService } from '../utils/http-utils.service';
import { ProductModel } from '../models/product.model';
import { ResponseModel } from '../models/reponse.model';
import { environment } from 'src/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  url = environment.apiUrl;

  constructor(private http: HttpClient, private httpUtilsService: HttpUtilsService) {}
  
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
    const headers = this.httpUtilsService.getHeaders();
    return this.http.post<ResponseModel<ProductModel>>(`${this.url}/product`, data,  { headers });
  }

  updateProduct(data: ProductModel): Observable<ResponseModel<ProductModel>> {
    const headers = this.httpUtilsService.getHeaders();
    return this.http.put<ResponseModel<ProductModel>>(`${this.url}/product/${data.id}`, data,  { headers });
  }

  deleteProduct(id: number): Observable<ResponseModel<ProductModel>> {
    const headers = this.httpUtilsService.getHeaders();
    return this.http.delete<ResponseModel<ProductModel>>(`${this.url}/product/${id}`,  { headers });
  }

  // Product Status
  getProductStatus(): Observable<ResponseModel<{id: number, name: string}[]>> {
    const headers = this.httpUtilsService.getHeaders();
    return this.http.get<ResponseModel<{id: number, name: string}[]>>(`${this.url}/product-status-list`,  { headers });
  }

  createProductStatus(data: {id: number, name: string}): Observable<ResponseModel<{id: number, name: string}>> {
    const headers = this.httpUtilsService.getHeaders();
    return this.http.post<ResponseModel<{id: number, name: string}>>(`${this.url}/product-status`, data,  { headers });
  }

  updateProductStatus(data: {id: number, name: string}): Observable<ResponseModel<{id: number, name: string}>> {
    const headers = this.httpUtilsService.getHeaders();
    return this.http.put<ResponseModel<{id: number, name: string}>>(`${this.url}/product-status/${data.id}`, data,  { headers });
  }

  deleteProductStatus(id: number): Observable<ResponseModel<{id: number, name: string}>> {
    const headers = this.httpUtilsService.getHeaders();
    return this.http.delete<ResponseModel<{id: number, name: string}>>(`${this.url}/product-status/${id}`,  { headers });
  }

  // Product Category
  getProductCategory(): Observable<ResponseModel<{id: number, name: string}[]>> {
    const headers = this.httpUtilsService.getHeaders();
    return this.http.get<ResponseModel<{id: number, name: string}[]>>(`${this.url}/product-category-list`,  { headers });
  }

  createProductCategory(data: {id: number, name: string}): Observable<ResponseModel<{id: number, name: string}>> {
    const headers = this.httpUtilsService.getHeaders();
    return this.http.post<ResponseModel<{id: number, name: string}>>(`${this.url}/product-category`, data,  { headers });
  }

  updateProductCategory(data: {id: number, name: string}): Observable<ResponseModel<{id: number, name: string}>> {
    const headers = this.httpUtilsService.getHeaders();
    return this.http.put<ResponseModel<{id: number, name: string}>>(`${this.url}/product-category/${data.id}`, data,  { headers });
  }

  deleteProductCategory(id: number): Observable<ResponseModel<{id: number, name: string}>> {
    const headers = this.httpUtilsService.getHeaders();
    return this.http.delete<ResponseModel<{id: number, name: string}>>(`${this.url}/product-category/${id}`,  { headers });
  }

  // IMAGES
  getImages(nameImage: string): string {
    return `${this.url}/uploads/${nameImage}`;
  }
}
