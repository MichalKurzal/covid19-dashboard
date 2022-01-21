import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { AppserviceService } from './appservice.service'

describe('AppserviceService', () => {
    let service: AppserviceService

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [service],
        })
        service = TestBed.inject(AppserviceService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
