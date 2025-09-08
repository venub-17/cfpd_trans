import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
  GridReadyEvent,
} from 'ag-grid-community';

// Register all community features once in your app
ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-site',
  imports: [AgGridAngular],
  templateUrl: './site.html',
  styleUrl: './site.scss',
})
export class Site {
  public columnDefs: ColDef[] = [
    {
      headerName: 'Customer Name',
      field: 'name',
      sortable: true,
    },
    {
      headerName: 'Activity Log',
      field: 'tenantid',
      sortable: true,
      filter: 'agMultiColumnFilter',
    },
    {
      headerName: 'Change Log',
      field: 'gdap',
      sortable: true,
    },
    {
      headerName: 'Entry By',
      field: 'dap',
      sortable: true,
    },
    {
      headerName: 'Entry Source',
      field: 'permission',
      sortable: true,
    },
    {
      headerName: 'Date/Time',
      field: 'rolecategory',
      sortable: true,
    },
    {
      headerName: 'Date/Time',
      field: 'duration',
      sortable: true,
    },
    {
      headerName: 'Date/Time',
      field: 'expiration',
      sortable: true,
    },
    {
      headerName: 'Date/Time',
      field: 'relation',
      sortable: true,
    },
    {
      headerName: 'Date/Time',
      field: 'autonotify',
      sortable: true,
    },
  ];
  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Data that gets displayed in the grid
  public rowData$: any;

  // For accessing the Grid's API

  rowData = [
    {
      name: 'Manoj',
      tenantid: 'ID#',
      gdap: 'status',
      dap: 'status',
      permission: 'low',
      rolecategory: 'identity',
      duration: '7 days',
      expiration: '2022-06-02 10:03:32 AM UTC',
      relation: 'active',
      autonotify: 'on',
    },
    {
      name: 'Manoj',
      tenantid: 'ID#',
      gdap: 'status',
      dap: 'status',
      permission: 'high',
      rolecategory: 'identity',
      duration: '7 days',
      expiration: '2022-06-02 10:03:32 AM UTC',
      relation: 'active',
      autonotify: 'on',
    },
    {
      name: 'Krishna',
      tenantid: 'ID#',
      gdap: 'status',
      dap: 'status',
      permission: 'high',
      rolecategory: 'identity',
      duration: '7 days',
      expiration: '2022-06-02 10:03:32 AM UTC',
      relation: 'expired',
      autonotify: 'on',
    },
    {
      name: 'Sam',
      tenantid: 'ID#',
      gdap: 'status',
      dap: 'status',
      permission: 'low',
      rolecategory: 'identity',
      duration: '7 days',
      expiration: '2022-06-02 10:03:32 AM UTC',
      relation: 'expired',
      autonotify: 'on',
    },
  ];
  // Example load data from server
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.rowData;
  }
}
