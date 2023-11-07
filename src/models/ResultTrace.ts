export default class ResultTrace{

    private _exito:boolean;

    get Exito():boolean {
        return this._exito;
    }

    set Exito(val) {
       this._exito = val;
    }

     private   _mensaje:string;

    get Mensaje():string {
        return this._mensaje;
    }

    set Mensaje(val) {
       this._mensaje = val;
    }

    
     private   _codigo:number;

    get Codigo():number {
        return this._codigo;
    }

    set Codigo(val) {
       this._codigo = val;
    }

       private   _asunto:string;

    get Asunto():string {
        return this._asunto;
    }

    set Asunto(val) {
       this._asunto = val;
    }

}