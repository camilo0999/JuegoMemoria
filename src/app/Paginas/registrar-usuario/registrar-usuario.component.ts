import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../Interfaces/users.interface';
import { UsersService } from '../../Servicios/users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss'],
})
export class RegistrarUsuarioComponent {
  newUser = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  juego_id: string = '1ac36c93-e37d-4622-a7a9-a838096c2e2d';

  constructor(private usersService: UsersService, private router: Router) {}

  registrarUsuario(): void {
    if (this.newUser.password !== this.newUser.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Crear el payload que sí coincide con lo que espera el backend
    const payload: User = {
      name: this.newUser.name,
      email: this.newUser.email,
      password: this.newUser.password,
      password_confirmation: this.newUser.confirmPassword,
      juego_id: this.juego_id,
    };

    this.usersService.createUser(payload).subscribe({
      next: () => {
        alert('Usuario registrado con éxito');
        window.history.back();
      },
      error: (err) => {
        console.error('Error registrando usuario:', err);
        if (err?.error?.errors) {
          const errores = Object.values(err.error.errors).flat().join('\n');
          alert('Errores:\n' + errores);
        } else {
          alert('Error al registrar el usuario');
        }
      },
    });
  }

  volver(): void {
    window.history.back();
  }
}
