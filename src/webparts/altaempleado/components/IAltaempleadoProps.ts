export interface IAltaempleadoProps {
  webMyNet: any;
  userDisplayName: string;
  urlPersonal: string;
  spHttpClient: SPHttpClient;
  OptionDepartamento: ISelected[];
  OptionCentros: ISelected[];
  urlwebMyNet: string;
  Webadasasistemas: string;
  OptionUbicacion: ISelected[];
  WebRRHH: string;
  OptionModoContratacion: ISelected[];
  OptionPuesto: ISelected[];
  OptionCategoria: ISelected[];
  Webadasa: string;
  OptionEmpresas: ISelected[];
  context: WebPartContext;
}
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import * as React from 'react';
import {  ISelected} from './Repositories';
import { WebPartContext } from '@microsoft/sp-webpart-base';




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






