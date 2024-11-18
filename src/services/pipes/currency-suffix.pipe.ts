import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencySuffix',
  standalone: true,
})
export class CurrencySuffixPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value == null || value === '') return '';

    // Xử lý định dạng tiền tệ và thêm hậu tố ' đ'
    const formattedValue = new Intl.NumberFormat('vi-VN').format(Number(value));
    return `${formattedValue} đ`;
  }
}

