
import { IMuestra, IMuestraGuardar, IPersanSolicitudMuestras } from "../../models/ShpInterfaces";
import { IEntity } from "../../models/Interfaces";
import { IDropdownOption } from "office-ui-fabric-react";


export default class mappers {
      
    


      public static mapMuestras (item: any): IPersanSolicitudMuestras {
        return {
            Id:(item.Id) ? item.Id : 0 ,
            Title:item.Title ? item.Title : null,
            Estado:item.Estado ? item.Estado : null,
            NombreCliente:item.NombreCliente ? item.NombreCliente : null,
            PaisCliente:item.PaisCliente ? item.PaisCliente : null,
            EspecificacionesCliente:item.EspecificacionesCliente ? item.EspecificacionesCliente : null,
            Empresa:item.Empresa ? item.Empresa : null,
            Destinatario:item.Destinatario ? item.Destinatario : null,
            EnvioInterno:item.EnvioInterno ? item.EnvioInterno : null,
            Telefono:item.Telefono ? item.Telefono : null,
            DireccionEnvio:item.DireccionEnvio ? item.DireccionEnvio : null,
            Email:item.Email ? item.Email : null,
            FechaResolucionOperaciones:item.FechaResolucionOperaciones ? item.FechaResolucionOperaciones : null,
            FechaEntregaAlmacen:item.FechaEntregaAlmacen ? item.FechaEntregaAlmacen : null,
            FechaEntregaID:item.FechaEntregaID ? item.FechaEntregaID : null,
            FechaSolicitada:item.FechaSolicitada ? item.FechaSolicitada : null,
            EnvioUrgente:item.EnvioUrgente ? item.EnvioUrgente : null,
            MensajeriaUrgente:item.MensajeriaUrgente ? item.MensajeriaUrgente : null,
            Peso:item.Peso ? item.Peso : null,
            NBultos:item.NBultos ? item.NBultos : null,
            FechaEnvioCliente:item.FechaEnvioCliente ? item.FechaEnvioCliente : null,
            NumeroSeguimiento:item.NumeroSeguimiento ? item.NumeroSeguimiento : null,
            Validado:item.Validado ? item.Validado : null,
            SolicitanteId:item.SolicitanteId ? item.SolicitanteId : null,
            EntregadoAlmacen:item.EntregadoAlmacen ? item.EntregadoAlmacen : null,
            EntregadoOperaciones:item.EntregadoOperaciones ? item.EntregadoOperaciones : null,
            EntregadoID:item.EntregadoID ? item.EntregadoID : null,
            FechaCompromiso:item.FechaCompromiso ? item.FechaCompromiso : null,
            Laboratorio:item.Laboratorio ? item.Laboratorio : null,

        } as IPersanSolicitudMuestras;
    }

    public static mapListadoMuestras (elements: IMuestra[], SolicitudMuestras:IPersanSolicitudMuestras): IMuestraGuardar[] {
        return elements.map((item:IMuestraGuardar)=>{
            return {
            Id:(item.Id) ? item.Id : 0 ,
            IdSolicitudId:(SolicitudMuestras.Id) ? SolicitudMuestras.Id : 0 ,
            DocumentacionCalidad:item.DocumentacionCalidad ? item.DocumentacionCalidad : false,
            CategoriaProductoId:item.CategoriaProductoId ? item.CategoriaProductoId : null,
            Descripcion:item.Descripcion ? item.Descripcion : null,
            BenchMark:item.BenchMark ? item.BenchMark : null,
            PaisClienteId:item.PaisClienteId ? item.PaisClienteId : null,
            Perfume:item.Perfume ? item.Perfume : null,
            CodigoSAPPerfume:item.CodigoSAPPerfume ? item.CodigoSAPPerfume : null,
            DosificacionPerfume:item.DosificacionPerfume ? item.DosificacionPerfume : null,
            ProveedorPerfume:item.ProveedorPerfume ? item.ProveedorPerfume : null,
            PerfumeEncapsulado1:item.PerfumeEncapsulado1 ? item.PerfumeEncapsulado1 : null,
            CodigoSAPPerfumeEncapsulado1:item.CodigoSAPPerfumeEncapsulado1 ? item.CodigoSAPPerfumeEncapsulado1 : null,
            DosificacionPerfumeEncapsulado1:item.DosificacionPerfumeEncapsulado1 ? item.DosificacionPerfumeEncapsulado1 : null,
            ProveedorPerfumeEncapsulado1:item.ProveedorPerfumeEncapsulado1 ? item.ProveedorPerfumeEncapsulado1 : null,
            PerfumeEncapsulado2:item.PerfumeEncapsulado2 ? item.PerfumeEncapsulado2 : null,
            CodigoSAPPerfumeEncapsulado2:item.CodigoSAPPerfumeEncapsulado2 ? item.CodigoSAPPerfumeEncapsulado2 : null,
            DosificacionPerfumeEncapsulado2:item.DosificacionPerfumeEncapsulado2 ? item.DosificacionPerfumeEncapsulado2 : null,
            ProveedorPerfumeEncapsulado2:item.ProveedorPerfumeEncapsulado2 ? item.ProveedorPerfumeEncapsulado2 : null,
            ReferenciaColor:item.ReferenciaColor ? item.ReferenciaColor : null,
            Dosificacion:item.Dosificacion ? item.Dosificacion : null,
            VolLlenado:item.VolLlenado ? item.VolLlenado : null,
            Unidad:item.Unidad ? item.Unidad : null,
            NumLavados:item.NumLavados ? item.NumLavados : null,
            TotalMuestras:item.TotalMuestras ? item.TotalMuestras : null,
            //FinalidadMuestrasId:item.FinalidadMuestrasId ? item.FinalidadMuestrasId : null,
            ComentarioFinalidad:item.ComentarioFinalidad ? item.ComentarioFinalidad : null,
            Envase:item.Envase ? item.Envase : null,
            DescripcionEnvase:item.DescripcionEnvase ? item.DescripcionEnvase : null,
            RevisionMuestras:item.RevisionMuestras ? item.RevisionMuestras : false,
            Comentarios:item.Comentarios ? item.Comentarios : null,
            FormulaEnviable:item.FormulaEnviable ? item.FormulaEnviable : null,
            FormulaEspecificaciones:item.FormulaEspecificaciones ? item.FormulaEspecificaciones : null,
            EnvioProductoTerminado:item.EnvioProductoTerminado ? item.EnvioProductoTerminado : false,
            ProductoTerminadoEnviable:item.ProductoTerminadoEnviable ? item.ProductoTerminadoEnviable : null,
            ComentariosID:item.ComentariosID ? item.ComentariosID : null,
            FichaSeguridadId:item.FichaSeguridadId ? item.FichaSeguridadId : null,
            MMPPNoHomologadas:item.MMPPNoHomologadas ? item.MMPPNoHomologadas : null,
            Validado:item.Validado ? item.Validado : null,
            DocumentacionAnexada:item.DocumentacionAnexada ? item.DocumentacionAnexada : null,
            Tapon:item.Tapon ? item.Tapon : null,
            TaponVertedor:item.TaponVertedor ? item.TaponVertedor : null,
            Etiqueta:item.Etiqueta ? item.Etiqueta : null,
            DescripcionTapon:item.DescripcionTapon ? item.DescripcionTapon : null,
            DescripcionTaponVertedor:item.DescripcionTaponVertedor ? item.DescripcionTaponVertedor : null,
            DescripcionEtiqueta:item.DescripcionEtiqueta ? item.DescripcionEtiqueta : null,
            CodigoLote:item.CodigoLote ? item.CodigoLote : null,
            TotalEnvase: item.TotalEnvase ?  item.TotalEnvase: null,
            ResponsableIDId: item.ResponsableIDId ? item.ResponsableIDId : null
        }
    });}

    
    public static map2DropDownOption(items: IEntity[]):IDropdownOption[] {
          
        return items.map((element:IEntity)=>{
            return {
                key: element.ID,
                text: element.Title 
            }
            });
      }

      public static map2DropDownOptionText(items: IEntity[]):IDropdownOption[] {
          
        return items.map((element:IEntity)=>{
            return {
                key: element.Title,
                text: element.Title 
            }
            });
      }

      public static map2DropChoice(items: string[]):IDropdownOption[] {
          
        return items.map((element:string)=>{
            return {
                key: element,
                text: element 
            }
            });
      }

      public static map2Steps(items: string[]):IDropdownOption[] {
          
        return items.map((element:string)=>{
            return {
                key: element,
                text: element 
            }
            });
      }



}