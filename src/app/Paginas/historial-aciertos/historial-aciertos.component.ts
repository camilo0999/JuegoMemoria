import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartidasUsuariosService } from '../../Servicios/partidas-usuarios.service';

@Component({
  selector: 'app-historial-aciertos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-aciertos.component.html',
  styleUrl: './historial-aciertos.component.scss',
})
export class HistorialAciertosComponent {
  historial: any[] = [];
  paginaActual: number = 1;
  totalPaginas: number = 1;
  itemsPorPagina: number = 5;
  cargando: boolean = true;

  topJugadores: { name: string; email: string; totalAciertos: number }[] = [];

  constructor(private partidasUsuariosService: PartidasUsuariosService) {}

  ngOnInit(): void {
    this.obtenerHistorial();
  }

  obtenerHistorial(): void {
    this.cargando = true;
    this.partidasUsuariosService.getAciertos().subscribe(
      (respuesta: any[]) => {
        this.historial = respuesta;
        this.totalPaginas = Math.ceil(
          this.historial.length / this.itemsPorPagina
        );
        this.calcularTopJugadores();
        this.cargando = false; // ✅ Ocultar spinner
      },
      (error) => {
        console.error('Error al obtener historial:', error);
        this.cargando = false;
      }
    );
  }

  calcularTopJugadores(): void {
    const acumulado = new Map<
      string,
      { name: string; email: string; totalAciertos: number }
    >();

    for (const registro of this.historial) {
      const email = registro.user?.email;
      if (!email) continue;

      const nombre = registro.user?.name || 'Desconocido';
      const aciertos = registro.aciertos || 0;

      if (acumulado.has(email)) {
        acumulado.get(email)!.totalAciertos += aciertos;
      } else {
        acumulado.set(email, { name: nombre, email, totalAciertos: aciertos });
      }
    }

    this.topJugadores = Array.from(acumulado.values())
      .sort((a, b) => b.totalAciertos - a.totalAciertos)
      .slice(0, 3);
  }

  cambiarPagina(direccion: number): void {
    this.reproducirSonidoBoton();
    const nuevaPagina = this.paginaActual + direccion;
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
    }
  }

  get historialPaginado(): any[] {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    return this.historial.slice(inicio, inicio + this.itemsPorPagina);
  }

  getAvatarIcon(index: number): string {
    switch (index) {
      case 0:
        return '👑'; // Oro
      case 1:
        return '🥈'; // Plata
      case 2:
        return '🥉'; // Bronce
      default:
        return '👤'; // Por defecto
    }
  }
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

  volver(): void {
    this.reproducirSonidoBoton();
    window.history.back();
  }
}
