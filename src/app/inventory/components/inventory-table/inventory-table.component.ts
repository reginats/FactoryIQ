import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Department } from '../../../models';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-inventory-table',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './inventory-table.component.html',
  styleUrl: './inventory-table.component.scss',
})
export class InventoryTableComponent {
  displayedColumns: string[] = [
    'DepartmentName',
    'ItemName',
    'ItemStatus',
    'StockLevel',
    'ReorderLevel',
  ];
  dataSource: MatTableDataSource<Department>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() set departmentsData(departmentsData: Department[]) {
    this.mapInventoryDataToTable(departmentsData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  constructor() {}
  private mapInventoryDataToTable(departmentsData: Department[]): void {
    const flatData = [];

    departmentsData.forEach((department) => {
      department.inventory.forEach((invItem) => {
        const mappedInv = {
          DepartmentName: department.name,
          ItemName: invItem.name,
          ItemStatus: invItem.status,
          StockLevel: invItem.stock,
          ReorderLevel: invItem.reorderLevel,
        };
        flatData.push(mappedInv);
      });
    });
    console.log('flat data: ', flatData);
    this.dataSource = new MatTableDataSource(flatData);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // ngOninit() {
  //   this.inventoryService.getInventoryData().subscribe((data) => {
  //     console.log(data);
  //     this.dataSource = new MatTableDataSource(data);
  //   });
  // }
}
