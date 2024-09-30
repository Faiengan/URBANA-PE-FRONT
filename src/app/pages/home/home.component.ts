import { ChangeDetectorRef, Component } from '@angular/core';
import { Cartao } from 'src/app/models/cartao/cartao';
import { CartaoService } from 'src/app/services/api/cartao.service';
import SwiperCore, { EffectCards, EffectCoverflow, Swiper, SwiperOptions } from 'swiper';
SwiperCore.use([EffectCoverflow, EffectCards]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cartaoSelecionado: any;
  cartoes$ = this.cartaoService.getCartoes();
  cartoes: Cartao[] = [];
  isModalOpen = false;
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation : true,
    centeredSlides: true,
    pagination: { clickable: true },
    effect: 'cards'

  };

  constructor(
    private cdr: ChangeDetectorRef,
    private cartaoService: CartaoService
  ) {
    this.cartaoService.buscarCartoes();
  }

  ngOnInit() {
    this.cartoes$.subscribe(cartoes => {
      this.cartoes = cartoes;
      
      if (this.cartoes.length > 0) {
        this.cartaoSelecionado = this.cartoes[0];
      }
    });
  }

  getImagem(tipo: string) {
    switch (tipo) {
      case 'COMUM':
        return "url('../../../assets/images/cartoes/vem_comum_frente.jpg')";
      case 'ESTUDANTE':
        return "url('../../../assets/images/cartoes/vem_estudante_frente.jpg')";
      case 'TRABALHADOR':
        return "url('../../../assets/images/cartoes/vem_trabalhador_frente.jpg')";
      default:
        return "url('../../../assets/images/cartoes/default.jpg')";
    }
  }

  onSlideChange([swiper]: [Swiper]) {
    
    const index = swiper.activeIndex;

    this.cartaoSelecionado = this.cartoes[index]
    this.cdr.detectChanges();

  }

  excluirCartao() {
    this.cartaoService.deletarCartao(this.cartaoSelecionado.id);
  }

  apagarCartao(id: string){
    this.cartaoService.deletarCartao(id);
  }

  abrirModalCadastrarCartao() {
    this.isModalOpen = true;
  }
  
  fecharModalCartao() {
    this.isModalOpen = false;
  }
  bloquearOuDesbloquearCartao() {
    this.cartaoService.alterarStatus(this.cartaoSelecionado);
  }
}
