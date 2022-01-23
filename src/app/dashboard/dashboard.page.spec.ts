import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { DashboardPage } from './dashboard.page'
import { DetailDashComponent } from '../detail-dash/detail-dash.component'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

describe('DashboardPage', () => {
    let component: DashboardPage
    let fixture: ComponentFixture<DashboardPage>
    let component2: DetailDashComponent
    let fixture2: ComponentFixture<DetailDashComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [DashboardPage],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(DashboardPage)
        component = fixture.componentInstance
        fixture.detectChanges()

        fixture2 = TestBed.createComponent(DetailDashComponent)
        component2 = fixture2.componentInstance
        fixture2.detectChanges()
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should create', () => {
        expect(component2).toBeTruthy()
    })
})
