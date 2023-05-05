export interface IAltaempleadoProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import * as React from 'react';
import { IDepartamentos, ICentros, IUbicaciones,IModoContratacion ,IPuestos,ICategoria, IEmpresa} from './Repositories';


export interface IAltaEmpladosProps {
  description: string;
  NameEmpleado: string;
  apellidoEmpleado: string;
  telefono: string;
  telefonoMovil: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  email: string;
  Dni: string;
  fechaAlta: string;
  Observaciones: string;
  urlPersonal: string;
  listName: string;
  spHttpClient: SPHttpClient;
  departamento: string;
  OptionDepartamento: IDepartamentos[];
  OptionCentros: ICentros[];
  centro: string;
  urlwebMyNet: string;
  Webadasasistemas: string;
  ubicacion: string;
  OptionUbicacion: IUbicaciones[];
  WebRRHH: string;
  modoContratacion: string;
  OptionModoContratacion: IModoContratacion[];
  puesto: string;
  OptionPuesto: IPuestos[];
  categoria: string;
  OptionCategoria: ICategoria[];
  Webadasa: string;
  OptionEmpresas: IEmpresa[];
  empresa: string;
  login: string;
  idlogin:number;
  context: any;
}



export  class Repositories extends React.Component<{}> {

  
  public spHttpClient: SPHttpClient;
  public  Cancelar() {
    console.log("Cancelado");
  }
  
  state = {
    NameEmpleado: "",
    apellidoEmpleado: "",
    EmpresaEmpleado: "",
    email: "",
    Dni: ""
  };
  public onSave(item : any){
    console.log(this.state);
    console.log(item);
    console.log("Update!!!");
    console.log(item.props.urlPersonal);
    //console.log(item.props);
    var body ='';
    //limpiamos columna AsignadoA en los siguients estados  
        body = JSON.stringify({
        '__metadata': {
          'type': 'SP.Data.EmpleadosListItem'
        },
        'Title': this.state.NameEmpleado,
        'Nombre': this.state.NameEmpleado,
        'FullName': this.state.NameEmpleado + " " + this.state.apellidoEmpleado ,
        'Company': this.state.EmpresaEmpleado,
        'email': this.state.email,
        'Dni': this.state.Dni,
      })
      
      var  urlpost = `${item.props.urlPersonal}/_api/web/lists/getbytitle('${item.props.listName}')/items`;

      if(!item.props.Id){
        console.log("Entro");
        urlpost = `${item.props.urlPersonal}/_api/web/lists/getbytitle('${item.props.listName}')/items`;
      }else{
        urlpost = `${item.props.urlPersonal}/_api/web/lists/getbytitle('${item.props.listName}')/items(${item.props.id})`;
      }
      console.log(body);
      console.log(urlpost);
    return new Promise<any>((resolve)=>
    {          
      item.props.spHttpClient.post(urlpost, SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=verbose',
            'odata-version': ''
          },
          body: body
        }).then((response: SPHttpClientResponse): void => {
          console.log(response);
          resolve(response);
            //this.loadItems();
        });
    });         
  }


  }






