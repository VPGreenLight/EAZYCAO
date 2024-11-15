import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterManagementComponent } from './footer-management.component';

describe('FooterManagementComponent', () => {
  let component: FooterManagementComponent;
  let fixture: ComponentFixture<FooterManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
