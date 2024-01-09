import { formatCurrency } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-forex',
  templateUrl: './forex.component.html',
  styleUrls: ['./forex.component.css']
})
export class ForexComponent implements OnInit, AfterViewInit {
  private _table1: any;

  constructor(private renderer: Renderer2, private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.renderer.removeClass(document.body, "sidebar-open");
    this.renderer.addClass(document.body, "sidebar-closed");

    this._table1 = $("#table1").DataTable({
      columnDefs: [
        {
          targets: 2,
          className: "text-right"
        }
      ]
    });

    this.getData();
  }

  ngOnInit(): void {}

  getData(): void {
    console.log("getData()");
    var url =
      "https://openexchangerates.org/api/latest.json?app_id=e54d79084f56452898e94b0e64e12870";
    
    this.http.get(url).subscribe((data: any) => {
      console.log(data);
      var rates = data.rates;
      console.log(rates);
  
      var currencies = [
        "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN",
        "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL",
        "BSD", "BTC", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLF",
        "CLP", "CNH", "CNY", "COP", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF",
        "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP",
        "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL",
        "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK",
        "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW",
        "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD",
        "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK",
        "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR",
        "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD",
        "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL",
        "SOS", "SRD", "SSP", "STD", "STN", "SVC", "SYP", "SZL", "THB", "TJS",
        "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD",
        "UYU", "UZS", "VES", "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XCD",
        "XDR", "XOF", "XPD", "XPF", "XPT", "YER", "ZAR", "ZMW", "ZWL"
      ];
  
      currencies.forEach((currency, index) => {
        var rate = rates[currency];
        var formattedRate = formatCurrency(rate, "en-US", currency);
        console.log(currency + ": " + formattedRate);
        var row = [index + 1, currency, rate];
        this._table1.row.add(row);
      });
  
      this._table1.draw(false);
    });
  }  
 
}
