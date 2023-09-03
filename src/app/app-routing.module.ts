import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './core/auth/auth.module';
import { InvestmentModule } from './core/investment/investment.module';
import { PortfolioModule } from './core/portfolio/portfolio.module';
import { RiskManagementModule } from './core/risk-management/risk-management.module';
import { SupportModule } from './core/support/support.module';
const routes: Routes = [
  { path: 'login', loadChildren: () => AuthModule },
  { path: 'register', loadChildren: () => AuthModule },
  { path: 'reset-password', loadChildren: () => AuthModule },
  { path: 'investment-form', loadChildren: () => InvestmentModule },
  { path: 'investment-list', loadChildren: () => InvestmentModule },
  { path: 'portfolio-dashboard', loadChildren: () => PortfolioModule },
  { path: 'risk-dashboard', loadChildren: () => RiskManagementModule },
  { path: 'support', loadChildren: () => SupportModule },
  // Adicione mais rotas conforme necessário
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
