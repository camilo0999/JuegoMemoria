import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../Servicios/users.service';
import { User } from '../../Interfaces/users.interface';

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
  jugador1: User | null = null;
  jugador2: User | null = null;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
    this.router.navigate(['/registrar-usuario']);
  }

  iniciarJuego(): void {
    if (this.canStartGame()) {
      this.guardarJugadoresEnLocalStorage();
      const jugadores = this.getSelectedPlayers();
      this.router.navigate(['/jugar/']);
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
    const jugador1ConPuntaje = this.jugador1
      ? { ...this.jugador1, puntaje: 0 }
      : null;

    const jugador2ConPuntaje =
      this.cantidadJugadores === 2 && this.jugador2
        ? { ...this.jugador2, puntaje: 0 }
        : null;

    const jugadoresSeleccionados = {
      jugador1: jugador1ConPuntaje,
      jugador2: jugador2ConPuntaje,
    };

    localStorage.setItem(
      'Jugadores_Seleccionados',
      JSON.stringify(jugadoresSeleccionados)
    );
  }

  private cargarJugadoresDesdeLocalStorage(): void {
    const jugadoresGuardados = localStorage.getItem('jugadoresSeleccionados');
    if (jugadoresGuardados) {
      const { jugador1, jugador2 } = JSON.parse(jugadoresGuardados);

      // Agregamos campo 'puntaje' si no existe
      if (jugador1) {
        jugador1.puntaje = jugador1.puntaje ?? 0;
        this.jugador1 = jugador1;
      }

      if (jugador2) {
        jugador2.puntaje = jugador2.puntaje ?? 0;
        this.jugador2 = jugador2;
      }
    }
  }

  volver(): void {
    window.history.back();
  }
}
