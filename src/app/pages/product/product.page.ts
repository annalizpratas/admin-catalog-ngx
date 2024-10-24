import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from 'src/app/shared/utils/loading.service';
import { ProductModel } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;

  productList: ProductModel[] = [];
  productManipulation: ProductModel = {};
  isEditMode = false;

  productCategoryList: { id: number; name: string }[] = [];
  productStatusList: { id: number; name: string }[] = [];

  filterCategory = 0;
  filterPromo = false;

  msgError = '';

  constructor(
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.listProduct();
    this.listProductCategory();
    this.listProductStatus();
  }

  onFilterChange(id_product_category: number): void {
    this.loadingService.show();

    if (!id_product_category || id_product_category == 0) {
      this.listProduct();
      return;
    }

    this.productService
      .getProduct(this.filterPromo, id_product_category)
      .subscribe(
        (data) => {
          this.productList = data.response;
          this.msgError = null;
          this.loadingService.hide();
        },
        (error) => {
          this.productList = null;
          this.msgError = error.error.message;
          this.loadingService.hide();
        }
      );
  }

  openDialog(): void {
    this.isEditMode = false;
    this.productManipulation = {};
    this.dialog.open(this.dialogTemplate);
  }

  editProduct(element: any): void {
    this.isEditMode = true;
    this.productManipulation = { ...element };
    this.dialog.open(this.dialogTemplate);
  }

  deleteProduct(id: number): void {
    this.loadingService.show();

    this.productService.deleteProduct(id).subscribe(
      () => {
        this.productList = this.productList.filter(
          (product) => product.id !== id
        );

        this.loadingService.hide();
      },
      (error) => {
        this.msgError = error.error.message;
        this.loadingService.hide();
      }
    );
  }

  saveProduct(): void {
    this.loadingService.show();

    if (this.isEditMode) {
      this.productService.updateProduct(this.productManipulation).subscribe(
        (data) => {
          const index = this.productList.findIndex(
            (product) => product.id === this.productManipulation.id
          );
          if (index !== -1) {
            this.productList[index] = data.response;
          }

          this.loadingService.hide();
        },
        (error) => {
          this.msgError = error.error.message;
          this.loadingService.hide();
        }
      );
    } else {
      this.productService.createProduct(this.productManipulation).subscribe(
        (data) => {
          this.productList.push(data.response);

          this.loadingService.hide();
        },
        (error) => {
          this.msgError = error.error.message;
          this.loadingService.hide();
        }
      );
    }
    this.closeDialog();
  }

  getUploadedImages(images: string[]): void {
    this.productManipulation.images = images;
  }

  getImageUrl(image: string): string {
    return this.productService.getImages(image);
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  private listProduct(): void {
    this.loadingService.show();

    this.productService.getProduct(this.filterPromo).subscribe(
      (data) => {
        this.productList = data.response;
        this.msgError = null;
        this.loadingService.hide();
      },
      (error) => {
        this.productList = null;
        this.msgError = error.error.message;
        this.loadingService.hide();
      }
    );
  }

  private listProductCategory(): void {
    this.loadingService.show();

    this.productService.getProductCategory().subscribe(
      (data) => {
        this.productCategoryList = data.response;
        this.loadingService.hide();
      },
      (error) => {
        this.msgError = error.error.message;
        this.loadingService.hide();
      }
    );
  }

  private listProductStatus(): void {
    this.loadingService.show();

    this.productService.getProductStatus().subscribe(
      (data) => {
        this.productStatusList = data.response;
        this.loadingService.hide();
      },
      (error) => {
        this.msgError = error.error.message;
        this.loadingService.hide();
      }
    );
  }
}
