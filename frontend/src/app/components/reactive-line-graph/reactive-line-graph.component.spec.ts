import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveLineGraphComponent } from './reactive-line-graph.component';

describe('ReactiveLineGraphComponent', () => {
  let component: ReactiveLineGraphComponent;
  let fixture: ComponentFixture<ReactiveLineGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveLineGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
