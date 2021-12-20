import { Component, OnInit } from "@angular/core";
import { AppserviceService } from "../services/appservice.service";
import { NavController, LoadingController, Platform } from "@ionic/angular";
import { Router, NavigationExtras } from "@angular/router";
import { File } from "@ionic-native/file/ngx";
import {
  FileTransfer,
  FileTransferObject,
} from "@ionic-native/file-transfer/ngx";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";

interface DataCont_ {
  cases: number;
  newCases: number;
  NewDeaths: number;
  deaths: number;
  recovered: number;
  NewRecovered: number;
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit {
  public platform: any;
  DataCont: DataCont_;
  data;
  TotalC;
  TotalD;
  TotalR;
  NewC;
  NewD;
  NewR;
  svg: any;
  svg2: any;
  codes;

  constructor(
    public appservice: AppserviceService,
    public fileTransfer: FileTransfer,
    public nav: NavController,
    private file: File,
    public router: Router,
    private nativeStorage: NativeStorage,
    public loading: LoadingController,
    private _platform: Platform,
    private screenOrientation: ScreenOrientation
  ) {
    this.platform = _platform;
  }

  ngOnInit() {
    Promise.all([this.loadContinents(), this.loadHistorical()]);
    if (window.innerWidth < 900) {
      this.screenOrientation.lock(
        this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
      );
      console.log(navigator.userAgent);
    }
  }
  async ngAfterViewInit() {
    console.log("ngAfterViewInit");
    const loading = this.loading.create({
      spinner: "circles",
      message: "Loading Please Wait...",
    });
    (await loading).present().then(async () => {
      Promise.all([this.getCountrynames(), this.loadCountriesData()]).then(
        async () => (await loading).dismiss()
      );
    });
  }
  getCountrynames = async () => {
    return await this.nativeStorage
      .getItem("CountryCodes")
      .then((res) => {
        const data = res;
        this.checkImages(data);
      })
      .catch((err) => {
        console.log("Error getCountrynames", err);
      });
  };

  loadHistorical = async () => {
    return await this.appservice
      .HistoricalData()
      .then((data: any) => {
        console.log("Historical ", data);
        const cases = data.cases;
        const deaths = data.deaths;
        console.log("cases", cases);
        console.log("deaths", deaths);
        this.nativeStorage.setItem("DataWorld", data).then(
          () => console.log("stored Item Data World"),
          (error) => console.error("Error stoting item", error)
        );
        this.appservice.worldchart(
          cases,
          deaths,
          this.svg,
          this.svg2,
          "#svg3",
          "#svg4",
          "g3",
          "g4"
        );
      })
      .catch((error) => {
        console.log("error ", error);
        this.getDataWorld();
      });
  };

  loadContinents = async () => {
    return await this.appservice
      .NewApiContinents()
      .then((res) => {
        const ContArray = [];
        let TotalCases_;
        let NewCases_;
        let TotalDeaths_;
        let NewDeaths_;
        let TotalRecovered_;
        let NewRecovered_;

        for (const cases in res) {
          ContArray.push(res[cases]);
        }
        console.log("contarray ", ContArray);

        TotalCases_ = ContArray.map((c) => c.cases).reduce((a, b) => a + b);
        NewCases_ = ContArray.map((c) => c.todayCases).reduce((a, b) => a + b);
        TotalDeaths_ = ContArray.map((c) => c.deaths).reduce((a, b) => a + b);
        NewDeaths_ = ContArray.map((c) => c.todayDeaths).reduce(
          (a, b) => a + b
        );
        TotalRecovered_ = ContArray.map((c) => c.recovered).reduce(
          (a, b) => a + b
        );
        NewRecovered_ = ContArray.map((c) => c.todayRecovered).reduce(
          (a, b) => a + b
        );

        this.DataCont = {
          cases: TotalCases_,
          newCases: NewCases_,
          NewDeaths: NewDeaths_,
          deaths: TotalDeaths_,
          recovered: TotalRecovered_,
          NewRecovered: NewRecovered_,
        };

        console.log("DataCont", this.DataCont);

        this.setTotal(this.DataCont);
        this.nativeStorage.setItem("DataContinents", this.DataCont).then(
          () => console.log("stored Item"),
          (err) => console.error("Error stoting item", err)
        );
      })
      .catch((error) => {
        console.log("catch error get Global", error);
        this.getDataCont();
      });
  };

  loadCountriesData = async () => {
    return await this.appservice.getCountriesData().then((res) => {
      console.log("Countries data", res);

      const result = [];
      this.codes = [];
      for (const code in res) {
        result.push(res[code]);
      }
      this.codes = result.map((a) => a.countryInfo.iso2);
      console.log("Codes", this.codes);
      this.nativeStorage.setItem("CountryCodes", this.codes).then(
        () => console.log("stored CountryCodes"),
        (err) => console.error("Error stoting item", err)
      );
      this.checkImages(this.codes);
      this.nativeStorage
        .setItem("DataCountries", res)
        .then(
          () => console.log("stored Item"),
          (error) => console.error("Error stoting item", error)
        )
        .catch((error) => {
          console.log("error", error);
        });
    });
  };

  getDataCont = () => {
    this.nativeStorage
      .getItem("DataGlobal")
      .then((res) => {
        const data = res;
        console.log("get Data", data);
        this.setTotal(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  getDataWorld = () => {
    this.nativeStorage
      .getItem("DataWorld")
      .then((res) => {
        const cases = res.cases;
        const deaths = res.deaths;
        this.appservice.worldchart(
          cases,
          deaths,
          this.svg,
          this.svg2,
          "#svg3",
          "#svg4",
          "g3",
          "g4"
        );
      })
      .catch((error) => {
        console.log("error ", error);
      });
  };

  setTotal = (data) => {
    console.log(data);
    this.TotalC = data.cases;
    this.NewC = data.newCases;
    this.NewD = data.NewDeaths;
    this.TotalD = data.deaths;
    this.TotalR = data.recovered;
    this.NewR = data.NewRecovered;
  };

  checkImages = (data) => {
    console.log("check images", data);
    data.map((code: any) =>
      this.file
        .checkFile(this.file.dataDirectory, code + ".png")
        .then((res: any) => console.log("succsess", res))
        .catch((err) => {
          console.log("check error", err);
          this.fileTransfer
            .create()
            .download(
              `http://www.geognos.com/api/en/countries/flag/${code}.png`,
              this.file.dataDirectory + `${code}` + ".png"
            );
        })
    );
  };

  goforward = () => {
    this.router.navigateByUrl("tabs-nav/graphs1");

    console.log("goforward");
  };

  goforward2 = () => {
    this.router.navigateByUrl("tabs-nav/graphs2");

    console.log("goforward");
  };

  doRefresh(event) {
    Promise.all([
      this.loadHistorical(),
      this.loadCountriesData(),
      this.loadContinents(),
      this.getCountrynames(),
    ]).then(() => event.target.complete());
  }
}
