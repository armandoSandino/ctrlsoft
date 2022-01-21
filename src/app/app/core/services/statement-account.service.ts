import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { statementAccountUrl } from '../../shared/const/http/url';
import { ResponseStatementAccount } from '../../shared/models/statement-account.model';

@Injectable({
  providedIn: 'root'
})
export class StatementAccountService {

  constructor( private http: HttpClient ) {
    
  }

  getStatementAccount(ipcContrato?:string | number | any ): Observable<ResponseStatementAccount>{
    return this.http.get<ResponseStatementAccount>(`${statementAccountUrl}?ipcContrato=${ipcContrato}`)
    .pipe(
      tap( (res: ResponseStatementAccount) => {
        return res;
      }, ( error ) => {
        return error;
      }),
      retry(1),
      catchError( this.handleError )
    );
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
