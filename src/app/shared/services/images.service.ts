import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpUtilsService } from '../utils/http-utils.service';
import { ResponseModel } from '../models/reponse.model';
import { environment } from 'src/environment';

@Injectable({ providedIn: 'root' })
export class ImagesService {
  private url: string = environment.apiUrl;

  constructor(private http: HttpClient, private httpUtilsService: HttpUtilsService) {}

  getImages(nameImage: string): string {
    return `${this.url}/uploads/${nameImage}`;
  }

  uploadImage(image: File, filename: string): Observable<ResponseModel<string>> {
    const headers = this.httpUtilsService.getHeadersImage();
    const formData = new FormData();
    formData.append('image', image, filename);
    return this.http.post<ResponseModel<string>>(`${this.url}/images`, formData, { headers });
  }

  deleteImage(filename: string): Observable<ResponseModel<string>> {
    const headers = this.httpUtilsService.getHeaders();
    return this.http.delete<ResponseModel<string>>(`${this.url}/images/${filename}`, { headers });
  }
  
  downloadImage(filename: string): Observable<Blob> {
    const headers = this.httpUtilsService.getHeaders();
    return this.http.get(`${this.url}/images/download/${filename}`, { responseType: 'blob', headers });
  }
}
