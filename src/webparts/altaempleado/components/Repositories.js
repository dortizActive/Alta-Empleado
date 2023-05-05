var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { SPHttpClient } from '@microsoft/sp-http';
var Repositories = /** @class */ (function (_super) {
    __extends(Repositories, _super);
    function Repositories() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            NameEmpleado: "",
            apellidoEmpleado: "",
            EmpresaEmpleado: "",
            email: "",
            Dni: ""
        };
        return _this;
    }
    Repositories.prototype.Cancelar = function () {
        console.log("Cancelado");
    };
    Repositories.prototype.onSave = function (item) {
        console.log(this.state);
        console.log(item);
        console.log("Update!!!");
        console.log(item.props.urlPersonal);
        //console.log(item.props);
        var body = '';
        //limpiamos columna AsignadoA en los siguients estados  
        body = JSON.stringify({
            '__metadata': {
                'type': 'SP.Data.EmpleadosListItem'
            },
            'Title': this.state.NameEmpleado,
            'Nombre': this.state.NameEmpleado,
            'FullName': this.state.NameEmpleado + " " + this.state.apellidoEmpleado,
            'Company': this.state.EmpresaEmpleado,
            'email': this.state.email,
            'Dni': this.state.Dni,
        });
        var urlpost = "".concat(item.props.urlPersonal, "/_api/web/lists/getbytitle('").concat(item.props.listName, "')/items(").concat(item.props.id, ")");
        if (!item.props.Id) {
            console.log("Entro");
            urlpost = "".concat(item.props.urlPersonal, "/_api/web/lists/getbytitle('").concat(item.props.listName, "')/items");
        }
        else {
            urlpost = "".concat(item.props.urlPersonal, "/_api/web/lists/getbytitle('").concat(item.props.listName, "')/items(").concat(item.props.id, ")");
        }
        console.log(body);
        console.log(urlpost);
        return new Promise(function (resolve) {
            item.props.spHttpClient.post(urlpost, SPHttpClient.configurations.v1, {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'Content-type': 'application/json;odata=verbose',
                    'odata-version': ''
                },
                body: body
            }).then(function (response) {
                console.log(response);
                resolve(response);
                //this.loadItems();
            });
        });
    };
    return Repositories;
}(React.Component));
export default Repositories;
//# sourceMappingURL=Repositories.js.map