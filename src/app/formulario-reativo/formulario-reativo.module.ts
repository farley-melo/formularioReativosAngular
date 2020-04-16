import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioReativoRoutingModule } from './formulario-reativo-routing.module';
import { DataFormComponent } from './data-form/data-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ConsultaCepService} from './data-form/consulta-cep.service';

@NgModule({
  declarations: [DataFormComponent],
  imports: [
    CommonModule,
    FormularioReativoRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[ConsultaCepService]
})
export class FormularioReativoModule { }
