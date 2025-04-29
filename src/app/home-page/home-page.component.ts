import { Component, inject } from '@angular/core';
import { EmployeeListComponent } from './employees-list/employees-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import type { Employee } from '../types';

@Component({
  selector: 'app-home-page',
  imports: [EmployeeListComponent, MatTabsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private activatedRoute = inject(ActivatedRoute);
  // employees = toSignal(
  //   (this.activatedRoute.data as any).employees as Observable<Employee[]>,
  // );
  employees = [] as Employee[];

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      (emp) => (this.employees = (emp as any).employees as Employee[]),
    );
  }
}
