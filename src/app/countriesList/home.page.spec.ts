import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'
import { RouterTestingModule } from '@angular/router/testing'
import { CountriesListPage } from './home.page'

describe('HomePage', () => {
    let component: CountriesListPage
    let fixture: ComponentFixture<CountriesListPage>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CountriesListPage],
            imports: [IonicModule.forRoot(), RouterTestingModule],
        }).compileComponents()

        fixture = TestBed.createComponent(CountriesListPage)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
