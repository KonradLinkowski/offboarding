import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Employee } from '../../types';
import { ErrorMessageComponent } from '../../error-message/error-message.component';

type DialogData = Employee;

@Component({
  imports: [
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ErrorMessageComponent,
  ],
  templateUrl: './offboarding.dialog.html',
  styleUrl: './offboarding.dialog.scss',
})
export class OffboardingDialog {
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<OffboardingDialog>);
  fields = [
    {
      id: 'receiver',
      control: new FormControl(this.data.name, [Validators.required]),
      label: 'Receiver',
    },
    {
      id: 'email',
      control: new FormControl(this.data.email, [Validators.required]),
      label: 'Email',
    },
    {
      id: 'phone',
      control: new FormControl('', [Validators.required]),
      label: 'Phone',
    },
    {
      id: 'streetLine',
      control: new FormControl('', [Validators.required]),
      label: 'Street line',
    },
    {
      id: 'city',
      control: new FormControl('', [Validators.required]),
      label: 'City',
    },
    {
      id: 'postalCode',
      control: new FormControl('', [Validators.required]),
      label: 'Postal code',
    },
    {
      id: 'country',
      control: new FormControl('', [Validators.required]),
      label: 'Country',
    },
    {
      id: 'notes',
      control: new FormControl(''),
      label: 'Notes',
      textarea: true,
    },
  ];
  offboardingForm = new FormGroup(
    Object.fromEntries(this.fields.map(({ id, control }) => [id, control])),
  );
}
