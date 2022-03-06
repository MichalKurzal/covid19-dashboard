import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { ChartService } from './appservice.service'

describe('AppserviceService', () => {
    let service: ChartService

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [ChartService],
        })
        service = TestBed.inject(ChartService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
