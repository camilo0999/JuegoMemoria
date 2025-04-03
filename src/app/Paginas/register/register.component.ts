import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Importar FormsModule
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  cantidadJugadores: number = 1;
  jugador1: any = { nombre: '', edad: '', puntaje: 0 };
  jugador2: any = { nombre: '', edad: '', puntaje: 0 };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const cantidad = Number(params.get('cantidadJugadores'));
      this.cantidadJugadores = cantidad === 2 ? 2 : 1;
    });
  }

  public registrar() {
    if (this.cantidadJugadores === 1) {
      localStorage.setItem('jugador1', JSON.stringify(this.jugador1));
    } else {
      localStorage.setItem('jugador1', JSON.stringify(this.jugador1));
      localStorage.setItem('jugador2', JSON.stringify(this.jugador2));
    }
  }

  public volver() {
    window.history.back();
  }
}
