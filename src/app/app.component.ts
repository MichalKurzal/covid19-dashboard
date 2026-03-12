import { Component } from '@angular/core'
import { Platform } from '@ionic/angular'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private statusBar: StatusBar
    ) {
        this.initializeApp()
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault()
            this.statusBar.overlaysWebView(false)
            document.body.setAttribute('color-theme', 'dark')
            SplashScreen.hide()
        })
    }
}
