import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverersListComponent } from './deliverers-list.component';

describe('DeliverersListComponent', () => {
  let component: DeliverersListComponent;
  let fixture: ComponentFixture<DeliverersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliverersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
