import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/shared/services/product.service';
import { TemplateRef, ViewChild } from '@angular/core';
import { LoadingService } from 'src/app/shared/utils/loading.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.page.html',
  styleUrls: ['./product-category.page.scss'],
})
export class ProductCategoryPage implements OnInit {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  category: { id: number; name: string } = { id: 0, name: '' };
  isEditMode = false;

  constructor(
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.listProductCategory();
  }

  openDialog(): void {
    this.isEditMode = false;
    this.category = { id: 0, name: '' };
    this.dialog.open(this.dialogTemplate);
  }

  editCategory(element: any): void {
    this.isEditMode = true;
    this.category = { ...element };
    this.dialog.open(this.dialogTemplate);
  }

  deleteCategory(id: number): void {
    this.loadingService.show();

    this.productService.deleteProductCategory(id).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item.id !== id
        );
      },
      (error) => {
        console.error('error', error);
        this.loadingService.hide();
      }
    );
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  saveCategory(): void {
    this.loadingService.show();

    if (this.isEditMode) {
      const index = this.dataSource.data.findIndex(
        (item) => item.id === this.category.id
      );

      if (index !== -1) {
        this.dataSource.data[index] = this.category;
      }

      this.productService.updateProductCategory(this.category).subscribe(
        (data) => {
          this.category = data.response;
          this.loadingService.hide();
        },
        (error) => {
          console.error('error', error);
          this.loadingService.hide();
        }
      );
    } else {
      this.productService.createProductCategory(this.category).subscribe(
        (data) => {
          this.category = data.response;
          this.dataSource.data.push(this.category);
          this.loadingService.hide();
          this.dataSource._updateChangeSubscription();
        },
        (error) => {
          console.error('error', error);
          this.loadingService.hide();
        }
      );
    }
    this.dataSource._updateChangeSubscription();
    this.closeDialog();
  }

  private listProductCategory(): void {
    this.loadingService.show();

    this.productService.getProductCategory().subscribe(
      (data) => {
        this.dataSource.data = data.response;
        this.loadingService.hide();
      },
      (error) => {
        console.error('error', error);
        this.loadingService.hide();
      }
    );
  }
}
