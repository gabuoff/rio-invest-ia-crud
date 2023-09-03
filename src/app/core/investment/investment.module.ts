import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentFormComponent } from './investment-form/investment-form.component';
import { InvestmentListComponent } from './investment-list/investment-list.component';



@NgModule({
  declarations: [
    InvestmentFormComponent,
    InvestmentListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InvestmentModule { }
