import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaItemFormComponent } from './media-item-form.component';

describe('MediaItemFormComponent', () => {
  let component: MediaItemFormComponent;
  let fixture: ComponentFixture<MediaItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
