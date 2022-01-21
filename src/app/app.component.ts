import { Component } from '@angular/core';
import { StatementAccountService } from './app/core/services/statement-account.service';
import { ResponseStatementAccount, StatementAccount } from './app/shared/models/statement-account.model';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import date from 'date-and-time';

export interface StatementElement {
  id?:number;
  nContribution?:string;
  concept?:string; 
  dueDate?:string;
  paymentDate?:string;
  amount?:number;
  cTipo?:string;
  isLess?:boolean; // es menor a fecha actual
  isGreater?: boolean; // es mayor y menor a 3 meses
  isValidDueDate?:boolean;
  isGreaterThanThreeMonths?: boolean; // es mayor a 3 meses
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

        this.statementAccount?.PagosPorRealizar?.PagosPorRealizar.every( (value , index, array ) => {
          
          try {

            let now = new Date();
            let nowDay =  now.getDate();
            let nowMoth =  now.getMonth()+1;
            let nowYear =  now.getFullYear();
            let cVencimientoAux = date.transform( value?.cVencimiento, 'DD-MM-YYYY', 'MM/DD/YYYY' );
            let isGreater = false;
            let isGreaterThanThreeMonths =  false;

            let cVencimiento = new Date( String(cVencimientoAux).trim() );
            let venDay =  cVencimiento.getDate();
            let venMoth =  cVencimiento.getMonth()+1;
            let venYear =  cVencimiento.getFullYear();
            let resMonth = venMoth-nowMoth;

            if (  cVencimiento.getTime() >= now.getTime() ) {
              if ( resMonth < 3 ) { // es menor a tres meses
                isGreater = true;
              }
            }

            if ( resMonth > 3 ) { // si vencimiento es mayor a 3 meses
              isGreaterThanThreeMonths = true;
            }


            this?.ELEMENT_DATA_BE_MADE.push({
              id: value?.id,
              nContribution: value?.iNoAport,
              concept: value?.cConcepto,
              dueDate: value?.cVencimiento,
              paymentDate: value?.cFechaPago,
              amount: value?.deMonto,
              cTipo: value?.cTipo, 
              isLess: ( cVencimiento.getTime() < now.getTime()  ),
              isGreater: isGreater,
              isGreaterThanThreeMonths: isGreaterThanThreeMonths,
              isValidDueDate: false
            });

          } catch( ex ) {
            console.error('Error try get Date ', ex );
          }

          return true;
        });

        this.paymentBeMade = this.ELEMENT_DATA_BE_MADE;

      } else {

        this.paymentMade = [];
        this.paymentBeMade = [];

      }

    }, ( error ) => {
      console.error('Error of ', error );
    });

  }

}
