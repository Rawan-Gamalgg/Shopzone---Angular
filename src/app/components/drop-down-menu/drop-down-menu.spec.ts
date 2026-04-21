import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownMenu } from './drop-down-menu';

describe('DropDownMenu', () => {
  let component: DropDownMenu;
  let fixture: ComponentFixture<DropDownMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropDownMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(DropDownMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
