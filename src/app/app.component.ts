import { Component } from '@angular/core';
import { StatementAccountService } from './app/core/services/statement-account.service';
import { ResponseStatementAccount, StatementAccount } from './app/shared/models/statement-account.model';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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

  displayedColumns: string[] = ['id', 'nContribution', 'concept', 'dueDate', 'paymentDate', 'amount' ];
  displayedBeMadeColumns: string[] = ['id', 'nContribution', 'concept', 'dueDate', 'amount' ];

  ELEMENT_DATA: StatementElement[] = [];
  ELEMENT_DATA_BE_MADE: StatementElement[] = [];
  paymentMade = [];
  paymentBeMade = [];
  searchForm  = {
    searchTerm: ''
  };
  statementAccount: StatementAccount | any | undefined;

  constructor( private statementAccountService: StatementAccountService ) {
    this.loadData('1362021000028');
  }

  searchTerm( arg ): void {
    this.loadData( this.searchForm.searchTerm.toString().trim() );
  }

  loadData(term?: string ): void {
    this.statementAccountService.getStatementAccount( term ).subscribe( (response: ResponseStatementAccount ) => {

      this.statementAccount = response?.response;
      console.error( this.statementAccount );
      // if ( this.statementAccount?.PagosRealizados?.PagosRealizados.length > 0 ) {
      if (  this.statementAccount?.opcNombre !== '' && this.statementAccount?.opcNombre !== null ) {
        this.statementAccount?.PagosRealizados?.PagosRealizados.forEach( (value , index ) => {
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

        this.statementAccount?.PagosPorRealizar?.PagosPorRealizar.forEach( (value , index ) => {
          this?.ELEMENT_DATA_BE_MADE.push({
            id: value?.id,
            nContribution: value?.iNoAport,
            concept: value?.cConcepto,
            dueDate: value?.cVencimiento,
            paymentDate: value?.cFechaPago,
            amount: value?.deMonto,
            cTipo: value?.cTipo
          });
        });
        this.paymentBeMade = this.ELEMENT_DATA_BE_MADE;
        console.warn( this.paymentBeMade );

      } else {

        this.paymentMade = [];
        this.paymentBeMade = [];

      }

    }, ( error ) => {
      console.error('Error of ', error );
    });

  }
  
}
