import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cartao } from 'src/app/models/cartao/cartao';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CartaoForm } from 'src/app/models/cartao/cartaoForm';

@Injectable({
    providedIn: 'root'
})

export class CartaoApiService {

    private baseUrl = `${environment.apiUrl}/cartao`;

    constructor(
        private http: HttpClient
    ) {

    }

    getCartoes(usuario_id = ""): Observable<Cartao[]> {
        return this.http.get<Cartao[]>(`${this.baseUrl}/buscar-todos?usuario_id=${usuario_id}`);
    }

    alterarStatus(id: string, status: boolean): Observable<Cartao> {
        return this.http.patch<Cartao>(`${this.baseUrl}/${id}?status=${status}`, {});
    }

    deletarCartao(id: string): Observable<Object> {
        return this.http.delete<object>(`${this.baseUrl}/${id}`);
    }

    cadastrarCartao(cartao: CartaoForm): Observable<Cartao> {
        return this.http.post<Cartao>(`${this.baseUrl}/cadastrar/${cartao.usuarioId}`, cartao);
    }
}
