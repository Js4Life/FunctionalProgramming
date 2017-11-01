import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownParent1Component } from './countdown-parent1.component';

describe('CountdownParent1Component', () => {
  let component: CountdownParent1Component;
  let fixture: ComponentFixture<CountdownParent1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountdownParent1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountdownParent1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
