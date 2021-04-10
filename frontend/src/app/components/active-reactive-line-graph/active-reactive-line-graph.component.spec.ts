import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveReactiveLineGraphComponent } from './active-reactive-line-graph.component';

describe('ActiveReactiveLineGraphComponent', () => {
  let component: ActiveReactiveLineGraphComponent;
  let fixture: ComponentFixture<ActiveReactiveLineGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveReactiveLineGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveReactiveLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
