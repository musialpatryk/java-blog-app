import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { KeyValuePipe, NgForOf, NgIf } from '@angular/common';
import { TranslatePipe } from '../../modules/translations/pipes/translate.pipe';

@Component({
  selector: 'app-validation-errors',
  imports: [
    NgIf,
    NgForOf,
    KeyValuePipe,
    TranslatePipe,
  ],
  templateUrl: './validation-errors.component.html',
})
export class ValidationErrorsComponent {
  @Input() control!: AbstractControl;
}
