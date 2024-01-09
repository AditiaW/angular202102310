import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';

declare const $: any; // Deklarasi jQuery

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.component.html',
  styleUrls: ['./mahasiswa.component.css']
})
export class MahasiswaComponent implements OnInit, AfterViewInit {
  data: any;
  table1: any;

  constructor(private http : HttpClient, private renderer : Renderer2) {}

  ngAfterViewInit(): void {
    // Logika yang perlu dijalankan setelah tampilan komponen selesai dimuat
    // Contoh: Implementasi DataTables di sini
    this.table1 = $("#table1").DataTable(); // Pastikan jQuery dan DataTables telah dimuat sebelumnya
    this.renderer.removeClass(document.body, "sidebar-open"); 
    this.renderer.addClass(document.body, "sidebar-closed");

    this.bind_mahasiswa()
  }

  ngOnInit(): void {
    // Inisialisasi data atau logika yang perlu dilakukan saat komponen diinisialisasi
  }

  bind_mahasiswa(): void {
    this.http.get("https://stmikpontianak.net/011100862/tampilMahasiswa.php")
      .subscribe((data: any) => {
        console.log(data);
        this.table1.clear();
        data.forEach((element: any) => {
          var tempatTanggalLahir = element.TempatLahir + ", " + element.TanggalLahir;
          var row = [
            element.NIM,
            element.Nama,
            element.JenisKelamin,
            tempatTanggalLahir,
            element.JP,
            element.Alamat,
            element.StatusNikah,
            element.TahunMasuk
          ];
          this.table1.row.add(row);
        });
        this.table1.draw(false);
      });
  }

  showTambahModal(): void {
    $("#tambahModal").modal();
  }

  postRecord(): void {
    var alamat = $("#alamatText").val();
    var jenisKelamin = $("#jenisKelaminSelect").val();
    var jp = $("#jpSelect").val();
    var nama = $("#namaText").val();
    var nim = $("#nimText").val();
    var statusNikah = $("#statusNikahSelect").val();
    var tahunMasuk = $("#tahunMasukText").val();
    var tanggalLahir = $("#tanggalLahirText").val();
    var tempatLahir = $("#tempatLahirText").val();
  
    if (nim.length === 0) {
      alert("NIM belum diisi");
      return;
    }
  
    if (nama.length === 0) {
      alert("Nama belum diisi");
      return;
    }
  
    if (tempatLahir.length === 0) {
      alert("Tempat lahir belum diisi");
      return;
    }
  
    if (tanggalLahir.length === 0) {
      alert("Tanggal lahir belum diisi");
      return;
    }
  
    if (alamat.length === 0) {
      alert("Alamat belum diisi");
      return;
    }
  
    if (tahunMasuk.length === 0) {
      alert("Tahun masuk belum diisi");
      return;
    }
  
    alamat = encodeURIComponent(alamat);
    jenisKelamin = encodeURIComponent(jenisKelamin);
    jp = encodeURIComponent(jp);
    nama = encodeURIComponent(nama);
    nim = encodeURIComponent(nim);
    statusNikah = encodeURIComponent(statusNikah);
    tahunMasuk = encodeURIComponent(tahunMasuk);
    tanggalLahir = encodeURIComponent(tanggalLahir);
    tempatLahir = encodeURIComponent(tempatLahir);
  
    var url = "https://stmikpontianak.net/011100862/tambahMahasiswa.php" +
      "?alamat=" + alamat +
      "&jenisKelamin=" + jenisKelamin +
      "&jp=" + jp +
      "&nama=" + nama +
      "&nim=" + nim +
      "&statusPernikahan=" + statusNikah +
      "&tahunMasuk=" + tahunMasuk +
      "&tanggalLahir=" + tanggalLahir +
      "&tempatLahir=" + tempatLahir;
  
    this.http.get(url).subscribe((data: any) => {
      console.log(data);
      alert(data.status + " --> " + data.message);
      this.bind_mahasiswa();
      $("#tambahModal").modal("hide");
    });
  }
  
  
}