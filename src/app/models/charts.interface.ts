export interface IPieChart {
    labels: string[];
    datasets:IPieDataSet[];
}

export interface IPieDataSet{
    data:number[];
}
export interface IPieChartOptions{
    plugins:{
        legend:{
            display:boolean;
            position: 'top' | 'left' | 'bottom' | 'right';
        };
    };
}

// export interface IBarDataSet{
//     data:number[];
//     label:string;
// }
// export interface IBarChart {
//     labels: string[];
//     datasets:IBarDataSet[];
// }
// export interface IBarChartOptions{
//     scales: {
//         x: {},
//         y: {},
//       },
//       plugins: {
//         legend: {
//           display: false,
//         },
//         datalabels: {
//           anchor: 'end',
//           align: 'end',
//         },
//       },
    
// }

