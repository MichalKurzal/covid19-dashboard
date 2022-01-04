import { Component, OnInit, ViewChild } from '@angular/core'
import { NavController, Platform, NavParams } from '@ionic/angular'
import { NavigationExtras } from '@angular/router'
import { File } from '@ionic-native/file/ngx'
import { FileTransfer } from '@ionic-native/file-transfer/ngx'
import { WebView } from '@ionic-native/ionic-webview/ngx'
import { NativeStorage } from '@ionic-native/native-storage/ngx'
import { IonInfiniteScroll } from '@ionic/angular'

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll
    gurl
    countries: any = []
    dataList: any = []
    itemLimit: number = 20

    constructor(
        public nav: NavController,
        public platform: Platform,
        public fileTransfer: FileTransfer,
        private webView: WebView,
        public navParams: NavParams,
        private file: File,
        private nativeStorage: NativeStorage
    ) {}
    ngOnInit() {
        this.gurl = this.webView.convertFileSrc(this.file.dataDirectory)
        this.nativeStorage
            .getItem('DataCountries')
            .then((res) => {
                this.countries = res
                this.countries.reverse()
                this.dataList = this.countries.slice(0, this.itemLimit)
            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    goforward = (param) => {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                country: param,
            },
        }
        console.log('Detail Country Page')
        this.nav.navigateForward('tabs-nav/countryD', navigationExtras)
    }

    loadData(event) {
        console.log(event)
        setTimeout(() => {
            this.itemLimit += 20
            this.dataList = this.countries.slice(0, this.itemLimit)
            event.target.complete()
        }, 500)
    }
}
