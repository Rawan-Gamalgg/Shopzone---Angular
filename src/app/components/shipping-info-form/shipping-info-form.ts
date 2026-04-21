import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping-info-form',
  standalone: false,
  templateUrl: './shipping-info-form.html',
  styleUrl: './shipping-info-form.css',
})
export class ShippingInfoForm implements OnInit {
  shippingInfoForm!:FormGroup
  constructor(private fb: FormBuilder){}
  ngOnInit(): void{
    this.shippingInfoForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^01[0-9]{9}$')]],
      postalCode: ['']
    });
  }
  // onSubmit() {
  //   if (this.shippingInfoForm.valid) {
  //     this.orderService.placeOrder(userId, cartItems, this.shippingInfoForm.value)
  //       .subscribe(order => {
  //         this.router.navigate(['/orders']);
  //       });
  //   }
  // }
}

