import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario';
import { UsuarioService } from 'src/app/services/api/usuario.service';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
    usuarios$ = this.usuarioService.getUsuarios();
    usuarios: Usuario[] = [];
    isModalCadastroOpen = false;
    isModalEditarOpen = false;
    visible: boolean = false;
    usuarioSelecionado: any;

    constructor(
        private usuarioService: UsuarioService,

    ) {
        this.usuarioService.buscarUsuarios();
    }

    ngOnInit() {
        this.usuarios$.subscribe(usuarios => {
          this.usuarios = usuarios;
        });
    }

    showDialog() {
        this.visible = true;
    }

    deletarUsuario(id: string) {
        console.log(id)
        this.usuarioService.deletarUsuario(id);
    }

    abrirModalCadastrarUsuario() {
        this.isModalCadastroOpen = true;
    }

    fecharModalCadastrarUsuario() {
        this.isModalCadastroOpen = false;
    }

    fecharModalEditarUsuario() {
        this.isModalEditarOpen = false;
    }

    editarUsuario(usuario: Usuario) {
        this.usuarioSelecionado = usuario;
        console.log(this.usuarioSelecionado)
        this.isModalEditarOpen = true;
    }
}
