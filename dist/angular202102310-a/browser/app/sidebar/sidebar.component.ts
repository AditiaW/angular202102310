// SidebarComponent
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() moduleName: string = "";

  constructor(private router: Router) {} // Inject Router in the constructor

  signOut(): void {
    // Proses logout, misalnya:
    // Hapus data dari sessionStorage atau variabel lain yang menyimpan status login
    sessionStorage.removeItem('userId');

    // Redirect ke halaman login setelah logout
    this.router.navigate(['/login']);
  }
}
