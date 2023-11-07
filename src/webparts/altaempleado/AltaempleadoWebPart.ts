import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'AltaEmpladosWebPartStrings';
import AltaEmplados from './components/Altaempleado';
import { IAltaempleadoProps } from './components/IAltaempleadoProps';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';

import {  Repositories } from './components/Repositories'



export default class AltaEmpladosWebPart extends BaseClientSideWebPart<IAltaempleadoProps> {


  public repo: Repositories;
  public render(): void {
   console.log("Aquí entro");
   this.properties
    
   const element = React.createElement(AltaEmplados, {
    webMyNet: "",
    userDisplayName: "",
    urlPersonal: "",
    spHttpClient: this.properties.spHttpClient,
    OptionDepartamento: [],
    OptionCentros: [],
    urlwebMyNet: this.properties.urlwebMyNet,
    Webadasasistemas: this.properties.Webadasasistemas,
    OptionUbicacion: [],
    WebRRHH: this.properties.WebRRHH,
    OptionModoContratacion:[],
    OptionPuesto: [],
    OptionCategoria:[],
    Webadasa: this.properties.Webadasa,
    OptionEmpresas: [],
    context: this.context
  });
  
   
      console.log("Propiedades nuevo");
      console.log(this.properties);
    //this.prop.urlPersonal = this.properties.urlPersonal;
  
   
    console.log("Entro Promise");
   
    ReactDom.render(element, this.domElement);
   

     
  }

  

  protected onInit(): Promise<void> {
    console.log("Entro en esto onInit");
    return this._getEnvironmentMessage().then(message => {
      console.log(message);
    });
  }      



  private _getEnvironmentMessage(): Promise<string> {
   

    return Promise.resolve("" ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  

  public  OnHandle_Cancelar(){

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.EmpleadosPanel,
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: `Nombre Lista Empleados`,
                  value:  "Empleados"
                  }),
                PropertyPaneTextField('urlPersonal', {
                  label: `URL Personal`,
                  value:   "https://activebt.sharepoint.com/sites/AdasaMyNet/RRHH/Personal"
                  }),
                  PropertyPaneTextField('urlwebMyNet', {
                    label: `URL webMyNet`,
                    value:   "https://activebt.sharepoint.com/sites/myNet"
                  }),
                  PropertyPaneTextField('Webadasasistemas', {
                    label: `URL Web Adasa Sistemas`,
                    value:   "https://activebt.sharepoint.com/sites/AdasaMyNet/Sistema"
                  }),
                  PropertyPaneTextField('WebRRHH', {
                    label: `URL Web RRHH`,
                    value:  "https://activebt.sharepoint.com/sites/myNet/RRHH"
                  }),
                  PropertyPaneTextField('Webadasa', {
                    label: `URL Web Adasa`,
                    value:  "https://activebt.sharepoint.com/sites/AdasaMyNet"
                  })
              ]
            }
          ]
        }
      ]
    };
  }
}
