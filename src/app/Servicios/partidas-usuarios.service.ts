import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PartidaUsuario } from '../Interfaces/partidaUsuario.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartidasUsuariosService {
  private apiUrl = 'https://apigame.gonzaloandreslucio.com/api/aciertos';

  constructor(private http: HttpClient) {}

  postAciertos(aciertos: PartidaUsuario): Observable<PartidaUsuario> {
    return this.http.post<PartidaUsuario>(this.apiUrl, aciertos);
  }

  getAciertos(): Observable<PartidaUsuario[]> {
    return this.http.get<PartidaUsuario[]>(this.apiUrl);
  }
}
