import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http'
import { File } from '@ionic-native/file/ngx'
import {
    FileTransfer,
    FileTransferObject,
} from '@ionic-native/file-transfer/ngx'
import { WebView } from '@ionic-native/ionic-webview/ngx'
import { NativeStorage } from '@ionic-native/native-storage/ngx'

import { AboutPageModule } from './about/about.module'
import { CountryDPageModule } from './country-d/country-d.module'
import { DashboardPageModule } from './dashboard/dashboard.module'

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        AboutPageModule,
        CountryDPageModule,
        DashboardPageModule,
    ],
    providers: [
        File,
        FileTransfer,
        FileTransferObject,
        StatusBar,
        NavParams,
        SplashScreen,
        WebView,
        NativeStorage,
        ScreenOrientation,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
