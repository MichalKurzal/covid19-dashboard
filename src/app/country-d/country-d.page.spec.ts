import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CountryDPage } from './country-d.page';

describe('CountryDPage', () => {
  let component: CountryDPage;
  let fixture: ComponentFixture<CountryDPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryDPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CountryDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
