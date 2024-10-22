import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/shared/services/product.service';
import { TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-status',
  templateUrl: './product-status.page.html',
  styleUrls: ['./product-status.page.scss'],
})
export class ProductStatusPage implements OnInit {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  status: {id?: number, name?: string} = {};
  isEditMode = false;

  constructor(
    private dialog: MatDialog,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.listProductStatus();
  }

  openDialog(): void {
    this.isEditMode = false;
    this.status = {};
    this.dialog.open(this.dialogTemplate);
  }

  editStatus(element: any): void {
    this.isEditMode = true;
    this.status = { ...element };
    this.dialog.open(this.dialogTemplate);
  }

  deleteStatus(id: number): void {
    this.productService.deleteProductStatus(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (item) => item.id !== id
      );
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  saveStatus(): void {
    if (this.isEditMode) {
      const index = this.dataSource.data.findIndex(
        (item) => item.id === this.status.id
      );
      if (index !== -1) {
        this.dataSource.data[index] = this.status;
      }
      this.productService.updateProductStatus(this.status).subscribe();
    } else {
      this.status.id = this.dataSource.data.length + 1;
      this.dataSource.data.push(this.status);
      this.productService.createProductStatus(this.status).subscribe();
    }
    this.dataSource._updateChangeSubscription();
    this.closeDialog();
  }

  private listProductStatus(): void {
    this.productService.getProductStatus().subscribe((data) => {
      this.dataSource.data = data.response;
    });
  }
}
