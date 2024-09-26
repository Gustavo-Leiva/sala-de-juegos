import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CazadorComponent } from './cazador.component';

describe('CazadorComponent', () => {
  let component: CazadorComponent;
  let fixture: ComponentFixture<CazadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CazadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CazadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
