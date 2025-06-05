import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenteredBoxComponent } from './centered-box.component';

describe('CenteredBoxComponent', () => {
  let component: CenteredBoxComponent;
  let fixture: ComponentFixture<CenteredBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CenteredBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CenteredBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate using Web Worker', () => {
    spyOn(window, 'Worker').and.callFake(() => {
      return {
        postMessage: jasmine.createSpy(),
        onmessage: jasmine.createSpy(),
        terminate: jasmine.createSpy(),
      } as any;
    });

    component.onCalculate();
    expect(window.Worker).toHaveBeenCalled();
  });
});
