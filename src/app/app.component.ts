import { Component } from '@angular/core'
import { Platform } from '@ionic/angular'
import { StatusBar, Style } from '@capacitor/status-bar'

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    constructor(private platform: Platform) {
        this.initializeApp()
    }

    async initializeApp() {
        this.platform.ready().then(async () => {
            await StatusBar.setStyle({ style: Style.Dark })
            await StatusBar.setOverlaysWebView({ overlay: false })
            document.body.setAttribute('color-theme', 'dark')
        })
    }
}
