import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/comprador/estatistica",
    title: "Dashboard",
    rtlTitle: "لوحة القيادة",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/comprador/ver-fornecedores",
    title: "Fornecedor",
    rtlTitle: "الرموز",
    icon: "icon-single-02",
    class: ""
  },
   {
    path: "/comprador/localizar-mercadoria",
    title: "Localizar Mercadoria",
    rtlTitle: "ار تي ال",
    icon: "icon-bus-front-12",
    class: ""
  },
  {
    path: "/comprador/ver-faturas",
    title: "Faturas",
    rtlTitle: "خرائط",
    icon: "icon-paper",
    class: "" },

  {
    path: "/comprador/propostas-faturas",
    title: "Propostas de Faturas",
    rtlTitle: "ملف تعريفي للمستخدم",
    icon: "icon-notes",
    class: ""
  },
  {
    path: "/comprador/proposta-faturas-aceites",
    title: "Faturas aceites",
    rtlTitle: "إخطارات",
    icon: "icon-check-2",
    class: ""
  },

  {
    path: "/comprador/taxa-aduaneira",
    title: "Taxa aduaneira",
    rtlTitle: "قائمة الجدول",
    icon: "icon-money-coins",
    class: ""
  }

];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  menuItems!: any[];

  constructor(private userService: UserService) {}

ngOnInit() {
  const tipoDeEntidadeId = localStorage.getItem('tipo_de_entidade_id');
  if (tipoDeEntidadeId) {
    this.userService.getMenu(tipoDeEntidadeId).subscribe(menus => {
      this.menuItems = menus;
    });
  } else {
    console.error('Erro: tipo_de_entidade_id não encontrado no localStorage');
  }
}

  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
