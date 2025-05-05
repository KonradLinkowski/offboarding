import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employees-list/employees-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesResolver } from './employees.resolver';
import { EmployeeResolver } from './employee.resolver';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: EmployeeListComponent,
        resolve: { employees: EmployeesResolver },
      },
      {
        path: 'employee/:id',
        component: EmployeeComponent,
        resolve: { employee: EmployeeResolver },
      },
    ],
  },
];
