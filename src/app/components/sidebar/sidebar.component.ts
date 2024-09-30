import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {


  menuItem = [
    {
      icon: 'bi bi-house',
      route: 'cartoes',
      title: 'Cartoes',
    },
    {
      icon: 'bi bi-person',
      route: 'usuarios',
      title: 'Usuários',
    },

  ];

}
