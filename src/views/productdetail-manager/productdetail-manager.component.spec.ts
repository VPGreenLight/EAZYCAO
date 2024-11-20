import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdetailManagerComponent } from './productdetail-manager.component';

describe('ProductdetailManagerComponent', () => {
  let component: ProductdetailManagerComponent;
  let fixture: ComponentFixture<ProductdetailManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductdetailManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductdetailManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
