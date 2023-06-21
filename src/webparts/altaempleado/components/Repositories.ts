

import { IWebPartContext } from '@microsoft/sp-webpart-base';

import { sp, Web } from "@pnp/sp/"; 
import { IDropdownOption } from 'office-ui-fabric-react';


export interface ISelected{
  Id?: number;
  Title?: string
}

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


export  class Repositories  {
    public static Cancelar() {
      console.log("Cancelado");
    }
    public webEmpleados:Web;

    public Webadasa:Web;

    

    public constructor(context:IWebPartContext)
    {

      
    }

    
    public  Save(item : IAltaEmpleados){
    console.log("spList");

     console.log( sp.web.lists);
     this.webEmpleados.lists.getByTitle("Empleados").items.add({
        Title: item.Title,
        FirstName: item.FirstName,
          FullName: item.FullName,
          EmpresaId: item.EmpresaId,
          LoginId: item.LoginId,
          WorkPhone: item.WorkPhone,
          CellPhone: item.CellPhone,
          EMail: item.EMail,
          WebPage: item.WebPage,
          WorkCity: item.WorkCity,
          mynetDepartamentoId: item.mynetDepartamentoId,
          UbicacionId: item.UbicacionId,
          Comments: item.Comments,
          Puesto_x0020_de_x0020_trabajoId: item.Puesto_x0020_de_x0020_trabajoId,
          WorkZip: item.WorkZip
      }).then(i => {
            console.log(i);
      }).catch((error )=>{
        console.log(error);
      }
    );


   
    }



    public  map2DropDownOption(items: ISelected[]):IDropdownOption[] {
       
      return items.map((element:ISelected)=>{
          return {
              key: element.Id,
              text: element.Title
          }
          });
    }
    
    public  getSelected(lista : string, url: string):Promise<ISelected[]> {
     
    
      this.Webadasa = new Web(url)
      let options: ISelected[];
      options = [];
      return new Promise<ISelected[]>((resolve)=>
      {
        this.Webadasa.lists.getByTitle(lista).items
          .select("Title,Id").getAll().then((objetos:any) => {
           
           
            objetos.forEach((element: { Id: any; Title: any; }) => {
              options.push(
                {
                    Id: element.Id,
                    Title: element.Title,
                });
    
            }) ;
                console.log("Ver options");
                console.log(options);
                 resolve(options);
          }).catch((error: any)=>{
                console.log(error);
            }
          );
      });
  }  
  


}
  