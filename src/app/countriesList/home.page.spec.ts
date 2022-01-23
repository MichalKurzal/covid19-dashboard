import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'
import { RouterTestingModule } from '@angular/router/testing'

import { CountriesList } from './home.page'

describe('HomePage', () => {
    let component: CountriesList
    let fixture: ComponentFixture<CountriesList>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CountriesList],
            imports: [IonicModule.forRoot(), RouterTestingModule],
        }).compileComponents()

        fixture = TestBed.createComponent(CountriesList)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
