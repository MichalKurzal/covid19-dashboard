import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'
import { RouterTestingModule } from '@angular/router/testing'

import { Graphs1Page } from './graphs1.page'

describe('Graphs1Page', () => {
    let component: Graphs1Page
    let fixture: ComponentFixture<Graphs1Page>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Graphs1Page],
            imports: [IonicModule.forRoot(), RouterTestingModule],
        }).compileComponents()

        fixture = TestBed.createComponent(Graphs1Page)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
