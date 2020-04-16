import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ConsultaCepService} from './consulta-cep.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {
  formulario:FormGroup;
  constructor(private formBuilder:FormBuilder,
              private http:HttpClient,
              private consultaCepService:ConsultaCepService) { }

  ngOnInit() {

    this.formulario=this.formBuilder.group(
      {
        nome:[null,[Validators.required,Validators.minLength(3)]],
        email:[null,[Validators.required,Validators.email]],
        endereco:this.formBuilder.group(
          {
            cep:[null,[Validators.required]],
            numero:[null,[Validators.required]],
            complemento:[null],
            rua:[null,[Validators.required]],
            bairro:[null,[Validators.required]],
            cidade:[null,[Validators.required]],
            estado:[null,[Validators.required]]
          }
        )

      });
    console.log(this.formulario);
  }

  onSubmit() {
    if (!this.formulario.invalid) {
      this.http.post('https://httpbin.org/post', this.formulario.value)
        .subscribe(dados => {
          console.log(dados);
          this.resetar();
        }, error => {
          alert('error')
        });
    }else {
      alert('nao foi possivel fazer requisiçao existem erros no formulario');
    }
  }
  verificaInvalidTouch(campo:string):boolean{
    return !this.formulario.get(campo).valid&&this.formulario.get(campo).touched;
  }
  verificaValidTouch(campo:string):boolean{
    return this.formulario.get(campo).valid&&this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo:string):string{
    if(this.verificaInvalidTouch(campo)){
      return 'is-invalid';
    }else if(this.verificaValidTouch(campo)){
      return 'is-valid'
    }

    return null;
  }
  verificarEmailInValid():boolean{
     let email=this.formulario.get('email');
     if(email.errors){
       return email.errors['email'];
     }
  }

  resetar() {
    this.formulario.reset();
  }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.consultaCepService.consultaCEP(cep)
        .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados) {
    // this.formulario.setValue({});

    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        // cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    this.formulario.get('nome').setValue('Loiane');

    // console.log(form);
  }

}
