import { Component } from '@angular/core';
import { StatementAccountService } from './app/core/services/statement-account.service';
import { ResponseStatementAccount, StatementAccount } from './app/shared/models/statement-account.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

export interface StatementElement {
  id?:number;
  nContribution?:string;
  concept?:string; 
  dueDate?:string;
  paymentDate?:string;
  amount?:number;
  cTipo?:string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['id', 'nContribution', 'concept', 'dueDate', 'paymentDate', 'amount' ];
  ELEMENT_DATA: StatementElement[] = [];
  paymentMade = [];

  statementAccount: StatementAccount | any | undefined;

  constructor( private statementAccountService: StatementAccountService ) {

    statementAccountService.getStatementAccount('1362021000028').subscribe( (response: ResponseStatementAccount ) => {
      if ( response  ) {
        console.error('Response ', response );
        this.statementAccount = response?.response;
        console.error('Response *  ', this.statementAccount );
        this.statementAccount?.PagosRealizados?.PagosRealizados.forEach( (value , index ) => {
          console.error( value );
          this?.ELEMENT_DATA.push({
            id: value?.id,
            nContribution: value?.iNoAport,
            concept: value?.cConcepto,
            dueDate: value?.cVencimiento,
            paymentDate: value?.cFechaPago,
            amount: value?.deMonto,
            cTipo: value?.cTipo
          });
        });

        this.paymentMade = this.ELEMENT_DATA;
        console.error('Pagos realizados ', this.paymentMade );

      } 
    }, ( error ) => {
      console.error('Error of ', error );
    });

  }
  
}
