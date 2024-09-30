import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario/usuario';
import { UsuarioForm } from 'src/app/models/usuario/usuarioForm';

@Injectable({
  providedIn: 'root'
})
export class UsuarioApiService {

    private baseUrl = `${environment.apiUrl}/usuario`;

    constructor(
        private http: HttpClient
    ) { }

    getUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(`${this.baseUrl}/buscar-todos`);
    }

    deletarUsuario(id: string): Observable<Object> {
        return this.http.delete<object>(`${this.baseUrl}/${id}`);
    }

    cadastrarUsuario(usuario: UsuarioForm): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.baseUrl}/cadastrar`, usuario);
    }

    editarUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(`${this.baseUrl}/${usuario.id}`, usuario);
    }
}
