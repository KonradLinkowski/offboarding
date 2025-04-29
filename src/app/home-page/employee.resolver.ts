import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Employee } from '../types';
import { inject, Injectable } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeResolver implements Resolve<Employee> {
  private readonly service = inject(EmployeesService);

  resolve(route: ActivatedRouteSnapshot): Observable<Employee> {
    const id = route.paramMap.get('id');
    if (id) {
      return this.service.get(id);
    }
    throw new Error('Missing employee id');
  }
}
