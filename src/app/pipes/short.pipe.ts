import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'short',
})
export class ShortPipe implements PipeTransform {
  private readonly DEFAULT_TEXT_LENGTH = 50;
  private readonly DEFAULT_SUFFIX = '...';

  transform(
    value: string,
    length: number = this.DEFAULT_TEXT_LENGTH,
    suffix: string = this.DEFAULT_SUFFIX,
  ): string {
    const maximumLength = length - suffix.length;

    if (value.length <= maximumLength) {
      return value;
    }

    return `${value.substring(0, maximumLength)}${suffix}`;
  }
}
