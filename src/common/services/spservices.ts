/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable require-atomic-updates */
/* eslint-disable @typescript-eslint/no-unused-vars */
//#region [Base] IMPORTS
import { Guid } from "@microsoft/sp-core-library";
import { FormCustomizerContext } from "@microsoft/sp-listview-extensibility";
import { SPFI } from "@pnp/sp";
import "@pnp/sp/batching";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import {
  IList
} from "@pnp/sp/lists";
import "@pnp/sp/site-users/web";
import "@pnp/sp/webs";
import { getSP } from "../PNPSettings";
import { Utils } from "../helpers/Utils";
import { IMuestra, IMuestraGuardar, IPersanSolicitudMuestras, ISelected } from "../../models/ShpInterfaces";
import mappers from "./mappers";
import { IItem, IItemAddResult, IItemUpdateResult } from "@pnp/sp/items";
import { IWeb, Web } from "@pnp/sp/webs";
import { ISiteGroups } from "@pnp/sp/site-groups/types";
import { Constantes } from "../helpers/Constantes";
import { IAttachmentInfo } from "@pnp/sp/attachments";
import { IFileAddResult, IFileInfo } from "@pnp/sp/files";
import { DigestCache, HttpClient, HttpClientResponse, IHttpClientOptions } from "@microsoft/sp-http-base";
import { IToken } from "../../models/Interfaces";
import * as moment from "moment";

//#endregion

// Class Services
export default class spservices {


  //#region PROPERTIES
  sp: SPFI;
  siteUrl: string;
  listId: Guid;
  relativeUrl: string;
  public factoryId: number;
  public checklistId: number;
  listBase: IList;
  listBaseMuestras: IList;
  libraryRelativeUrl: string;
  tokenguardado: string;
  tokenfechaexpiracion: number;
  serverRelativeUrl: any;
  serverUrlOrigin:string;
  webRoot: IWeb;
  //#endregion

  //#region CONSTRUCTOR
  constructor(
    private context: FormCustomizerContext,
    FlowURL?:string
  ) {
    this.sp = getSP();
    this.siteUrl = context.pageContext.site.absoluteUrl;
    this.relativeUrl = context.pageContext.web.serverRelativeUrl;
    this.serverUrlOrigin = new URL(context.pageContext.site.absoluteUrl).origin;
    // eslint-disable-next-line
    this.onInit();
  }

  // OnInit Function
  private async onInit(): Promise<void> {
    this.listBase = this.sp.web.getList(
      Utils.CombineRutas([
        this.relativeUrl, "/Lists/",Constantes.URLs.NombreDeLaLista,
      ])
    );
    this.listBaseMuestras = this.sp.web.getList(
      Utils.CombineRutas([
        this.relativeUrl, "/Lists/",Constantes.URLs.listaSolicitudMuestraLineas,
      ])
    );


  }
  //#endregion


  //#region PROJECT


  public async saveProject(solicitudMuestras: IPersanSolicitudMuestras): Promise<IPersanSolicitudMuestras> {
    let respuesta: IItemAddResult;
    let errores: any[] = [];
    let solicitudMuestrasGrabar: IPersanSolicitudMuestras;
    
    solicitudMuestrasGrabar = mappers.mapMuestras(solicitudMuestras); //hay datos que viajan mal con pnp
 
   
    if (!solicitudMuestrasGrabar.Id) {

      respuesta = await this.listBase.items.add(solicitudMuestrasGrabar);
    
      solicitudMuestras.Id = respuesta.data.Id;

    } else {

      respuesta = await this.listBase.items.getById(solicitudMuestrasGrabar.Id).update(solicitudMuestrasGrabar);
   
    }

    if (solicitudMuestras.Muestras != undefined) {
      let muestrasFinal: IMuestraGuardar[] = mappers.mapListadoMuestras(solicitudMuestras.Muestras, solicitudMuestras);
      for (let index = 0; index < muestrasFinal.length; index++) {
        const muestra = muestrasFinal[index];
        try{
          let resultado:IItemAddResult;
          //let resultadoupdate:IItemUpdateResult;
        if (!muestra.Id) {
          muestra.IdSolicitudId = solicitudMuestras.Id;
          resultado = await this.listBaseMuestras.items.add(muestra);
          //resultado= await this.sp.web.getList(this.relativeUrl + "/Lists/SolicitudMuestraLineas").items.add(ref);

        }else {
          respuesta = await this.listBaseMuestras.items.getById(muestra.Id).update(muestra);
          //resultadoupdate=await this.sp.web.getList(this.relativeUrl + "/Lists/SolicitudMuestraLineas").items.getById(ref.Id).update(ref);
            
        }
      }
      catch(error){
        
        errores.push(`Error  ${error.message}`);
      }
      
      
    }
  }
    
    return solicitudMuestras;
  }

  public async loadSolicitudMuestras(itemId: number): Promise<IPersanSolicitudMuestras> {
    const respuesta: IPersanSolicitudMuestras = (await this.listBase.items
       .getById(itemId)
       .select("*, Solicitante/Title, Solicitante/Id").expand("Solicitante")()) as IPersanSolicitudMuestras;
   
      
       console.log("ver respuesta");
       console.log(respuesta);
 
     return respuesta;
   }
   public async loadMuestras(IdSolicitudId: number): Promise<IMuestra[]> {
    const respuesta: IMuestra[] = (await this.listBaseMuestras.items
       .filter(`IdSolicitudId eq ${IdSolicitudId}`)
       .select("*, ResponsableID/Title, ResponsableID/Id").expand("ResponsableID")()) as IMuestra[];
   
    console.log("ver respuesta");
    console.log(respuesta);
 
    return respuesta;
}


   //Obtienes las opciones de un combo de cualquier lista
   public async getSelectedListaUrl(lista:string, url:string ): Promise<ISelected[]> {
    this.webRoot = Web([this.sp.web, this.serverUrlOrigin + url]);
    return new Promise<ISelected[]>((resolve, reject) => {
      resolve(
        this.webRoot.getList(url + "/Lists/" + lista)
      .items.orderBy("Title").top(5000)() as Promise<ISelected[]>
      );
    });
  }

  public async getDocumentsInLibrary(libraryUrl: string, url:string ): Promise<ISelected[]> {
    try {
      this.webRoot = Web([this.sp.web, this.serverUrlOrigin + url]);
      const library = this.webRoot.getList(libraryUrl);
      const items = await library.items.select("FileLeafRef").orderBy("FileLeafRef").top(5000)();
      return items;
    } catch (error) {
      // Maneja los errores aquí.
      throw error;
    }
  }
  
  
  //Obtienes las opciones de un campo de una lista
  public async getChoiceLista(lista:string, campo:string): Promise<ISelected[]> {
    return new Promise<ISelected[]>((resolve, reject) => {
      resolve(
        this.sp.web
          .getList(this.relativeUrl + "/Lists/" + lista).fields.getByInternalNameOrTitle(campo).select('Choices')() as Promise<ISelected[]>
      );
    });
  }

  public async getISelectedByIDListaUrl(lista:string, url:string, itemID: number ): Promise<ISelected> {
    this.webRoot = Web([this.sp.web, this.serverUrlOrigin + url]);
    return new Promise<ISelected>((resolve, reject) => {
      resolve(
        this.webRoot.getList(url + "/Lists/" + lista)
      .items.getById(itemID)() as Promise<ISelected>
      );
    });
  }
  


  //#endregion

    //#region USERS

    public getCurrentUsersGroups(id: number, filtro: string): Promise<ISiteGroups[]> {

      return new Promise<ISiteGroups[]>((resolve) => {
  
        let groups: ISiteGroups;
  
  
        if (!filtro) {
          return null;
        }
        let filtros: string[] = filtro.split(';');
  
  
        let filtrofinal: string = "";
  
        filtros.forEach((filter) => {
  
          filtrofinal += `Id eq ${filter} or `;
        });
  
        filtrofinal = filtrofinal.substring(0, filtrofinal.length - 3);
  
  
        resolve(this.sp.web.siteUsers.getById(id).groups.filter(filtrofinal)());
  
  
  
      });
    }

    public async getAttachments(item:IPersanSolicitudMuestras): Promise<IAttachmentInfo[]>
    {
      const respuesta: IItem = this.listBase.items.getById(item.Id);
  
      const adjuntos: IAttachmentInfo[]  =await respuesta.attachmentFiles();
    
  
      return adjuntos;
    }
  
    public async addAdjunto(id: number, newname: string, file: File){
      let result: Promise<IFileAddResult>;
  
      return new Promise<IFileAddResult>(async (resolve, reject) => {
        try {
              const item: IItem = this.listBase.items.getById(id); 
              await item.attachmentFiles.add(newname, file);
                resolve(result);
              }
              catch (err) {
                reject(err);
              }
          })
    }

    
   


    
}

