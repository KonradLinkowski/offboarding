import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeesService } from './employees.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'offboarding';
  employeesService = inject(EmployeesService);

  ngOnInit() {
    this.employeesService.list().subscribe(console.log);
  }
}
