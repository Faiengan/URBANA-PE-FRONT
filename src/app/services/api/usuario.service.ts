import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UsuarioApiService } from './usuarioApi.service';
import { Usuario } from 'src/app/models/usuario/usuario';
import { UsuarioForm } from 'src/app/models/usuario/usuarioForm';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    private usuarios$ = new BehaviorSubject<Usuario[]>([]);

    constructor(
        private usuarioApiService: UsuarioApiService
    ) { }

    buscarUsuarios() {
        this.usuarioApiService.getUsuarios().subscribe((usuarios) => {
            this.usuarios$.next(usuarios);
        },
        (error) => {console.error('Ocorreu um erro ao tentar buscar os usuarios:', error)}
        );
    }

    getUsuarios() {
        return this.usuarios$.asObservable();
    }

    async deletarUsuario(id: string): Promise<void> {
        try {
            await this.usuarioApiService.deletarUsuario(id);
            const usuariosAtuais = this.usuarios$.getValue();
            const usuariosAtualizados = usuariosAtuais.filter(u => u.id !== id); 
            this.usuarios$.next(usuariosAtualizados);
        } catch (error) {
            console.error('Ocorreu um erro ao tentar deletar o usuário:', error)
        }
    }

    cadastrarUsuario(usuario: UsuarioForm) {
        this.usuarioApiService.cadastrarUsuario(usuario).subscribe((usuarioCadastrado) => {
            const usuariosAtualizados = [...this.usuarios$.getValue(), usuarioCadastrado];
            this.usuarios$.next(usuariosAtualizados);
        },
        (error) => {console.error("Ocorreu um erro ao tentar cadastrar o usuário:")}
        );
    }

    editarUsuario(usuario: Usuario) {
        this.usuarioApiService.editarUsuario(usuario).subscribe((usuarioAtualizado) => {
            const usuariosAtuais = this.usuarios$.getValue();
            const indiceUsuarioEditado = usuariosAtuais.findIndex(u => u.id === usuarioAtualizado.id);
            const usuariosAtualizados = [...usuariosAtuais];
            usuariosAtualizados[indiceUsuarioEditado] = usuarioAtualizado;
            this.usuarios$.next(usuariosAtualizados);
        },
        (error) => {console.error("Ocorreu um erro ao tentar editar o usuário:")}
        );
    }
}
