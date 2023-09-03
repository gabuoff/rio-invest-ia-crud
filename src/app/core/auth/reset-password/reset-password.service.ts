import { RIO_INVEST_API } from './../../../shared/config/invest.conf';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const RECOVER_TYPES = {
  USUARIO: "usuario",
  EMAIL: "email"
};

interface RecoveryRequest {
  usuario?: string;
  email?: string;
}

@Injectable({ providedIn: 'root' })
export class RecoverService {
  constructor(private http: HttpClient) {}

  recover(recoverType: keyof typeof RECOVER_TYPES, recover: RecoveryRequest) {
    switch (recoverType) {
      case RECOVER_TYPES.USUARIO:
        return this.http.post(`${RIO_INVEST_API}/api/recover/username`, { usuario: recover.usuario });
      case RECOVER_TYPES.EMAIL:
        return this.http.post(`${RIO_INVEST_API}/api/recover/email`, { email: recover.email });
      default:
        throw new Error(`Unknown recover type: ${recoverType}`);
    }
  }
}
