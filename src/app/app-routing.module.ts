import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,
      children: [
        { path: 'cartoes', component: HomeComponent },
        { path: 'usuarios', component: UsuariosComponent },
        { path: '', redirectTo: 'cartoes', pathMatch: 'full' }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
