import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { DashboardPage } from './dashboard.page'

describe('DashboardPage', () => {
    let component: DashboardPage
    let fixture: ComponentFixture<DashboardPage>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
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
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
