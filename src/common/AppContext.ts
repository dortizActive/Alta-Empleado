import { FormDisplayMode } from '@microsoft/sp-core-library';
import { FormCustomizerContext } from '@microsoft/sp-listview-extensibility';
import { createContext } from 'react';
import { IUser } from '../models/Interfaces';
import spservices from './services/spservices';


export interface IAppContext {
    context:FormCustomizerContext;
    spservices:spservices;
    displayMode:FormDisplayMode;
    currentUser:IUser;
    isAdmin:boolean;
    isEditablePeticionarios:boolean;
    isEditableResponsable:boolean;
    isEditableID:boolean;
    isEditableCalidad:boolean;
    userId:number;
    estado?:string;
    esEditable?:boolean;
    setEstado?: (estado:string) => void;
    setIsAdmin?: (isAdmin:boolean) => void;
    setEsEditable?: (esEditable:boolean) => void;
    setIsEditablePeticionarios?: (isPeticionarios:boolean) => void;
    setIsEditableResponsable?: (isEditableResponsable:boolean) => void;
    setIsEditableCalidad?: (isEditableCalidad:boolean) => void;
    setIsEditableID?: (isEditableID:boolean) => void;
}

 const AppContext = createContext<IAppContext>(undefined);
 export default AppContext;