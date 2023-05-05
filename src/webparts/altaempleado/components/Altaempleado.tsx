import * as React from 'react';
//import styles from './AltaEmplados.module.scss';
import { IAltaEmpladosProps } from './IAltaempleadoProps';
import { IDepartamentos, Repositories, ICentros, IUbicaciones, IPuestos,ICategoria, IEmpresa } from './Repositories'
import { escape } from '@microsoft/sp-lodash-subset';
import { Utils } from '../../../../lib/Common/Utils';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { IAltaEmpladosWebPartProps } from '../AltaempleadoWebPart';



console.log(Utils.EsWorkbench());
if(Utils.EsWorkbench())
{
  console.log("Inyecta");
  Utils.InjectCSS(['https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css', 
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css',
  'https://activebt.sharepoint.com/sites/mynet/cdn/myNet/css/bootstrap-theme.min.css',
  'https://activebt.sharepoint.com/sites/mynet/cdn/myNet/css/bootstrap-datepicker.css', 
  'https://activebt.sharepoint.com/sites/mynet/cdn/myNet/css/theme.css', 
  'https://activebt.sharepoint.com/sites/mynet/cdn/myNet/css/foundation.css',
  'https://activebt.sharepoint.com/sites/mynet/cdn/myNet/css/myNet.css'
  ]);

    
}
else{
   Utils.InjectCSS(["https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/10.0.0/css/fabric.min.css"]);
}



export default class AltaEmplados extends React.Component<IAltaEmpladosProps,IAltaEmpladosWebPartProps> {
   public repo: Repositories;
   public listDepartamento: IDepartamentos[];
   public listItem: string = "";
   public items: [];
    
   public constructor( props: IAltaEmpladosProps) {
		super(props);
		

		this.state = {
			NameEmpleado: "",
      apellidoEmpleado: "",
      Dni: "",
      idlogin: 0,
      email: "",
      empresa: "",
      ubicacion: "",
      telefono: "",
      telefonoMovil: "",
      fechaAlta: "",
      Observaciones: "",
      departamento: "",
      OptionCentros: null,
      OptionDepartamento: null,
      OptionUbicacion: null,
      OptionPuesto: null,
      puesto: "",
      OptionCategoria: null,
      categoria: "",
      context: null,
      OptionEmpresas: null,
      description: "",
      urlPersonal: "",
      urlwebMyNet: "",
      listName: "",
      spHttpClient: null,
      webMyNet: "",
      centro: "",
      OptionModoContratacion: null,
      stringOptionDepartamento: "",
      Webadasa: "",
      Webadasasistemas: "",
      WebRRHH: "",
      modoContratacion: "",
      login: ""


		};
	}

   
  public onSave(item:any){
   
    let formIsValid = true;
   
    
    if (this.state.NameEmpleado == "" ) {
      formIsValid = false;
    }

    if (this.state.apellidoEmpleado == "" ) {
      formIsValid = false;
    }

    if (this.state.login == "" ) {
      formIsValid = false;
    }

    if (this.state.Dni == "" ) {
      formIsValid = false;
    }

    if (this.state.email == "" ) {
      formIsValid = false;
    }

    if (this.state.empresa == "" ) {
      formIsValid = false;
    }

    if (this.state.ubicacion == "" ) {
      formIsValid = false;
    }
    if(formIsValid){
      this.repo=new Repositories(this.context, this.state);
      this.repo.Save(item,this.state);
    }


    
  }

  public Cancelar(){
    Repositories.Cancelar();
  }
  
  public createSelectItemsDepartamento(OptionDepartamento: IDepartamentos[]) {
    let items = []; 
    items.push(<option key={0} value={0}>{"Seleccione..."}</option>); 
    if (typeof(OptionDepartamento) !== 'undefined') {
      for (let i = 0; i <= OptionDepartamento.length - 1; i++) {    
        items.push(<option key={OptionDepartamento[i].Id} value={OptionDepartamento[i].Id}>{OptionDepartamento[i].Title}</option>);   
      }
    }
   
    return items;
}  

public createSelectItemsCentros(OptionCentros: ICentros[]) {
  let items = []; 
  items.push(<option key={0} value={0}>{"Seleccione..."}</option>); 
  if (typeof(OptionCentros) !== 'undefined') {
    for (let i = 0; i <= OptionCentros.length - 1; i++) {    
      items.push(<option key={OptionCentros[i].Id} value={OptionCentros[i].Id}>{OptionCentros[i].OficinaNombreCiudad}</option>);   
    }
  }
  
  return items;
}  

public createSelectItemsUbicacion(OptionUbicacion: IUbicaciones[]) {
  let items = []; 
  items.push(<option key={0} value={0}>{"Seleccione..."}</option>); 
  if (typeof(OptionUbicacion) !== 'undefined') {
    for (let i = 0; i <= OptionUbicacion.length - 1; i++) {    
      items.push(<option key={OptionUbicacion[i].Id} value={OptionUbicacion[i].Id}>{OptionUbicacion[i].Title}</option>);   
    }
  }
  
  return items;
}  

public createSelectItemsModoContratacion(OptionModoContratacion: IUbicaciones[]) {
  let items = []; 
  items.push(<option key={0} value={0}>{"Seleccione..."}</option>); 
  if (typeof(OptionModoContratacion) !== 'undefined') {
    for (let i = 0; i <= OptionModoContratacion.length - 1; i++) {    
      items.push(<option key={OptionModoContratacion[i].Id} value={OptionModoContratacion[i].Id}>{OptionModoContratacion[i].Title}</option>);   
    }
  }
  
  return items;
}  

public createSelectItemsPuesto(OptionPuesto: IPuestos[]) {
  let items = []; 
  items.push(<option key={0} value={0}>{"Seleccione..."}</option>); 
  if (typeof(OptionPuesto) !== 'undefined') {
    for (let i = 0; i <= OptionPuesto.length - 1; i++) {    
      items.push(<option key={OptionPuesto[i].Id} value={OptionPuesto[i].Id}>{OptionPuesto[i].Title}</option>);   
    }
  }
  
  return items;
} 

public createSelectItemsCategoria(OptionCategoria: ICategoria[]) {
  let items = []; 
  items.push(<option key={0} value={0}>{"Seleccione..."}</option>); 
  if (typeof(OptionCategoria) !== 'undefined') {
    for (let i = 0; i <= OptionCategoria.length - 1; i++) {    
      items.push(<option key={OptionCategoria[i].Id} value={OptionCategoria[i].Id}>{OptionCategoria[i].Title}</option>);   
    }
  }
  
  return items;
}  



public createSelectItemsEmpresa(OptionEmpresa: IEmpresa[]) {
  let items = []; 
  items.push(<option key={0} value={0}>{"Seleccione..."}</option>); 
  if (typeof(OptionEmpresa) !== 'undefined') {
    for (let i = 0; i <= OptionEmpresa.length - 1; i++) {    
      items.push(<option key={OptionEmpresa[i].Id} value={OptionEmpresa[i].Id}>{OptionEmpresa[i].Title}</option>);   
    }
  }
  
  return items;
}  


  public render(): React.ReactElement<IAltaEmpladosProps> {
   
   
    const {
      NameEmpleado,
      apellidoEmpleado,
      telefono,
      telefonoMovil,
      email,
      Dni,
      fechaAlta,
      Observaciones,
      departamento,
      centro,
      OptionCentros,
      OptionDepartamento,
      ubicacion,
      OptionUbicacion,
      OptionPuesto,
      puesto,
      OptionCategoria,
      categoria,
      context,
      OptionEmpresas,
      empresa
    } = this.props;
   console.log("Miramos datos");
   //this.setState({ NameEmpleado: "" });

   console.log(context);

    return (
      <Form>
          <Form.Group className="mb-3 row">
          <div className="col-md-2 bot10">
            <Form.Label>Nombre *: </Form.Label>
          </div>
          <div className="col-md-4 bot10 obligatorioAltaEmpleado">
            <Form.Control id="NombreEmpleado"  type="text" placeholder=""  defaultValue={escape(NameEmpleado)} onChange={e => this.setState({ NameEmpleado: e.target.value })} />
            </div>
          <div className="col-md-2 bot10">
            <Form.Label>Apellido *: </Form.Label>
          </div>
          <div className="col-md-4 bot10 obligatorioAltaEmpleado">
            <Form.Control type="text" id="idApellidoEmpleado" placeholder=""  defaultValue={escape(apellidoEmpleado)}  onChange={e => this.setState({ apellidoEmpleado: e.target.value })} />
            </div>
          </Form.Group>
          <Form.Group className="mb-3 row" >
          <div className="col-md-2 bot10">
            <Form.Label>Teléfono: </Form.Label>
            </div>
            <div className="col-md-4 bot10">
            <Form.Control type="text" id="idDelegacionEmpleado" placeholder="" defaultValue={escape(telefono) } onChange={e => this.setState({ telefono: e.target.value })} />
            </div>
          <div className="col-md-2 bot10">
            <Form.Label>Teléfono móvil: </Form.Label>
            </div>
            <div className="col-md-4 bot10">
            <Form.Control type="text" id="idtelefonoMovil"  placeholder="" defaultValue={escape(telefonoMovil)} onChange={e => this.setState({ telefonoMovil: e.target.value })} />
            </div>
          </Form.Group>
          <Form.Group className="mb-3 row">
          <div className="col-md-2 bot10">
            <Form.Label>Email *: </Form.Label>
            </div>
            <div className="col-md-4 bot10 obligatorioAltaEmpleado">
            <Form.Control type="email"  id="idemail" placeholder=""  defaultValue ={escape(email)} onChange={e => this.setState({ email: e.target.value })} />
            </div>
          <div className="col-md-2 bot10">
            <Form.Label>DNI *: </Form.Label>
          </div>
          <div className="col-md-4 bot10 obligatorioAltaEmpleado">
            <Form.Control type="text" id="idDni" placeholder=""  defaultValue ={escape(Dni)} onChange={e => this.setState({ Dni: e.target.value })} />
            </div>
          </Form.Group>
          <Form.Group className="mb-3 row">
          <div className="col-md-2 bot10">
          <Form.Label>Login *: </Form.Label>
          </div>
          <div className="col-md-4 bot10 obligatorioAltaEmpleado">
                    <PeoplePicker context={context}
                    personSelectionLimit={1}
                    groupName={''} // Leave this blank in case you want to filter from all users
                    showtooltip={true}
                    required={true}
                    disabled={false}
                    ensureUser={true}
                    onChange={e => this.setState({ idlogin: Number(e[0].id) })}
                    showHiddenInUI={false}
                    principalTypes={[PrincipalType.User]}
                    resolveDelay={1000} />
              </div>  
          <div className="col-md-2 bot10">
            <Form.Label>Fecha Alta: </Form.Label>
            </div>
            <div className="col-md-4 bot10">
              <Form.Control type="date" name="idfechaAlta" placeholder="Fecha de Alta" value={fechaAlta} onChange={(e) => this.setState({fechaAlta: e.target.value} )}
              />
           
            </div>
            
          </Form.Group>
          <Form.Group className="mb-3 row">
          <div className="col-md-2 bot10">
            <Form.Label>Observaciones: </Form.Label>
            </div>
            <div className="col-md-8 bot10">
            <Form.Control  as="textarea" rows={3} id="idObservaciones" placeholder="" defaultValue ={escape(Observaciones)} onChange={e => this.setState({ Observaciones: e.target.value })} />
              </div>
        
          </Form.Group>
          <Form.Group className="mb-3 row">
                <div className="col-md-2 bot10">
                <Form.Label>Ubicación *: </Form.Label>
                </div>
                <div className="col-md-4 bot10 obligatorioAltaEmpleado">
                <Form.Select aria-label="Default select example" defaultValue ={escape(ubicacion)}  onChange={e => this.setState({ ubicacion: e.target.value })} >
                   {this.createSelectItemsUbicacion(OptionUbicacion)}
              </Form.Select>
              </div>


              <div className="col-md-2 bot10">
                <Form.Label>Empresa *: </Form.Label>
            </div>
                <div className="col-md-4 bot10 obligatorioAltaEmpleado">
                <Form.Select aria-label="Default select example" defaultValue ={escape(empresa)}  onChange={e => this.setState({ empresa: e.target.value })} >
                   {this.createSelectItemsEmpresa(OptionEmpresas)}
              </Form.Select>
              </div>


             
          </Form.Group>
          <Form.Group className="mb-3 row">
                <div className="col-md-2 bot10">
                <Form.Label>Centros: </Form.Label>
                </div>
                <div className="col-md-4 bot10">
                <Form.Select aria-label="Default select example" defaultValue ={escape(centro)} onChange={e => this.setState({ centro: e.target.value })} >
                   {this.createSelectItemsCentros(OptionCentros)}
              </Form.Select>
              </div>
              <div className="col-md-2 bot10">
                <Form.Label>Departamento: </Form.Label>
                </div>
              <div className="col-md-4 bot10">
                <Form.Select aria-label="Default select example" defaultValue ={escape(departamento)} onChange={e => this.setState({ departamento: e.target.value })} >
                   {this.createSelectItemsDepartamento(OptionDepartamento)}
              </Form.Select>
                </div>
          </Form.Group>
         
          <Form.Group className="mb-3 row">
          <div className="col-md-2 bot10">
                <Form.Label>Puesto: </Form.Label>
            </div>
                <div className="col-md-4 bot10">
                <Form.Select aria-label="Default select example" defaultValue ={escape(puesto)} onChange={e => this.setState({ puesto: e.target.value })} >
                   {this.createSelectItemsPuesto(OptionPuesto)}
              </Form.Select>
              </div>
              <div className="col-md-2 bot10">
                <Form.Label>Categoría: </Form.Label>
            </div>
                <div className="col-md-4 bot10">
                <Form.Select aria-label="Default select example" defaultValue ={escape(categoria)} onChange={e => this.setState({ categoria: e.target.value })} >
                   {this.createSelectItemsCategoria(OptionCategoria)}
              </Form.Select>
              </div>
            
          </Form.Group>
         
          
          
        {/*   <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
          <Button onClick={() => this.Cancelar()} className="btnBlanco">Cancelar</Button>
                    <Button onClick={() => this.onSave(this)} className="btnMyNet">Guardar</Button>
        </Form>

    );
  }

  


}



