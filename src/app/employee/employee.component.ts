import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OffboardingDialog } from './offboarding/offboarding.dialog';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { Employee } from '../types';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-employee',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterModule],
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
