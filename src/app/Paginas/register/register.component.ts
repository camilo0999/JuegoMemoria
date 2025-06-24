import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../Servicios/users.service';
import { PartidasService } from '../../Servicios/partidas.service';
import { User } from '../../Interfaces/users.interface';
import { Partida } from '../../Interfaces/partidas.interface';

interface JugadoresSeleccionados {
  jugador1: (User & { puntaje: number }) | null;
  jugador2: (User & { puntaje: number }) | null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  cantidadJugadores: number = 1;
  usuarios: User[] = [];
  jugador1: (User & { puntaje?: number }) | null = null;
  jugador2: (User & { puntaje?: number }) | null = null;

  constructor(
    private usersService: UsersService,
    private partidasService: PartidasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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

  ngOnInit(): void {
    this.cargarUsuarios();
    this.obtenerCantidadJugadores();
    this.cargarJugadoresDesdeLocalStorage();
  }

  private obtenerCantidadJugadores(): void {
    const cantidad = Number(
      this.route.snapshot.paramMap.get('cantidadJugadores')
    );
    this.cantidadJugadores = cantidad === 2 ? 2 : 1;
  }

  cargarUsuarios(): void {
    this.usersService.getAllUsers().subscribe({
      next: (users) => (this.usuarios = users),
      error: (err) => console.error('Error cargando usuarios:', err),
    });
  }

  redireccionarRegistro(): void {
    this.reproducirSonidoBoton();
    this.router.navigate(['/registrar-usuario']);
  }

  iniciarJuego(): void {
    if (this.canStartGame()) {
      this.guardarJugadoresEnLocalStorage();
      const hoy = new Date();
      const fechaFormateada = hoy.toISOString().split('T')[0]; // Esto devuelve "2025-06-11"

      const nuevaPartida: Partida = {
        id: undefined,
        juego_id: '1ac36c93-e37d-4622-a7a9-a838096c2e2d',
        fecha: fechaFormateada,
        tiempo: 0,
        nivel: 'facil',
      };
      this.reproducirSonidoBoton();

      this.partidasService.postPartida(nuevaPartida).subscribe({
        next: (partidaCreada) => {
          console.log('Partida creada:', partidaCreada.id);
          localStorage.setItem(
            'partidaActual',
            JSON.stringify(partidaCreada.id)
          );
          this.router.navigate(['/jugar/']);
        },
        error: (err) => {
          console.error('Error creando partida:', err);
          this.router.navigate(['/jugar/']);
        },
      });
    }
  }

  private canStartGame(): boolean {
    return !!this.jugador1 && (this.cantidadJugadores === 1 || !!this.jugador2);
  }

  private getSelectedPlayers(): User[] {
    const jugadores = [this.jugador1 as User];
    if (this.cantidadJugadores === 2 && this.jugador2) {
      jugadores.push(this.jugador2);
    }
    return jugadores;
  }

  private guardarJugadoresEnLocalStorage(): void {
    const jugadoresSeleccionados: JugadoresSeleccionados = {
      jugador1: this.jugador1 ? { ...this.jugador1, puntaje: 0 } : null,
      jugador2:
        this.cantidadJugadores === 2 && this.jugador2
          ? { ...this.jugador2, puntaje: 0 }
          : null,
    };

    localStorage.setItem(
      'jugadoresSeleccionados', // Nombre consistente en minúsculas
      JSON.stringify(jugadoresSeleccionados)
    );
  }

  private cargarJugadoresDesdeLocalStorage(): void {
    const jugadoresGuardados = localStorage.getItem('jugadoresSeleccionados');
    if (!jugadoresGuardados) return;

    try {
      const { jugador1, jugador2 } = JSON.parse(
        jugadoresGuardados
      ) as JugadoresSeleccionados;

      if (jugador1) {
        this.jugador1 = { ...jugador1, puntaje: jugador1.puntaje ?? 0 };
      }

      if (jugador2) {
        this.jugador2 = { ...jugador2, puntaje: jugador2.puntaje ?? 0 };
      }
    } catch (error) {
      console.error('Error al parsear jugadores:', error);
      localStorage.removeItem('jugadoresSeleccionados');
    }
  }

  volver(): void {
    this.reproducirSonidoBoton();
    window.history.back();
  }
}
