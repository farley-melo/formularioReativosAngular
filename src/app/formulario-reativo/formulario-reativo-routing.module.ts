import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DataFormComponent} from './data-form/data-form.component';

const routes: Routes = [
  {path:'',component:DataFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularioReativoRoutingModule { }
