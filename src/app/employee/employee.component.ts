import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { OffboardingDialog } from './offboarding/offboarding.dialog';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Employee } from '../types';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-employee',
  imports: [MatDivider],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {
  readonly employeeService = inject(EmployeesService);
  readonly dialog = inject(MatDialog);
  private activatedRoute = inject(ActivatedRoute);
  employee = toSignal(
    this.activatedRoute.data.pipe(map((v) => v['employee'] as Employee)),
    {
      initialValue: {} as Employee,
    },
  );

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    this.dialog
      .open(OffboardingDialog, {
        data: this.employee(),
        enterAnimationDuration,
        exitAnimationDuration,
      })
      .afterClosed()
      .subscribe((result) => {
        const id = this.employee().id;
        this.employeeService.post(id, result).subscribe();
      });
  }
}
