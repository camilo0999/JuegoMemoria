import { Routes } from '@angular/router';
import { InicioComponent } from './Paginas/inicio/inicio.component';
import { RegisterComponent } from './Paginas/register/register.component';
import { JugarComponent } from './Paginas/jugar/jugar.component';

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
];
