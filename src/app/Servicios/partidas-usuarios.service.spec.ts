import { TestBed } from '@angular/core/testing';

import { PartidasUsuariosService } from './partidas-usuarios.service';

describe('PartidasUsuariosService', () => {
  let service: PartidasUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartidasUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
