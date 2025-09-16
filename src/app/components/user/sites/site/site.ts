import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
  GridReadyEvent,
} from 'ag-grid-community';
import { Location } from '@angular/common';
import { ButtonRendererComponent } from './btnRendererComponent';
import { Router } from '@angular/router';

// Register all community features once in your app
ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-site',
  imports: [AgGridAngular],
  templateUrl: './site.html',
  styleUrl: './site.scss',
})
export class Site {
  public ButtonRendererComponent = ButtonRendererComponent;
  constructor(private location: Location, private router: Router) {}

  public columnDefs: ColDef[] = [
    {
      headerName: 'Transformer ID',
      field: 'TransformerID',
      width: 130,
    },
    {
      headerName: 'Serial Number',
      field: 'serialNumber',
    },
    {
      headerName: 'KV KVA',
      field: 'kv_kva',
    },
    {
      headerName: 'Fluid Type',
      field: 'fluidType',
      width: 120,
    },
    {
      headerName: 'Breathing Type',
      field: 'breathingType',
    },
    {
      headerName: 'Manufacturer',
      field: 'manufacturer',
    },
    {
      headerName: 'MFR Year',
      field: 'mfrYear',
      width: 120,
    },
    {
      headerName: 'Oil Volume (Gallons)',
      field: 'oilVolumeGallons',
    },
    {
      headerName: 'Actions',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        label: 'Edit',
        onClick: (params: any) => this.onRowClick(params),
      },
    },
  ];

  public rowData$: any;

  // For accessing the Grid's API

  rowData = [
    {
      TransformerID: 'TX-9834-HOU',
      serialNumber: 'SN-2020-4567',
      kv_kva: '132 KV / 2500 KVA',
      fluidType: 'Mineral Oil',
      breathingType: 'Conservator',
      manufacturer: 'ABB',
      mfrYear: 2019,
      oilVolumeGallons: 1200,
    },
    {
      TransformerID: 'TX-5743-DAL',
      serialNumber: 'SN-2018-9832',
      kv_kva: '66 KV / 1500 KVA',
      fluidType: 'Silicone Oil',
      breathingType: 'Sealed',
      manufacturer: 'GE',
      mfrYear: 2018,
      oilVolumeGallons: 850,
    },
    {
      TransformerID: 'TX-7632-AUS',
      serialNumber: 'SN-2021-3344',
      kv_kva: '220 KV / 5000 KVA',
      fluidType: 'Mineral Oil',
      breathingType: 'Conservator',
      manufacturer: 'Siemens',
      mfrYear: 2021,
      oilVolumeGallons: 1600,
    },
    {
      TransformerID: 'TX-2291-SAT',
      serialNumber: 'SN-2017-7741',
      kv_kva: '33 KV / 1000 KVA',
      fluidType: 'Natural Ester',
      breathingType: 'Sealed',
      manufacturer: 'Schneider Electric',
      mfrYear: 2017,
      oilVolumeGallons: 600,
    },
    {
      TransformerID: 'TX-3105-ELP',
      serialNumber: 'SN-2022-1122',
      kv_kva: '132 KV / 2500 KVA',
      fluidType: 'Mineral Oil',
      breathingType: 'Conservator',
      manufacturer: 'ABB',
      mfrYear: 2022,
      oilVolumeGallons: 1250,
    },
  ];
  // Example load data from server
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.rowData;
  }
  onRowClick(params: any) {
    this.router.navigate(['/user-details/transformers']);
    console.log('rowClicke', params.data);
  }

  onGoBack() {
    this.location.back();
  }
}
