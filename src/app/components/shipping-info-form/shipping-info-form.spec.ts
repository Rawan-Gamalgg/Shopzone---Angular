import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingInfoForm } from './shipping-info-form';

describe('ShippingInfoForm', () => {
  let component: ShippingInfoForm;
  let fixture: ComponentFixture<ShippingInfoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippingInfoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ShippingInfoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
