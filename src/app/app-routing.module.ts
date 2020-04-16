import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'data_form',loadChildren:()=>import('./formulario-reativo/formulario-reativo.module').then(m=>m.FormularioReativoModule)},
  {path:'',redirectTo:'data_form',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
