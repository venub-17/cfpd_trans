import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-btn-renderer',
  template: `
    <button type="button" class="link_" (click)="onClick($event)">
      View Details
    </button>
  `,
  styles: `
  
    .link_:hover{
        text-decoration: underline;
        padding-bottom: 2px;
        cursor: pointer;
    color: #0369a1;

    }
        `,
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  params: any;
  agInit(params: any): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }
  onClick(e: any) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      if (this.params.onClick) {
        this.params.onClick(this.params);
      }
    }
  }
}
