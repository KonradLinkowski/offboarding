import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesResolver } from './home-page/employees.resolver';
import { EmployeeResolver } from './home-page/employee.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    resolve: { employees: EmployeesResolver },
  },
  {
    path: 'employee/:id',
    component: EmployeeComponent,
    resolve: { employees: EmployeeResolver },
  },
];
