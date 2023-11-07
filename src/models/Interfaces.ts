export interface IToken {
    expires_on?: number;
    access_token?: string;
}
export interface IUser {
    displayName:string;
    email: string;
    isAnonymousGuestUser?: boolean;
    isExternalGuestUser?: boolean;
    loginName?: string;
    preferUserTimeZone?: boolean;
  
  }

export interface IEntity {
    Id?:number;
    ID?: number;
       Title?:string;
    
}

export interface IChoice {
    id?: number;
       title?:string;
    
}
export interface IEntityFile {
    ListItemAllFields: { ID?: number; }
}

export interface IFieldValue {
    Field: string;
    // eslint-disable-next-line
    Value: any
}

