import { IEntity } from "./Interfaces";




export interface IAltaEmpleados{
  Title: string;
  FirstName: string;
    FullName: string;
    EmpresaId:string;
    LoginId: string;
    WorkPhone:string;
    CellPhone:string;
    EMail: string;
    WebPage: string;
    WorkCity:string;
    mynetDepartamentoId: string;
    UbicacionId: string;
    Comments: string;
    Puesto_x0020_de_x0020_trabajoId: string;
    WorkZip:string;
    puestoId: string;
    categoriaId: string;
    centroId:string;

    
}
export interface IPersanSolicitudMuestras {
  Id:number;
  MuestrasId: number;
  Title?:string;
  DropdownID?: number;
  peoplePickerPerson: IPerson;
  peoplePickerPersonId: number
  Estado?:string;
  Muestras:IMuestra[];
  NombreCliente: string;
  PaisCliente: string;
  EspecificacionesCliente: string;
  Empresa: string;
  Destinatario: string;
  EnvioInterno: boolean;
  Telefono: string;
  DireccionEnvio: string;
  Email: string;
  FechaResolucionOperaciones: Date;
  FechaEntregaAlmacen: Date;
  FechaEntregaID: Date;
  FechaSolicitada: Date;
  EnvioUrgente: boolean;
  MensajeriaUrgente: boolean;
  Peso: string;
  NBultos: string;
  FechaEnvioCliente: Date;
  NumeroSeguimiento: string;
  Validado: boolean;
  Solicitante:IPerson[];
  SolicitanteId: number[];
  EntregadoAlmacen: boolean;
  EntregadoOperaciones: boolean;
  EntregadoID: boolean;
  FechaCompromiso: Date;
  Laboratorio: string;



}
export interface IMuestra extends IEntity{
  ResponsableIDId: number[]; 
  IdSolicitudId: number;
  ResponsableID:IPerson[];
  DocumentacionCalidad: boolean;
  CategoriaProductoId: number;
  Descripcion: string;
  BenchMark: string;
  PaisClienteId: number;
  Perfume: string;
  CodigoSAPPerfume: string;
  DosificacionPerfume: string;
  ProveedorPerfume: string;
  PerfumeEncapsulado1: string;
  CodigoSAPPerfumeEncapsulado1: string;
  DosificacionPerfumeEncapsulado1: string;
  ProveedorPerfumeEncapsulado1: string;
  PerfumeEncapsulado2: string;
  CodigoSAPPerfumeEncapsulado2: string;
  DosificacionPerfumeEncapsulado2: string;
  ProveedorPerfumeEncapsulado2: string;
  ReferenciaColor: string;
  Dosificacion: string;
  VolLlenado: string;
  Unidad: string;
  NumLavados: string; //Falta
  TotalMuestras: string;
  //FinalidadMuestrasId: string;
  ComentarioFinalidad: string;
  Envase: string;
  DescripcionEnvase :string; //Falta
  RevisionMuestras: boolean;
  Comentarios: string;
  FormulaEnviable: string;
  FormulaEspecificaciones: string;
  EnvioProductoTerminado: boolean;
  ProductoTerminadoEnviable: string;
  ComentariosID: string;
  FichaSeguridadId: number;
  MMPPNoHomologadas: boolean;
  Validado: boolean;
  DocumentacionAnexada: boolean;
  Tapon: string;
  TaponVertedor: string;
  Etiqueta: string;
  DescripcionTapon: string;
  DescripcionTaponVertedor: string;
  DescripcionEtiqueta: string;
  CodigoLote: boolean;
  TotalEnvase: string;
}
export interface IMuestraGuardar extends IEntity{
  ResponsableIDId: number[]; 
  IdSolicitudId: number;
  DocumentacionCalidad: boolean;
  CategoriaProductoId: number;
  Descripcion: string;
  BenchMark: string;
  PaisClienteId: number;
  Perfume: string;
  CodigoSAPPerfume: string;
  DosificacionPerfume: string;
  ProveedorPerfume: string;
  PerfumeEncapsulado1: string;
  CodigoSAPPerfumeEncapsulado1: string;
  DosificacionPerfumeEncapsulado1: string;
  ProveedorPerfumeEncapsulado1: string;
  PerfumeEncapsulado2: string;
  CodigoSAPPerfumeEncapsulado2: string;
  DosificacionPerfumeEncapsulado2: string;
  ProveedorPerfumeEncapsulado2: string;
  ReferenciaColor: string;
  Dosificacion: string;
  VolLlenado: string;
  Unidad: string;
  NumLavados: string; //Falta
  TotalMuestras: string;
  //FinalidadMuestrasId: string;
  ComentarioFinalidad: string;
  Envase: string;
  DescripcionEnvase :string; //Falta
  RevisionMuestras: boolean;
  Comentarios: string;
  FormulaEnviable: string;
  FormulaEspecificaciones: string;
  EnvioProductoTerminado: boolean;
  ProductoTerminadoEnviable: string;
  ComentariosID: string;
  FichaSeguridadId: number;
  MMPPNoHomologadas: boolean;
  Validado: boolean;
  DocumentacionAnexada: boolean;
  Tapon: string;
  TaponVertedor: string;
  Etiqueta: string;
  DescripcionTapon: string;
  DescripcionTaponVertedor: string;
  DescripcionEtiqueta: string;
  CodigoLote: boolean;
  TotalEnvase: string;

}

export interface IPerson{
    EMail?:string;
    Title?:string;
    Id?:number;
  }

export interface ISelected{
    Id:number;
    Title?:string;
  }
  export interface ISelect {
    value:string;
    label: string;
    // color?: string;
    // isFixed?: boolean;
    // isDisabled?: boolean;
  }

  export interface IDocument {

    Id?: number;
    Name?: string;
    FileRef?: string;
    Modified?: string;
    ModifiedBy?: Date;
    Created?: string;
    CreatedBy?: string;
    FileIcon?: string;
    VersionString?: string;
    ContentType?: string;
    ParentWebUrl?: string;
    UniqueId?: string;
    Seccion?: string;
    SeccionId?: number;
    HTML_x0020_File_x0020_Type?:string;
 

}
