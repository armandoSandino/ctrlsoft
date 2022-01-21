export class StatementAccount {

    opcNombre?: string;
    opiGrupo?:number;
    opiIntegrante?:number;
    opiDigitoV?:number;
    opcEstatus?:string;
    opcSigPago?:number;
    opcFechaSP?:string;
    opiMesRest?:number;
    opcPlan?:string;
    opcMontoPag?:number;
    opcPagosRealizados?:number;
    opcPagosPorRealizar?:number;
    oplContratoPDF?:boolean;
    opcValidaCampo?:string;
    opcIDDist?:number;
    opcDistribuidora?:string;
    opcEstado?:string;
    opcDireccion?:string;
    opcEntreCalles?:string;
    opcGerente?:string;
    opcTelefono?:string;
    opcEmail?:string;
    opcFechaContrato?:string;
    Calendario?: any [];
    PagosPorRealizar: any [];
    PagosRealizados:any [];

    constructor(json?: any ){

    }
}

export interface ResponseStatementAccount {
    statementAccount: StatementAccount[];
}