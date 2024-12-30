import { Component, Input, ViewChild } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { BaseChartDirective } from 'ng2-charts';
// import { IBarChart, IBarChartOptions } from '../../models';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-bar',
  imports: [MatButtonModule, BaseChartDirective],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.scss'
})
export class BarComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  @Input() set chartData(chartData: ChartData<'bar'>) {
    this._chartData = chartData;
    this.chart?.update();
  }

  private _chartData: ChartData<'bar'>;

  get chartData(): ChartData<'bar'> {
    return this._chartData;
  }

  public barChartType = 'bar' as const;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {},
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // public barChartData: ChartData<'bar'> = {
  //   labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
  //   datasets: [
  //     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //     { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  //   ],
  // };
}
