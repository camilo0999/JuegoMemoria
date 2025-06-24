import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partida } from '../Interfaces/partidas.interface';

@Injectable({
  providedIn: 'root',
})
export class PartidasService {
  private apiUrl = 'https://apigame.gonzaloandreslucio.com/api/partidas';

  constructor(private http: HttpClient) {}

  getPartidas(): Observable<Partida[]> {
    return this.http.get<Partida[]>(this.apiUrl);
  }

  postPartida(partida: Partida): Observable<Partida> {
    return this.http.post<Partida>(this.apiUrl, partida);
  }
}
