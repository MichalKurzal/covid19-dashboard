import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'
import { RouterTestingModule } from '@angular/router/testing';

import { DetailDashComponent } from './detail-dash.component'

describe('DetailDashComponent', () => {
    let component: DetailDashComponent
    let fixture: ComponentFixture<DetailDashComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DetailDashComponent],
            imports: [IonicModule.forRoot(),RouterTestingModule],
        }).compileComponents()

        fixture = TestBed.createComponent(DetailDashComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
