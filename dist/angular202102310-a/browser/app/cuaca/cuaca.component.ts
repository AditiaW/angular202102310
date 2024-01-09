import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare const $: any;
declare const moment: any;


@Component({
  selector: 'app-cuaca',
  templateUrl: './cuaca.component.html',
  styleUrls: ['./cuaca.component.css']
})
export class CuacaComponent implements OnInit, AfterViewInit {
  private table1: any;
  private sunrise: Date | any;
  private sunset: Date | any;
  public formattedSunrise: any;
  public formattedSunset: any;

  constructor(private renderer: Renderer2, private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.renderer.removeClass(document.body, "sidebar-open");
    this.renderer.addClass(document.body, "sidebar-closed");
    this.table1 = $("#table1").DataTable({
      "columnDefs" : [
        {
          "targets" : 0,
          "render" : function (data: string) {
            var waktu = moment(data + " UTC");
            var html = waktu.local().format("YYYY-MM-DD") + "<br />" + waktu.local().format("HH:mm") + " WIB";
            return html;
          }
        },
        {
          "targets" : 1,
          "render" : function (data: string) {
            var html = "<img src='" + data + "' />";
            return html;
          }
        },
        {
          "targets" : 2,
          "render" : function (data: string) {
            var array = data.split('||');
            var cuaca = array[0];
            var deskripsi = array[1];
            var html = "<strong>" + cuaca + "</strong><br />" + deskripsi;
            return html;
          }
        }
        
      ]
    });
    this.bind_table1();
  }

  bind_table1(): void {
    this.http.get("https://api.openweathermap.org/data/2.5/forecast?id=1630789&appid=b9ca6756e58c63d263c8d82e856b8d6c")
      .subscribe((data: any) => {
        console.log(data);
        var list = data.list;
        console.log(list);
        this.table1.clear();
        const { sunrise, sunset } = data.city; // Sesuaikan dengan struktur data yang tepat
        this.sunrise = new Date(sunrise * 1000); // Konversi UNIX timestamp ke JavaScript Date
        this.sunset = new Date(sunset * 1000);

        // Format sunrise ke format yang diinginkan (tahun-bulan-hari dan jam:menit)
        this.formattedSunrise = `${this.sunrise.getFullYear()}-${('0' + (this.sunrise.getMonth() + 1)).slice(-2)}-${('0' + this.sunrise.getDate()).slice(-2)} ${('0' + this.sunrise.getHours()).slice(-2)}:${('0' + this.sunrise.getMinutes()).slice(-2)} WIB`;

        // Format sunset ke format yang diinginkan (tahun-bulan-hari dan jam:menit)
        this.formattedSunset = `${this.sunset.getFullYear()}-${('0' + (this.sunset.getMonth() + 1)).slice(-2)}-${('0' + this.sunset.getDate()).slice(-2)} ${('0' + this.sunset.getHours()).slice(-2)}:${('0' + this.sunset.getMinutes()).slice(-2)} WIB`;

        list.forEach((element: any) => {
          var weather = element.weather[0];
          console.log(weather);
          var iconUrl = "https://openweathermap.org/img/wn/" + weather.icon + "@2x.png";
          var cuacaDeskripsi = weather.main + "||" + weather.description;
          var main = element.main;
          console.log(main);
          var tempMin = this.kelvinToCelsius(main.temp_min);
          console.log("temp Min : " + tempMin);
          var tempMax = this.kelvinToCelsius(main.temp_max);
          console.log("temp Max : " + tempMax);
          var temp = tempMin + "°C - " + tempMax + "°C";

          var row = [
            element.dt_txt,
            iconUrl,
            cuacaDeskripsi,
            temp,
          ];
          this.table1.row.add(row);
        });
        this.table1.draw(false);
      });
  }

  kelvinToCelsius(kelvin: any): any {
    var celsius = kelvin - 273.15;
    celsius = Math.round(celsius * 100) / 100;
    return celsius;
  }


  ngOnInit(): void {
  }
}