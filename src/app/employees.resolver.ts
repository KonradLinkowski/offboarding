import { Resolve } from '@angular/router';
import { Employee } from './types';
import { inject, Injectable } from '@angular/core';
import { EmployeesService } from './employees.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeesResolver implements Resolve<Employee[]> {
  private readonly service = inject(EmployeesService);

  resolve(): Observable<Employee[]> {
    return this.service.list();
  }
}
