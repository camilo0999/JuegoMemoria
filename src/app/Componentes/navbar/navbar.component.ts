import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public jugadores: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    // Verifica si estamos en el navegador antes de acceder a localStorage
    if (isPlatformBrowser(this.platformId)) {
      const storedData = localStorage.getItem('jugadores');

      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          this.jugadores = Array.isArray(parsedData)
            ? parsedData
            : [parsedData];
        } catch (error) {
          console.error('Error al parsear los datos de localStorage:', error);
        }
      }
    }
  }
}
