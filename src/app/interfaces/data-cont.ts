export interface DataCont {
    cases: number
    todayCases: number
    todayDeaths: number
    deaths: number
    recovered: number
    todayRecovered: number
    country: string
    countryInfo: {
        iso2: string
    }
}
