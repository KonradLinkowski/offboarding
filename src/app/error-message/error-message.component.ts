import { Component, computed, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { merge } from 'rxjs';

@Component({
  selector: 'app-error-message',
  imports: [],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss',
})
export class ErrorMessageComponent {
  readonly rootFormGroup = inject(FormGroupDirective);
  readonly field = input.required<keyof typeof this.rootFormGroup.value>();

  errorMessage = signal<string | null>(null);

  ngOnInit() {
    const control = this.rootFormGroup.control.controls[this.field() as any];

    merge(control.statusChanges, control.valueChanges, control.events)
      // .pipe(takeUntilDestroyed())
      .subscribe(() => {
        console.log(control.errors);
        if (control.hasError('required')) {
          this.errorMessage.set('You must enter a value');
        } else if (control.hasError('email')) {
          this.errorMessage.set('Not a valid email');
        } else {
          this.errorMessage.set('');
        }
      });
  }
}
