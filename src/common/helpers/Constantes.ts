/* eslint-disable @typescript-eslint/no-namespace */

import { IDropdownOption } from "@fluentui/react";

export namespace Constantes {

  export const iconos = {
    persan: "/_api/siteiconmanager/getsitelogo?type='1'"
  }


  export const EstadosFormulario={
    Finalizado:"Finalizado",
    Borrador:"Borrador",
    EnProgreso:"En progreso"
  }
  
  export const Estados: IDropdownOption[] = [
    { key: "En progreso", text: "En progreso", data:{isAdmin:false} },
    { key: "Borrador", text: "Borrador", data:{isAdmin:false} },
    { key: "Finalizado", text: "Finalizado", data:{isAdmin:true} }
  ];
  

  

  export const URLs =
  {
    Editar: "/Lists/SolicitudMuestras/Editform.aspx?Id=",
    urlSearch: "",
    NombreDeLaLista:"/SolicitudMuestra/",
    NombreDelCampo:"/NombreDelCampo/",
    Clientes: "/Clientes/",
    URLProject: "/sites/RD_DocMgmt/ProjectsHistory",
    Paises: "/Paises/",
    campoTitulo: "Title",
    Unidad: "Unidad",
    Laboratorio: "Laboratorio",
    Fase: "Fase",
    listaSolicitudMuestraLineas: "SolicitudMuestraLineas",
    CategoriaProducto: "/Categoria%20Producto/",
    FichasSeguridad: "/FichasSeguridad/",
    FlowCambioFase: "https://prod-213.westeurope.logic.azure.com:443/workflows/871eee7be17e4639a581a963936661ca/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=dKwxowXj8yx19gD4WEmvCueykYk8eIB-IsJF-Ggf1vM"
  };
}



