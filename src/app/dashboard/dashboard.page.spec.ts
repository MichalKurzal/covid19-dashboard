import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { DashboardPage } from './dashboard.page'
import { DetailDashComponent } from '../detail-dash/detail-dash.component'
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core'
import { CommonModule } from '@angular/common'
import { By } from '@angular/platform-browser'

describe('DashboardPage', () => {
    let component: DashboardPage
    let fixture: ComponentFixture<DashboardPage>
    let component2: DetailDashComponent
    let fixture2: ComponentFixture<DetailDashComponent>
    let ele: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [DashboardPage],
            imports: [
                CommonModule,
                IonicModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(DashboardPage)
        component = fixture.componentInstance
        fixture.detectChanges()
        ele = fixture.debugElement.query(By.css('p'));


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
