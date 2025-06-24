import { Routes } from '@angular/router';
import { InicioComponent } from './Paginas/inicio/inicio.component';
import { RegisterComponent } from './Paginas/register/register.component';
import { JugarComponent } from './Paginas/jugar/jugar.component';
import { RegistrarUsuarioComponent } from './Paginas/registrar-usuario/registrar-usuario.component';
import { HistorialAciertosComponent } from './Paginas/historial-aciertos/historial-aciertos.component';

export const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
  },
  {
    path: 'jugadores/:cantidadJugadores',
    component: RegisterComponent,
  },
  {
    path: 'jugar',
    component: JugarComponent,
  },
  {
    path: 'registrar-usuario',
    component: RegistrarUsuarioComponent,
  },
  {
    path: 'historial-partidas',
    component: HistorialAciertosComponent,
  },
];
