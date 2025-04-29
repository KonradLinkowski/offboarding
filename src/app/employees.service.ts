import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Employee } from './types';

@Injectable({ providedIn: 'root' })
export class EmployeesService {
  private http = inject(HttpClient);

  list() {
    return this.http.get<Employee[]>('/employees');
  }

  get(id: string) {
    return this.http.get<Employee>(`/employees/${id}`);
  }

  post(id: string, data: Omit<Employee, 'id'>) {
    return this.http.post<Employee>(`/users/${id}/offboard`, data);
  }
}
