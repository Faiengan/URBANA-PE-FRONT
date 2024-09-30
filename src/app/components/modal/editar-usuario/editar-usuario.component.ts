import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario/usuario';
import { UsuarioForm } from 'src/app/models/usuario/usuarioForm';
import { UsuarioService } from 'src/app/services/api/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent {
    @Input() usuario: any;

    @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
    usuarioFormEditar = new FormGroup({
        nome: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        senha: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
    

    constructor(
        private fb: FormBuilder,
        private usuarioService: UsuarioService,
    ) {
    }

    ngOnInit() {
      this.usuarioFormEditar.setValue({
        nome: this.usuario.nome,
        email: this.usuario.email,
        senha: this.usuario.senha
      });
    }

    async editar(): Promise<void> {
        if (this.usuarioFormEditar.valid) {
          const valores = this.usuarioFormEditar.value;
          const usuario: Usuario = {
            id: String(this.usuario.id),
            nome: String(valores.nome),
            email: String(valores.email),
            senha: String(valores.senha),
          }
          try {
            const response = await this.usuarioService.editarUsuario(usuario);
            this.fecharModal();
            this.usuarioFormEditar.reset();
          } catch (error) {
            console.error("Ocorreu um erro durante a edição do usuario!");
          }
        } else {
          console.log('Formulário inválido!');
        }
      }

    fecharModal() {
        this.closeModal.emit(); 
    }
}
