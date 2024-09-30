import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { SwiperModule } from 'swiper/angular';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterActiveLinkDirective } from './directives/router-active-link.directive';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { TagModule } from 'primeng/tag';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CadastrarCartaoComponent } from './components/modal/cadastrar-cartao/cadastrar-cartao.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CadastrarUsuarioComponent } from './components/modal/cadastrar-usuario/cadastrar-usuario.component';
import { EditarUsuarioComponent } from './components/modal/editar-usuario/editar-usuario.component';

SwiperCore.use([Navigation, Pagination]);
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    SidebarComponent,
    RouterActiveLinkDirective,
    UsuariosComponent,
    CadastrarCartaoComponent,
    CadastrarUsuarioComponent,
    EditarUsuarioComponent,
  ],
  imports: [
    TagModule,
    SwiperModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
