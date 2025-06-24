import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent {
  constructor(private router: Router) {}

  // Reproduce un sonido desde la ruta indicada
  public reproducirSonido(ruta: string): void {
    const sonido = new Audio(ruta);
    sonido.play().catch((error) => {
      console.error('No se pudo reproducir el sonido:', error);
    });
  }

  // Llama a la reproducción del sonido para botones
  public reproducirSonidoBoton(): void {
    this.reproducirSonido('/assets/sonidos/boton.mp3');
  }

  // Navega y reproduce sonido
  public selectMode(players: number): void {
    this.reproducirSonidoBoton();
    this.router.navigate(['jugadores/', players]);
  }

  public borrarJugadores(): void {
    this.reproducirSonidoBoton();
    localStorage.removeItem('jugadoresSeleccionados');
    localStorage.removeItem('partidaActual');
  }

  public redireccionarHistorial(): void {
    this.reproducirSonidoBoton();
    this.router.navigate(['/historial-partidas']);
  }
}
