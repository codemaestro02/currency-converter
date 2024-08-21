import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConverterService } from '../converter.service';
import {ISelectOption} from "ngx-semantic/modules/select";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
  providers: [ToastrService, ConverterService],
})
export class ConverterComponent implements OnInit {
  form: FormGroup;
  currencies: ISelectOption[] = [];
  conversionResult: string | null = null;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private converterService: ConverterService
  ) {
    this.form = this.fb.group({
      fromCurrency: ['', Validators.required],
      toCurrency: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.currencies = this.getCurrencies();
  }

  getCurrencies(): ({ text: string; value: string })[] {
    return [
      {value: 'USD', text: 'United States Dollar'},
      {value: 'EUR', text: 'Euro'},
      {value: 'GBP', text: 'British Pound'},
      {value: 'JPY', text: 'Japanese Yen'},
      {value: 'NGN', text: 'Nigerian Naira'}
    ];
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.toastr.error('Form is invalid');
      return;
    }

    const { fromCurrency, toCurrency, amount } = this.form.value;

    // Check if the from and to currencies are the same
    if (fromCurrency === toCurrency) {
      this.toastr.error('The currency to be converted from must be different from the currency to be converted to');
      return;
    }
    // Make the conversion request to the API and update the conversion result accordingly
    this.converterService.convertCurrency(fromCurrency, toCurrency, amount).subscribe(
      (data) => {
        const rate = data.rates[toCurrency];
        const result = amount * rate;
        this.conversionResult = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
        this.toastr.success('Conversion successful');
      },
      (error) => {
        this.toastr.error('Error fetching conversion rate');
      }
    );
  }
  // To check the validation
  hasError(controlName: string, errorName: string): boolean {
    if (!this.form.valid) {
      return this.form.controls[controlName].hasError(errorName);
    }
    return false;
  }
  // To get the error message
  getErrorMessage(controlName: string): string {
    const control = this.form.controls[controlName];
    if (control.hasError('required')) {
      return 'This field is required';
    }
    if (control.hasError('min')) {
      return 'Amount must be greater than zero';
    }
    return '';
  }
}
