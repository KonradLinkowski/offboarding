import { Component } from '@angular/core';
import { EmployeeListComponent } from './employees-list/employees-list.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-home-page',
  imports: [EmployeeListComponent, MatTabsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
