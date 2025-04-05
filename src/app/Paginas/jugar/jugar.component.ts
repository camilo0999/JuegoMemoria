import { Component } from '@angular/core';
import { NavbarComponent } from '../../Componentes/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jugar',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './jugar.component.html',
  styleUrl: './jugar.component.scss',
})
export class JugarComponent {
  public volver() {
    window.history.back();
  }
}
