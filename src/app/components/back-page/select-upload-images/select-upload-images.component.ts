import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ImagesService } from 'src/app/shared/services/images.service';

@Component({
  selector: 'app-select-upload-images',
  templateUrl: './select-upload-images.component.html',
  styleUrls: ['./select-upload-images.component.scss'],
})
export class SelectUploadImagesComponent implements OnChanges {
  @Input()
  images: Array<string> = [];

  @Input()
  multiple: boolean = false;

  @Input()
  filename: string = 'imagem';

  @Output()
  imagesSelected: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

  @Output()
  changed: EventEmitter<void> = new EventEmitter<void>();

  imagesManipulateds: Array<string> = [];

  constructor(private imagesService: ImagesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images']?.currentValue) {
      if (this.multiple) {
        this.imagesManipulateds = changes['images'].currentValue;
      } else {
        this.imagesManipulateds = [changes['images'].currentValue[0]];
      }
    }
  }

  uploadImages(image: any): void {
    const selectedFiles = image.target.files;
    let selectedFile = null;

    if (selectedFiles.length > 0) {
      selectedFile = selectedFiles[0];
    }

    if (selectedFile) {
      this.imagesService.uploadImage(selectedFile, this.filename).subscribe((data) => {
        this.imagesManipulateds.unshift(data.response);
        this.imagesSelected.emit(this.imagesManipulateds);
        this.changed.emit();
      });
    }
  }

  deleteImage(image: any): void {
    this.imagesService.deleteImage(image).subscribe(() => {
      this.imagesManipulateds = this.imagesManipulateds.filter((img) => img !== image);
      this.imagesSelected.emit(this.imagesManipulateds);
      this.changed.emit();
    }, (error) => {
      console.error('Error deleting image', error);
      this.imagesManipulateds = this.imagesManipulateds.filter((img) => img !== image);
      this.imagesSelected.emit(this.imagesManipulateds);
      this.changed.emit();
    });
  }

  downloadImage(image: string): void {
    this.imagesService.downloadImage(image).subscribe((data) => {
      console.log('data', data)
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = image;
      a.click();
    });
  }
}
