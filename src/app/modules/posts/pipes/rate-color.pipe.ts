import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rateColor',
})
export class RateColorPipe implements PipeTransform {
  readonly DANGER = 'danger';
  readonly WARNING = 'warning';
  readonly SUCCESS = 'success';

  transform(value: number): string {
    if (value <= 1) {
      return this.DANGER;
    }

    if (value >= 4) {
      return this.SUCCESS;
    }

    return this.WARNING;
  }
}
