import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Graphs2Page } from './graphs2.page';

describe('Graphs2Page', () => {
  let component: Graphs2Page;
  let fixture: ComponentFixture<Graphs2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Graphs2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Graphs2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
