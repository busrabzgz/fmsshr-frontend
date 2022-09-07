import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Meetings from "views/examples/Meetings.js";
import RegisterUser from "views/examples/RegisterUser.js"
import Adverts from "views/examples/Adverts.js";

var routes = [
  //admin
  {
    path: "/index",
    name: "Ana Sayfa",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/kullanicilar",
    name: "Kullanıcılar",
    icon: "ni ni-planet text-blue",
    component: Meetings,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "Profilim",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/ilanlar",
    name: "İlanları Görüntüle",
    icon: "ni ni-briefcase-24 text-red",
    component: Adverts,
    layout: "/admin"
  },
  {
    path: "/meetings",
    name: "Meetings",
    icon: "ni ni-pin-3 text-orange",
    component: Meetings,
    layout: "/admin"
  },
  {
    path: "/candidates",
    name: "Candidates",
    icon: "ni ni-bullet-list-67 text-red",
    component: Meetings,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Giriş Yap",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/kullanici-kayit",
    name: "Kullanıcı Kaydet",
    icon: "ni ni-circle-08 text-pink",
    component: RegisterUser,
    layout: "/admin"
  },
  //user
  {
    path: "/index",
    name: "Ana Sayfa",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/user",
  },
  {
    path: "/ilanlar",
    name: "İlanları Görüntüle",
    icon: "ni ni-tv-2 text-primary",
    component: Adverts,
    layout: "/user",
  },

];
export default routes;
