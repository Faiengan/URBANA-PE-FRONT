import { Injectable } from '@angular/core';
import { CartaoApiService } from './cartaoApi.service';
import { BehaviorSubject } from 'rxjs';
import { Cartao } from 'src/app/models/cartao/cartao';
import { FormControl } from '@angular/forms';
import { CartaoForm } from 'src/app/models/cartao/cartaoForm';

@Injectable({
    providedIn: 'root'
})
export class CartaoService {

    private cartoes$ = new BehaviorSubject<Cartao[]>([]);

    constructor(
        private cartaoApiService: CartaoApiService
    ) { 

    }

    buscarCartoes(usuario_id = "") {
        this.cartaoApiService.getCartoes(usuario_id).subscribe((cartoes) => {
            this.cartoes$.next(cartoes);
        },
        (error) => {console.error('Ocorreu um erro ao tentar buscar os cartões:', error)}
        );
    }

    async deletarCartao(id: string): Promise<void> {
        try {
            await this.cartaoApiService.deletarCartao(id);
            const cartoesAtuais = this.cartoes$.getValue();
            const cartoesAtualizados = cartoesAtuais.filter(c => c.id !== id); 
            this.cartoes$.next(cartoesAtualizados);
        } catch (error) {
            console.error('Ocorreu um erro ao tentar deletar o usuário:', error)
        }
    }

    alterarStatus(cartao: Cartao) {
        const statusNovo = !cartao.status;
        this.cartaoApiService.alterarStatus(cartao.id, statusNovo);
    }

    cadastrarCartao(cartao: CartaoForm) {
        this.cartaoApiService.cadastrarCartao(cartao).subscribe((cartaoCadastrado) => {
            const cartoesAtualizados = [...this.cartoes$.getValue(), cartaoCadastrado];
            this.cartoes$.next(cartoesAtualizados);
        },
        (error) => {console.error("Ocorreu um erro ao tentar cadastrar o cartão:")}
        );
    }

    getCartoes() {
        return this.cartoes$.asObservable();
    }
}
