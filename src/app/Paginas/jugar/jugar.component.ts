import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../Componentes/navbar/navbar.component';
import { CommonModule } from '@angular/common';
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

  constructor() {
    const data = localStorage.getItem('jugadores');
    this.jugadores = data ? JSON.parse(data) : [];
  }

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

  public mostrarMensajeToast(mensaje: string) {
    this.mensajeToast = mensaje;
    this.mostrarToast = true;

    setTimeout(() => {
      this.mostrarToast = false;
      this.mensajeToast = '';
    }, 2000); // El toast se oculta después de 2 segundos
  }

  public reverso =
    'https://png.pngtree.com/png-vector/20191001/ourlarge/pngtree-spiral-galaxy-icon-cartoon-style-png-image_1772741.jpg';

  public filas: any[][] = [];

  ngOnInit() {
    this.generarFilas();
  }

  public cambiarTurno() {
    this.turnoActual = (this.turnoActual + 1) % this.jugadores.length;
  }

  public generarFilas() {
    const columnas = 3;
    for (let i = 0; i < this.cartas.length; i += columnas) {
      this.filas.push(this.cartas.slice(i, i + columnas));
    }
  }
  public volver() {
    window.history.back();
  }

  public destaparCarta(idCarta: number) {
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

  public emparejarCartas() {
    const [carta1, carta2] = this.cartas.filter(
      (c) => !c.tapada && !c.emparejada
    );

    if (carta1 && carta2) {
      if (carta1.nombre === carta2.nombre) {
        carta1.emparejada = true;
        carta2.emparejada = true;

        this.jugadores[this.turnoActual].puntaje =
          (this.jugadores[this.turnoActual].puntaje || 0) + 1;

        // Guardar el localStorage los puntos
        localStorage.setItem('jugadores', JSON.stringify(this.jugadores));

        this.mostrarMensajeToast(
          `¡${this.jugadores[this.turnoActual].nombre} hizo una pareja! 🎉`
        );
      } else {
        carta1.tapada = true;
        carta2.tapada = true;

        // Cambiar de turno
        this.cambiarTurno();
        this.mostrarMensajeToast(
          `Turno de ${this.jugadores[this.turnoActual].nombre}`
        );
      }
    }
  }

  public iniciarJuego(): void {
    // Reiniciar estado de las cartas
    this.cartas.forEach((carta) => {
      carta.tapada = true;
      carta.emparejada = false;
    });

    // Mostrar mensaje solo si el juego no está activo
    if (!this.estadoJuego) {
      this.mostrarMensajeToast(`¡${this.jugadores[0]?.nombre} comienza! 🎉`);
    }

    // Generar las filas del tablero
    this.generarFilas();

    // Alternar el estado del juego
    this.estadoJuego = !this.estadoJuego;
  }
}
