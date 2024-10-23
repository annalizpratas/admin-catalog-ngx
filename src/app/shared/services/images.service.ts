import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/reponse.model';
import { environment } from 'src/environment';

@Injectable({ providedIn: 'root' })
export class ImagesService {
  private url: string = environment.apiUrl;

  constructor(private httpCLient: HttpClient,) {}

  getImages(nameImage: string): string {
    return `${this.url}/uploads/${nameImage}`;
  }

  uploadImage(image: File, filename: string): Observable<ResponseModel<string>> {
    const formData = new FormData();
    formData.append('image', image, filename);
    return this.httpCLient.post<ResponseModel<string>>(`${this.url}/images`, formData, {});
  }

  deleteImage(filename: string): Observable<ResponseModel<string>> {
    return this.httpCLient.delete<ResponseModel<string>>(`${this.url}/images/${filename}`, {});
  }

  downloadImage(filename: string): Observable<Blob> {
    return this.httpCLient.get(`${this.url}/images/download/${filename}`, { responseType: 'blob' });
  }
}
