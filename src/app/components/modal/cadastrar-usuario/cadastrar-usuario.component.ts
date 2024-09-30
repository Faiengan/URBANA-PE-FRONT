import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioForm } from 'src/app/models/usuario/usuarioForm';
import { UsuarioService } from 'src/app/services/api/usuario.service';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent {
    usuarioFormCadastro = new FormGroup({
        nome: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        senha: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });

    @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private fb: FormBuilder,
        private usuarioService: UsuarioService,
    ) {
    }

    async cadastrar(): Promise<void> {
        if (this.usuarioFormCadastro.valid) {
          const valores = this.usuarioFormCadastro.value;
          const usuario: UsuarioForm = {
            nome: String(valores.nome),
            email: String(valores.email),
            senha: String(valores.senha),
          }
          try {
            const response = await this.usuarioService.cadastrarUsuario(usuario);
            this.fecharModal();
            this.usuarioFormCadastro.reset();
          } catch (error) {
            console.error("Ocorreu um erro durante o cadastro do usuario!");
          }
        } else {
          console.log('Formulário inválido!');
        }
      }

    fecharModal() {
        this.closeModal.emit(); 
    }
}
