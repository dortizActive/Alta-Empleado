

import { IWebPartContext } from '@microsoft/sp-webpart-base';

import { sp, List, Web } from "@pnp/sp/"; 
import { IAltaEmpladosWebPartProps } from '../AltaempleadoWebPart';


export interface IDepartamentos{
  Id?: number;
  Title?: string
  
}

export interface IEmpresa{
  Id?: number;
  Title?: string
  
}

export interface ICategoria{
  Id?: number;
  Title?: string
  
}

export interface IPuestos{
  Id?: number;
  Title?: string
  
}
export interface IModoContratacion{
  Id?: number;
  Title?: string
  
}

export interface IUbicaciones{
  Id?: number;
  Title?: string
  
}
listHeaderAnswers:List;
export interface ICentros{
  Id?: number;
  OficinaNombreCiudad?: string
}
export  class Repositories  {
    public static Cancelar() {
      console.log("Cancelado");
    }
    public webEmpleados:Web;
    public webMyNet:Web;
    public webRRHH:Web;
    public Webadasasistemas:Web;
    public Webadasa:Web;
    public contexto:IWebPartContext;
    

    public constructor(context:IWebPartContext, prop:IAltaEmpladosWebPartProps)
    {

        console.log("Entro en esto");
        this.contexto=context;
        console.log(prop);
        var url = "https://activebt.sharepoint.com/sites/AdasaMyNet/RRHH/Personal";
        if(prop.urlPersonal != undefined){
          console.log("existe urlPersonal");
          url = prop.urlPersonal;
        }
       console.log("paso1");
      
        this.webEmpleados = new Web(url)

        var urlwebMyNet = "https://activebt.sharepoint.com/sites/myNet";
        if(prop.webMyNet != undefined){
          console.log("existe webMyNet");
          urlwebMyNet = prop.webMyNet;
        }

        this.webMyNet = new Web(urlwebMyNet);

        var urlWebadasasistemas = "https://activebt.sharepoint.com/sites/AdasaMyNet/Sistema";
        if(prop.Webadasasistemas != undefined){
          console.log("existe webMyNet");
          urlWebadasasistemas = prop.Webadasasistemas;
        }

        this.Webadasasistemas = new Web(urlWebadasasistemas);

        var urlWebRRHH = "https://activebt.sharepoint.com/sites/myNet/RRHH";
        if(prop.WebRRHH != undefined){
          console.log("existe WebRRHH");
          urlWebRRHH = prop.WebRRHH;
        }

        this.webRRHH = new Web(urlWebRRHH);
    
        var urlWebadasa = "https://activebt.sharepoint.com/sites/AdasaMyNet";
        if(prop.Webadasasistemas != undefined){
          console.log("existe webMyNet");
          urlWebadasa = prop.Webadasa;
        }

        this.Webadasa = new Web(urlWebadasa);
    }

    
    public  Save(item : any, state: any){
    console.log("spList");

     console.log( sp.web.lists);
     this.webEmpleados.lists.getByTitle("Empleados").items.add({
        Title: state.NameEmpleado,
        FirstName: state.NameEmpleado,
          FullName: state.NameEmpleado + " " + state.apellidoEmpleado ,
          EmpresaId: state.centro,
          LoginId: state.idlogin,
          WorkPhone: state.telefono,
          CellPhone: state.telefonoMovil,
          EMail: state.email,
          WebPage: state.Dni,
          WorkCity: state.fechaAlta,
          mynetDepartamentoId: state.departamento,
          UbicacionId: state.ubicacion,
          Comments: state.Observaciones,
          Puesto_x0020_de_x0020_trabajoId: state.puesto,
          WorkZip: state.categoria
      }).then(i => {
            console.log(i);
      }).catch((error )=>{
        console.log(error);
      }
    );


   
    }


    
    public  getDepartamentos():Promise<IDepartamentos[]> {

      let departamentos: IDepartamentos[];
      departamentos = [];
      return new Promise<IDepartamentos[]>((resolve)=>
      {
        this.Webadasasistemas.lists.getByTitle("Departamentos").items
          .select("Title,Id").getAll().then((objetos:any) => {
           
            console.log("Departamentos");
            console.log(objetos);
            objetos.forEach((element: { Id: any; Title: any; }) => {
              departamentos.push(
                {
                    Id: element.Id,
                    Title: element.Title,
                });
    
            }) ;
            
                 resolve(objetos);
          }).catch((error: any)=>{
                console.log(error);
            }
          );
      });
  }         

  public  getUbicación():Promise<IUbicaciones[]> {

    let ubicaciones: IUbicaciones[];
    ubicaciones = [];
    return new Promise<IUbicaciones[]>((resolve)=>
    {
      this.webRRHH.lists.getByTitle("Ubicaciones").items
        .select("Title,Id").getAll().then((objetos:any) => {
         
          console.log("Ubicaciones");
          console.log(objetos);
          objetos.forEach((element: { Id: any; Title: any; }) => {
            ubicaciones.push(
              {
                  Id: element.Id,
                  Title: element.Title,
              });
  
          }) ;
          
               resolve(objetos);
        }).catch((error: any)=>{
              console.log(error);
          }
        );
    });
}   

public  getModoContratacion():Promise<IModoContratacion[]> {

  let modoContratacion: IModoContratacion[];
  modoContratacion = [];
  return new Promise<IModoContratacion[]>((resolve)=>
  {
    this.webRRHH.lists.getByTitle("Ubicaciones").items
      .select("Title,Id").getAll().then((objetos:any) => {
       
        console.log("Ubicaciones");
        console.log(objetos);
        objetos.forEach((element: { Id: any; Title: any; }) => {
          modoContratacion.push(
            {
                Id: element.Id,
                Title: element.Title,
            });

        }) ;
        
             resolve(objetos);
      }).catch((error: any)=>{
            console.log(error);
        }
      );
  });
}  

  public  getCentros():Promise<ICentros[]> {
      
    let centros: ICentros[];
    centros = [];
      return new Promise<ICentros[]>((resolve)=>
      {
        
          this.webMyNet.lists.getByTitle("Oficinas").items
          .select("OficinaNombreCiudad,Id").getAll().then((objetos:any) => {
            console.log("Oficinas");
            console.log(objetos);
            objetos.forEach((element: { Id: any; OficinaNombreCiudad: any; }) => {
              centros.push(
                {
                    Id: element.Id,
                    OficinaNombreCiudad: element.OficinaNombreCiudad,
                });
    
            }) ;
            
                 resolve(centros); 
            
                 
          }).catch((error: any)=>{
                console.log(error);
            }
          );
       } ); 
  }
  
  public  getPuesto():Promise<IPuestos[]> {
      
    let puestos: IPuestos[];
    puestos = [];
      return new Promise<IPuestos[]>((resolve)=>
      {
        
          this.webEmpleados.lists.getByTitle("Puesto de trabajo").items
          .select("Title,Id").getAll().then((objetos:any) => {
            console.log("Puestos");
            console.log(objetos);
            objetos.forEach((element: { Id: any; Title: any; }) => {
              puestos.push(
                {
                    Id: element.Id,
                    Title: element.Title,
                });
    
            }) ;
            
                 resolve(puestos); 
            
                 
          }).catch((error: any)=>{
                console.log(error);
            }
          );
       } );
  
     
  }   

  public  getCategoria():Promise<ICategoria[]> {
      
    let categorias: ICategoria[];
    categorias = [];
      return new Promise<ICategoria[]>((resolve)=>
      {
        
          this.Webadasa.lists.getByTitle("categorias").items
          .select("Title,Id").getAll().then((objetos:any) => {
            console.log("Categorías");
            console.log(objetos);
            objetos.forEach((element: { Id: any; Title: any; }) => {
              categorias.push(
                {
                    Id: element.Id,
                    Title: element.Title,
                });
    
            }) ;
            
                 resolve(categorias); 
            
                 
          }).catch((error: any)=>{
                console.log(error);
            }
          );
       } );
  
     
  } 

  public  getEmpresa():Promise<IEmpresa[]> {
      
    let empresas: IEmpresa[];
    empresas = [];
      return new Promise<IEmpresa[]>((resolve)=>
      {
        
          this.webRRHH.lists.getByTitle("empresas").items
          .select("Title,Id").getAll().then((objetos:any) => {
            console.log("empresas");
            console.log(objetos);
            objetos.forEach((element: { Id: any; Title: any; }) => {
              empresas.push(
                {
                    Id: element.Id,
                    Title: element.Title,
                });
    
            }) ;
            
                 resolve(empresas); 
            
                 
          }).catch((error: any)=>{
                console.log(error);
            }
          );
       } );
  
     
  } 

}
  