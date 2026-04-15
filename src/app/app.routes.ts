import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { NotFound } from './not-found/not-found';
import { ProductDetails } from './product-details/product-details';
import { Catalog } from './catalog/catalog';
import { Profile } from './profile/profile';
import { Login } from './profile/login/login';
import { Register } from './profile/register/register';
import { UserDetails } from './profile/user-details/user-details';
import { ManageUsers } from './manage-users/manage-users';
import { ViewUsers } from './manage-users/view-users/view-users';
import { EditUser } from './manage-users/edit-user/edit-user';
import { ManageProducts } from './manage-products/manage-products';
import { ViewProducts } from './manage-products/view-products/view-products';
import { EditProduct } from './manage-products/edit-product/edit-product';
import { CartComponent } from './cart/cart';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'about',
    component: About
  },
  {
    path: 'catalog',
    component: Catalog
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'product-details/:name',
    component: ProductDetails
  },
  {
    path: 'profile',
    component: Profile,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'user-details', component: UserDetails }
    ]
  },
  {
    path: 'manage-users',
    component: ManageUsers,
    children: [
      { path: '', component: ViewUsers },
      { path: 'edit/:email', component: EditUser }
    ]
  },
  {
    path: 'manage-products',
    component: ManageProducts,
    children: [
      { path: '', component: ViewProducts },
      { path: 'add', component: EditProduct },
      { path: 'edit/:id', component: EditProduct }
    ]
  },

  {
    path: '**',
    component: NotFound
  }
];


