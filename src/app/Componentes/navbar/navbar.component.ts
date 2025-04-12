import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  public jugadores: any[] = [];
  private intervalId: any;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.actualizarJugadores(); // carga inicial

      this.intervalId = setInterval(() => {
        this.actualizarJugadores();
      }, 2000); // actualiza cada 2 segundos
    }
  }

  actualizarJugadores(): void {
    const storedData = localStorage.getItem('jugadores');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        this.jugadores = Array.isArray(parsedData) ? parsedData : [parsedData];
      } catch (error) {
        console.error('Error al parsear los datos de localStorage:', error);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // evitar memoria colgada
    }
  }
}
