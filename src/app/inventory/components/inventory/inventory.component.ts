import { Component } from '@angular/core';
import { InventoryService } from '../../../services/inventory.service';
import { MatTabsModule } from '@angular/material/tabs';
import { InventoryTableComponent } from '../inventory-table/inventory-table.component';
import { Department } from '../../../models';
import { RouterModule } from '@angular/router';
import { BarComponent } from '../../../components/bar/bar.component';
import { Subscription } from 'rxjs';
import { ChartData } from 'chart.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  imports: [MatTabsModule, RouterModule, InventoryTableComponent, BarComponent,CommonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent {
  public departmentsData: Department[];
  constructor(private inventoryService: InventoryService) {}

  private sub: Subscription = new Subscription();
  public barChartData: ChartData<'bar'>;
  public charts: Array<ChartData<'bar'>> = [];
  ngOnInit() {
    this.sub.add(
      this.inventoryService.getInventoryData().subscribe((data: Department[]) => {
        this.departmentsData = data;
        this.charts = [];
        data.forEach((department) => {
          const mappedData = {
            labels: [],
            datasets: [{ data: [], label: '' }],
          };
          department.inventory.forEach((intItem) => {
            mappedData.labels = Object.keys(intItem.name);

            mappedData.datasets[0].data.push(intItem.stock)


            // const itemData = {
            //   data: Object.keys(intItem.stock).map((key) => {
            //     return intItem.stock[key];
            //   }),
            //   label: intItem.name,
            // };

            // mappedData.datasets = [itemData];
           
            this.charts.push(mappedData);

          });
        });
      })
    );
    
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
