import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Importar FormsModule
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  cantidadJugadores: number = 1;
  jugador1: any = {
    nombre: '',
    edad: '',
    puntaje: 0,
    tiempo: 0,
    numeroIntentos: 0,
  };
  jugador2: any = {
    nombre: '',
    edad: '',
    puntaje: 0,
    tiempo: 0,
    numeroIntentos: 0,
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const cantidad = Number(params.get('cantidadJugadores'));
      this.cantidadJugadores = cantidad === 2 ? 2 : 1;
    });
  }

  public registrar() {
    const jugadores = [this.jugador1];

    if (this.cantidadJugadores === 2) {
      jugadores.push(this.jugador2);
    }

    localStorage.setItem('jugadores', JSON.stringify(jugadores));
    this.router.navigate(['jugar']);
  }

  public volver() {
    window.history.back();
  }
}
