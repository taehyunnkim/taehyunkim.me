import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IugaComponent } from './iuga.component';

describe('IugaComponent', () => {
  let component: IugaComponent;
  let fixture: ComponentFixture<IugaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IugaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IugaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
