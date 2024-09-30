import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartaoForm } from 'src/app/models/cartao/cartaoForm';
import { CartaoService } from 'src/app/services/api/cartao.service';
import { UsuarioService } from 'src/app/services/api/usuario.service';

@Component({
  selector: 'app-cadastrar-cartao',
  templateUrl: './cadastrar-cartao.component.html',
  styleUrls: ['./cadastrar-cartao.component.scss']
})
export class CadastrarCartaoComponent {
  usuarios$ = this.usuarioService.getUsuarios();

  cartaoForm = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    numero: new FormControl('', [Validators.required]),
    cartaoTipo: new FormControl('COMUM', [Validators.required]),
    usuarioId: new FormControl('', [Validators.required])
  });
  
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  tiposCartao = ['COMUM', 'ESTUDANTE', 'TRABALHADOR'];
  usuarioSelecionado: any;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private cartaoServise: CartaoService
  ) {
    this.usuarioService.buscarUsuarios();
  }

  async cadastrar(): Promise<void> {
    if (this.cartaoForm.valid) {
      const valores = this.cartaoForm.value;
      const cartao: CartaoForm = {
        nome: String(valores.nome),
        numero: String(valores.numero),
        cartaoTipo: String(valores.cartaoTipo),
        usuarioId: String(valores.usuarioId),
      }
      try {
        const response = await this.cartaoServise.cadastrarCartao(cartao);
        this.fecharModal();
        this.cartaoForm.reset();
      } catch (error) {
        console.error("Ocorreu um erro durante o cadastro do cartão!");
      }
    } else {
      console.log('Formulário inválido!');
    }
  }

  fecharModal() {
    this.closeModal.emit();
  }
}
