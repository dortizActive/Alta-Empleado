import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'AltaEmpladosWebPartStrings';
import AltaEmplados from './components/Altaempleado';
import { IAltaEmpladosProps } from './components/IAltaempleadoProps';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SPHttpClient } from '@microsoft/sp-http';
import { IDepartamentos, Repositories,ICentros, IUbicaciones, IModoContratacion,IPuestos, ICategoria, IEmpresa } from './components/Repositories'

export interface IAltaEmpladosWebPartProps {
  description: string;
  apellidoEmpleado: string;
  telefono: string;
  telefonoMovil: string;
  NameEmpleado: string;
  email: string;
  Dni: string;
  fechaAlta: string;
  Observaciones:string;
  urlPersonal: string;
  listName: string;
  spHttpClient: SPHttpClient;
  departamento: string;
  stringOptionDepartamento: string;
  OptionDepartamento: IDepartamentos[];
  OptionCentros: ICentros[];
  webMyNet: string;
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
  idlogin: number;
  context: WebPartContext
}

export default class AltaEmpladosWebPart extends BaseClientSideWebPart<IAltaEmpladosWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  public repo: Repositories;
  public render(): void {
   console.log("Aquí entro");
   
    const element: React.ReactElement<IAltaEmpladosProps> = React.createElement(
      AltaEmplados,
      {
        description: this.properties.description,
        NameEmpleado: this.properties.NameEmpleado,
        apellidoEmpleado: this.properties.apellidoEmpleado,
        telefono: this.properties.telefono,
        telefonoMovil: this.properties.telefonoMovil,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        email: this.properties.email,
        userDisplayName: this.context.pageContext.user.displayName,
        Dni: this.properties.Dni,
        fechaAlta: this.properties.fechaAlta,
        Observaciones: this.properties.Observaciones,
        urlPersonal: this.properties.urlPersonal,
        listName: this.properties.listName,
        spHttpClient: this.context.spHttpClient,
        departamento: this.properties.departamento,
        OptionDepartamento: this.properties.OptionDepartamento,
        OptionCentros: this.properties.OptionCentros,
        centro: this.properties.centro,
        urlwebMyNet: this.properties.urlwebMyNet,
        Webadasasistemas: this.properties.Webadasasistemas,
        OptionUbicacion: this.properties.OptionUbicacion,
        ubicacion: this.properties.ubicacion,
        WebRRHH: this.properties.WebRRHH,
        OptionModoContratacion: this.properties.OptionModoContratacion,
        modoContratacion: this.properties.modoContratacion,
        OptionPuesto: this.properties.OptionPuesto,
        puesto: this.properties.puesto,
        OptionCategoria: this.properties.OptionCategoria,
        categoria: this.properties.categoria,
        Webadasa: this.properties.Webadasa,
        OptionEmpresas: this.properties.OptionEmpresas,
        empresa: this.properties.empresa,
        login: this.properties.login,
        context: this.context,
        idlogin: this.properties.idlogin
        
        
        
      }
      
    );
   
      console.log("Propiedades");
      console.log(this.properties);
      console.log(this.properties.urlPersonal);
      console.log(this.properties.urlwebMyNet);
    //this.prop.urlPersonal = this.properties.urlPersonal;
    this.repo=new Repositories(this.context, this.properties);
   
    console.log("Entro Promise");
    Promise.all([
     
      this.repo.getCentros(),
      this.repo.getUbicación(),
      this.repo.getPuesto(),
      this.repo.getCategoria(),
      this.repo.getDepartamentos(),
      this.repo.getEmpresa()
    ])
      .then(results => {
        console.log("Entro Promise result");
        this.properties.OptionCentros = results[0];
        this.properties.OptionUbicacion = results[1];
        this.properties.OptionPuesto = results[2];
        this.properties.OptionCategoria = results[3];
        this.properties.OptionDepartamento = results[4];
        this.properties.OptionEmpresas = results[5];
        ReactDom.render(element, this.domElement);
      })
      .catch(error => {
        console.log("Entro Promise result");
        console.error(error);
      });

     
  }

  

  protected onInit(): Promise<void> {
    console.log("Entro en esto onInit");
    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
  }      



  private _getEnvironmentMessage(): Promise<string> {
    console.log("Entro en esto _getEnvironmentMessage");
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              throw new Error('Unknown host');
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    console.log("Entro en onThemeChanged");
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

    
  }

  public  OnHandle_Cancelar(){

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
