import { MatOption } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorFn, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import Swal from 'sweetalert2';

@Injectable()
export class ErpgrafService {
  constructor(private http: HttpClient) {
    sessionStorage.setItem('authForm', JSON.stringify(true));
}

createFormGroupFromObject(fb: FormBuilder, obj: any): FormGroup {
    const controls = Object.keys(obj).reduce((acc: { [key: string]: FormControl }, key) => {
      acc[key] = new FormControl(obj[key]);
      return acc;
    }, {});

    return fb.group(controls);
}

async getCNPJ(cnpj: unknown) {
    const empresa = await this.http
      .get(`https://api.cnpja.com/office/${cnpj}?maxAge=1&registrations=BR`)
      .toPromise()
      .catch((msg) => msg);
    return empresa;
  }

  paginate(array, pageSize, pageNumber) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  markAsDirty(
    formGroup: FormGroup | FormArray,
    isList = false,
    opts?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ) {
    if (!isList) {
      for (const c in (<FormGroup>formGroup).controls) {
        formGroup.controls[c].markAsDirty();
      }
      formGroup.updateValueAndValidity(opts);
    } else {
      (<FormArray>formGroup).controls.forEach((item) => {
        const line = <FormGroup>item;
        for (const c in line.controls) {
          line.controls[c].markAsDirty();
        }
        line.updateValueAndValidity(opts);
      });
      formGroup.updateValueAndValidity(opts);
    }
  }

  validCnpj(): ValidatorFn {
    return <ValidatorFn>((control: FormControl) => {
      if (!control.value) return null;
      let valor = control.value.toString();

      valor = valor.replace(/[^0-9]/g, '');

      const cnpjOriginal = valor;
      const primeirosNumerosCnpj = valor.substr(0, 12);
      const primeiroCalculo = this.calcDigit(primeirosNumerosCnpj, 5);
      const segundoCalculo = this.calcDigit(primeiroCalculo, 6);
      const cnpj = segundoCalculo;
      if (cnpj === cnpjOriginal) {
        return null;
      }
      return { invalid: true };
    });
  }
  calcDigit(digitos, posicoes = 10, soma_digitos = 0) {
    digitos = digitos.toString();
    for (let i = 0; i < digitos.length; i++) {
      soma_digitos += digitos[i] * posicoes;
      posicoes--;
      if (posicoes < 2) {
        posicoes = 9;
      }
    }
    soma_digitos %= 11;
    if (soma_digitos < 2) {
      soma_digitos = 0;
    } else {
      soma_digitos = 11 - soma_digitos;
    }
    const cpf = digitos + soma_digitos;
    return cpf;
  }


  sortArrayFromValue(array: Array<any>): Array<any> {
    return array.sort((a, b) => {
      return a.de - b.de;
    });
  }

  setValidations(form: FormGroup, validations) {
    for (const key in form.controls) {
      const validation = validations[key] ? validations[key] : null;
      form.controls[key].setValidators(validation);
      form.controls[key].updateValueAndValidity();
    }
  }

  async getIpLookup() {
    const lookup = new Lookup();
    const resIp = await this.http
      .get('https://ipapi.co/json')
      .toPromise()
      .catch((msg) => msg);

    if (resIp.ip) {
      lookup.ip = resIp.ip;
      lookup.pais = resIp.country_name;
      lookup.ufCod = resIp.region_code;
      lookup.ufNome = resIp.region;
      lookup.cidade = resIp.city;
      lookup.cep = resIp.postal;
      lookup.latitude = resIp.latitude;
      lookup.longitude = resIp.longitude;
      lookup.asn = resIp.asn;
      lookup.isp = resIp.org;
    }
    return lookup;
  }
}