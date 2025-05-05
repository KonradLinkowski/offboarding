import { Component, computed, effect, inject, viewChild } from '@angular/core';
import {
  MatTableModule,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Employee } from '../types';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

type Column = {
  id: string;
  label: string;
  accessor: keyof Employee | ((row: Employee) => string);
};

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class EmployeeListComponent {
  private readonly router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  employees = toSignal(
    this.activatedRoute.data.pipe(map((v) => v['employees'] as Employee[])),
    { initialValue: [] },
  );
  paginator = viewChild.required(MatPaginator);
  sort = viewChild.required(MatSort);
  table = viewChild.required(MatTable);
  dataSource = computed(() => new MatTableDataSource(this.employees()));

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  columns: Column[] = [
    { id: 'name', label: 'Name', accessor: 'name' },
    { id: 'email', label: 'Email', accessor: 'email' },
    { id: 'department', label: 'Department', accessor: 'department' },
    {
      id: 'equipment',
      label: 'Equipment',
      accessor: (row) => row.equipments.map((eq) => eq.name).join(''),
    },
    { id: 'status', label: 'Status', accessor: 'status' },
  ];

  displayedColumns = this.columns.map((c) => c.id);

  constructor() {
    effect(() => {
      const dataSource = this.dataSource();
      dataSource.sort = this.sort();
      dataSource.paginator = this.paginator();
      this.table().dataSource = dataSource;
    });
  }

  handleClick(id: string) {
    this.router.navigate(['employee', id]);
  }

  getCell(col: Column, row: Employee) {
    if (typeof col.accessor === 'string') {
      return row[col.accessor];
    }
    return col.accessor(row);
  }

  applyFilter(event: Event) {
    const dataSource = this.dataSource();
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();

    if (dataSource.paginator) {
      dataSource.paginator.firstPage();
    }
  }
}
