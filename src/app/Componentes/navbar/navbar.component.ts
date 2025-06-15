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
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  public jugadores: any[] = [];
  private intervalId: any;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.actualizarJugadores();

      // Actualiza los datos cada 2 segundos
      this.intervalId = setInterval(() => {
        this.actualizarJugadores();
      }, 2000);
    }
  }

  actualizarJugadores(): void {
    const storedData = localStorage.getItem('Jugadores_Seleccionados');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);

        const jugadores: any[] = [];

        if (parsedData.jugador1) {
          jugadores.push(parsedData.jugador1);
        }

        if (parsedData.jugador2) {
          jugadores.push(parsedData.jugador2);
        }

        this.jugadores = jugadores;
      } catch (error) {
        console.error('Error al parsear los datos de localStorage:', error);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
