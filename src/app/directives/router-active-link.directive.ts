import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: '[appRouterLinkActiveExact]'
})
export class RouterActiveLinkDirective {

  @Input('appRouterLinkActiveExact') link: string | undefined;

  constructor(private el: ElementRef, private router: Router) {}

  @HostListener('click') onClick() {
    const currentUrl = this.router.url;
    if (currentUrl === this.link) {
      this.el.nativeElement.classList.add('active-exact');
    } else {
      this.el.nativeElement.classList.remove('active-exact');
    }
  }

}
