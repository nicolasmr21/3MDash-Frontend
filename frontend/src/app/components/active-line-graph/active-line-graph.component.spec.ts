import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveLineGraphComponent } from './active-line-graph.component';

describe('ActiveLineGraphComponent', () => {
  let component: ActiveLineGraphComponent;
  let fixture: ComponentFixture<ActiveLineGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveLineGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
