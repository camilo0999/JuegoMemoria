import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../Componentes/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { PartidasUsuariosService } from '../../Servicios/partidas-usuarios.service';
import { PartidaUsuario } from '../../Interfaces/partidaUsuario.interface';

@Component({
  selector: 'app-jugar',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './jugar.component.html',
  styleUrl: './jugar.component.scss',
})
export class JugarComponent implements OnInit {
  public jugadores: any[] = [];
  public turnoActual = 0;
  public estadoJuego = false;

  public mensajeToast: string = '';
  public mostrarToast: boolean = false;
  public mostrarModalGuardar: boolean = false;

  // Cronómetro
  public tiempo = 0;
  public intervalo: any;
  public tiempoFormateado = '00:00';
  public segundos: number = 0;

  // Música
  public audio = new Audio('/assets/sonidos/play.mp3');
  public musicaActiva = true;

  // Tablero
  public cartas = [
    {
      id: 1,
      nombre: 'astronauta',
      imagen: 'https://cdn-icons-png.flaticon.com/256/11013/11013659.png',
      tapada: true,
      emparejada: false,
    },
    {
      id: 2,
      nombre: 'tierra',
      imagen:
        'https://images.vexels.com/media/users/3/261528/isolated/lists/9ecf6e11808a12bced0a3ad5eb4a7817-planeta-tierra-plano-simple.png',
      tapada: true,
      emparejada: false,
    },
    {
      id: 3,
      nombre: 'marciano',
      imagen: 'https://cdn-icons-png.flaticon.com/512/9926/9926437.png',
      tapada: true,
      emparejada: false,
    },
    {
      id: 4,
      nombre: 'astronauta',
      imagen: 'https://cdn-icons-png.flaticon.com/256/11013/11013659.png',
      tapada: true,
      emparejada: false,
    },
    {
      id: 5,
      nombre: 'cohete',
      imagen:
        'https://media.istockphoto.com/id/1452870348/es/vector/icono-de-cohete-en-estilo-plano-despegue-de-la-nave-espacial-en-el-fondo-espacial.jpg?s=612x612&w=0&k=20&c=GZkzWmChG_3ecbSCEu5pnA6tE81DRMwGlN3USPgQTo8=',
      tapada: true,
      emparejada: false,
    },
    {
      id: 6,
      nombre: 'marciano',
      imagen: 'https://cdn-icons-png.flaticon.com/512/9926/9926437.png',
      tapada: true,
      emparejada: false,
    },
    {
      id: 7,
      nombre: 'reverso',
      imagen: 'https://cdn-icons-png.flaticon.com/256/12373/12373794.png',
      tapada: true,
      emparejada: false,
    },
    {
      id: 8,
      nombre: 'cohete',
      imagen:
        'https://media.istockphoto.com/id/1452870348/es/vector/icono-de-cohete-en-estilo-plano-despegue-de-la-nave-espacial-en-el-fondo-espacial.jpg?s=612x612&w=0&k=20&c=GZkzWmChG_3ecbSCEu5pnA6tE81DRMwGlN3USPgQTo8=',
      tapada: true,
      emparejada: false,
    },
    {
      id: 9,
      nombre: 'reverso',
      imagen: 'https://cdn-icons-png.flaticon.com/256/12373/12373794.png',
      tapada: true,
      emparejada: false,
    },
    {
      id: 10,
      nombre: 'tierra',
      imagen:
        'https://images.vexels.com/media/users/3/261528/isolated/lists/9ecf6e11808a12bced0a3ad5eb4a7817-planeta-tierra-plano-simple.png',
      tapada: true,
      emparejada: false,
    },
    {
      id: 11,
      nombre: 'ovni',
      imagen:
        'https://images.vexels.com/media/users/3/150075/isolated/lists/a741e3f3d6ab8f6a904574b1084aa8c8-ilustracion-de-objeto-volador-no-identificado.png',
      tapada: true,
      emparejada: false,
    },
    {
      id: 12,
      nombre: 'ovni',
      imagen:
        'https://images.vexels.com/media/users/3/150075/isolated/lists/a741e3f3d6ab8f6a904574b1084aa8c8-ilustracion-de-objeto-volador-no-identificado.png',
      tapada: true,
      emparejada: false,
    },
  ];
  public filas: any[][] = [];
  public reverso: string =
    'https://png.pngtree.com/png-vector/20191001/ourlarge/pngtree-spiral-galaxy-icon-cartoon-style-png-image_1772741.jpg';

  constructor(private partidasUsuariosService: PartidasUsuariosService) {
    const data = localStorage.getItem('jugadoresSeleccionados');
    const jugadoresData = data ? JSON.parse(data) : {};
    this.jugadores = Object.values(jugadoresData);
  }

  ngOnInit(): void {
    this.generarFilas();
  }

  public iniciarJuego(): void {
    this.cartas.forEach((carta) => {
      carta.tapada = true;
      carta.emparejada = false;
    });

    if (!this.estadoJuego) {
      this.mostrarMensajeToast(`¡${this.jugadores[0]?.name} comienza! 🎉`);
      this.iniciarCronometro();
      this.audio.loop = true;
      this.audio.play();
    } else {
      this.detenerCronometro();
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    this.generarFilas();
    this.estadoJuego = !this.estadoJuego;
  }

  public toggleMusica(): void {
    this.musicaActiva = !this.musicaActiva;
    this.musicaActiva ? this.audio.play() : this.audio.pause();
  }

  private iniciarCronometro(): void {
    this.tiempo = 0;
    this.actualizarTiempo();
    clearInterval(this.intervalo);
    this.intervalo = setInterval(() => {
      this.tiempo++;
      this.segundos++;
      this.actualizarTiempo();
    }, 1000);
  }

  private detenerCronometro(): void {
    clearInterval(this.intervalo);
  }

  private actualizarTiempo(): void {
    const minutos = Math.floor(this.tiempo / 60);
    const segundos = this.tiempo % 60;
    this.tiempoFormateado = `${this.formato(minutos)}:${this.formato(
      segundos
    )}`;
  }

  private formato(valor: number): string {
    return valor < 10 ? `0${valor}` : `${valor}`;
  }

  public generarFilas(): void {
    this.filas = [];
    const columnas = 3;
    for (let i = 0; i < this.cartas.length; i += columnas) {
      this.filas.push(this.cartas.slice(i, i + columnas));
    }
  }

  public cambiarTurno(): void {
    this.turnoActual = (this.turnoActual + 1) % this.jugadores.length;
  }

  public volver(): void {
    window.history.back();
  }

  public mostrarMensajeToast(mensaje: string): void {
    this.mensajeToast = mensaje;
    this.mostrarToast = true;
    setTimeout(() => (this.mostrarToast = false), 3000);
  }

  public destaparCarta(idCarta: number): void {
    const carta = this.cartas.find((c) => c.id === idCarta);
    if (!carta || !carta.tapada || carta.emparejada) return;

    carta.tapada = false;

    const cartasDestapadas = this.cartas.filter(
      (c) => !c.tapada && !c.emparejada
    );

    if (cartasDestapadas.length === 2) {
      setTimeout(() => this.emparejarCartas(), 1000);
    }
  }

  public emparejarCartas(): void {
    const [carta1, carta2] = this.cartas.filter(
      (c) => !c.tapada && !c.emparejada
    );

    if (carta1 && carta2) {
      if (carta1.nombre === carta2.nombre) {
        carta1.emparejada = true;
        carta2.emparejada = true;

        this.jugadores[this.turnoActual].puntaje =
          (this.jugadores[this.turnoActual].puntaje || 0) + 1;

        const jugadoresObj = {
          jugador1: this.jugadores[0],
          jugador2: this.jugadores[1],
        };

        localStorage.setItem(
          'jugadoresSeleccionados',
          JSON.stringify(jugadoresObj)
        );

        this.mostrarMensajeToast(
          `¡${this.jugadores[this.turnoActual].name} hizo una pareja! 🎉`
        );
      } else {
        carta1.tapada = true;
        carta2.tapada = true;

        this.cambiarTurno();
        this.mostrarMensajeToast(
          `Turno de ${this.jugadores[this.turnoActual].name}`
        );
      }
    }
  }

  public confirmarGuardar(): void {
    this.mostrarModalGuardar = false;
    this.guardarPartida();
  }

  public cancelarGuardar(): void {
    this.mostrarModalGuardar = false;
  }

  public guardarPartida(): void {
    const partida_id = parseInt(
      localStorage.getItem('partidaActual') || '0',
      10
    );

    if (isNaN(partida_id) || partida_id === 0) {
      console.error('ID de partida inválido o no encontrado en localStorage');
      this.mostrarMensajeToast('❌ Error al guardar la partida. ID inválido.');
      return;
    }

    this.jugadores.forEach((jugador: any) => {
      if (!jugador || jugador.id == null) {
        console.warn('Jugador inválido detectado y omitido:', jugador);
        return;
      }

      const partida: PartidaUsuario = {
        partida_id: partida_id,
        user_id: jugador.id,
        aciertos: jugador.puntaje || 0,
        tiempo: this.segundos,
      };

      console.log('Partida a guardar:', partida);

      this.partidasUsuariosService.postAciertos(partida).subscribe({
        next: (respuesta) => {
          console.log(`Partida guardada para ${jugador.name}:`, respuesta);
        },
        error: (error) => {
          console.error(
            `Error al guardar partida para ${jugador.name}:`,
            error
          );
          this.mostrarMensajeToast(
            `❌ Error al guardar la partida de ${jugador.name}`
          );
        },
      });
    });

    this.mostrarMensajeToast('✅ Partida guardada exitosamente');
  }
}
