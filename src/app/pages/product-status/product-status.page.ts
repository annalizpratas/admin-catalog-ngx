import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/shared/services/product.service';
import { TemplateRef, ViewChild } from '@angular/core';
import { LoadingService } from 'src/app/shared/utils/loading.service';

@Component({
  selector: 'app-product-status',
  templateUrl: './product-status.page.html',
  styleUrls: ['./product-status.page.scss'],
})
export class ProductStatusPage implements OnInit {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  status: { id: number; name: string } = { id: 0, name: '' };
  isEditMode = false;

  constructor(
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.listProductStatus();
  }

  openDialog(): void {
    this.isEditMode = false;
    this.status = { id: 0, name: '' };
    this.dialog.open(this.dialogTemplate);
  }

  editStatus(element: any): void {
    this.isEditMode = true;
    this.status = { ...element };
    this.dialog.open(this.dialogTemplate);
  }

  deleteStatus(id: number): void {
    this.loadingService.show();

    this.productService.deleteProductStatus(id).subscribe(
      (data) => {
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item.id !== id
        );

        this.loadingService.hide();
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

  saveStatus(): void {
    this.loadingService.show();

    if (this.isEditMode) {
      const index = this.dataSource.data.findIndex(
        (item) => item.id === this.status.id
      );
      if (index !== -1) {
        this.dataSource.data[index] = this.status;
      }
      this.productService.updateProductStatus(this.status).subscribe(
        (data) => {
          this.status = data.response;
          this.loadingService.hide();
        },
        (error) => {
          console.error('error', error);
          this.loadingService.hide();
        }
      );
    } else {
      this.productService.createProductStatus(this.status).subscribe(
        (data) => {
          this.status = data.response;
          this.dataSource.data.push(this.status);
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

  private listProductStatus(): void {
    this.loadingService.show();

    this.productService.getProductStatus().subscribe(
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
