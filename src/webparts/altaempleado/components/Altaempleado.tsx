import * as React from 'react';
import { useState } from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import { Utils } from '../../../Utils/Utils';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import CustomTextFieldError from '../controls/CustomTextFieldError';
import CustomDropDown from '../controls/CustomDropDown';
import { IAltaempleadoProps } from './IAltaempleadoProps';
import { IAltaEmpleados, Repositories } from './Repositories';
import { IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react';
import CustomTextField from '../controls/CustomTextField';

console.log(Utils.EsWorkbench());
if (Utils.EsWorkbench()) {
  console.log("Inyecta");
  Utils.InjectCSS([
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css',
    'https://activebt.sharepoint.com/sites/mynet/cdn/myNet/css/bootstrap-theme.min.css',
    'https://activebt.sharepoint.com/sites/mynet/cdn/myNet/css/bootstrap-datepicker.css',
    'https://activebt.sharepoint.com/sites/mynet/cdn/myNet/css/theme.css',
    'https://activebt.sharepoint.com/sites/mynet/cdn/myNet/css/foundation.css',
    'https://activebt.sharepoint.com/sites/mynet/cdn/myNet/css/myNet.css'
  ]);
} else {
  Utils.InjectCSS([
    'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/10.0.0/css/fabric.min.css'
  ]);
}

const AltaEmplados: React.FC<IAltaempleadoProps> = (props) => {
  const [listItem, setListitem] = useState<IAltaEmpleados>(null);
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const [pulsadoGuardar, setPulsadoGuardar] = useState<boolean>(false);

  const [OptionCentros, setOptionCentros] = useState<IDropdownOption[]>(null);
  const [OptionPuesto, setOptionPuesto] = useState<IDropdownOption[]>(null);
  const [OptionUbicacion, setOptionUbicacion] = useState<IDropdownOption[]>(null);
  const [OptionCategoria, setOptionCategoria] = useState<IDropdownOption[]>(null);
  const [OptionDepartamento, setOptionDepartamento] = useState<IDropdownOption[]>(null);
  const [OptionEmpresas, setOptionEmpresas] = useState<IDropdownOption[]>(null);
  const repo = new Repositories(props.context);

  
   
  const onSave = (item: any) => {
    setPulsadoGuardar(true);

    if (!formIsValid) {
      // Detener la ejecución si hay campos no válidos
      return;
    }

    repo.Save(listItem);
    
  };

  const Cancelar = () => {
    Repositories.Cancelar();
  };

  /* const createSelectItems = (Option: ISelected[]) => {
    console.log(Option)
    if (Option == null)
      return;
    let items = [];
    items.push(<option key={0} value={0}>{"Seleccione..."}</option>);
    if (typeof Option !== 'undefined') {
      for (let i = 0; i <= Option.length - 1; i++) {
        items.push(<option key={Option[i].Id} value={Option[i].Id}>{Option[i].Title}</option>);
      }
    }

    return items;
  }; */

  const handleValidationChange = (isValid: boolean) => {
    setFormIsValid((prevIsValid: any) => prevIsValid && isValid);
  };

  React.useEffect(() => {
    cargarSelected();
  }, []);

  const cargarSelected = () => {
    var url = "https://activebt.sharepoint.com/sites/AdasaMyNet/RRHH/Personal";
   /*  if(props.urlPersonal != undefined){
      console.log("existe urlPersonal");
      url =props.urlPersonal;
    } */


    var urlwebMyNet = "https://activebt.sharepoint.com/sites/myNet";
    if(props.webMyNet != undefined){
      console.log("existe webMyNet");
      urlwebMyNet = props.webMyNet;
    }



    var urlWebadasasistemas = "https://activebt.sharepoint.com/sites/AdasaMyNet/Sistema";
    if(props.Webadasasistemas != undefined){
      console.log("existe webMyNet");
      urlWebadasasistemas = props.Webadasasistemas;
    }



    var urlWebRRHH = "https://activebt.sharepoint.com/sites/myNet/RRHH";
    if(props.WebRRHH != undefined){
      console.log("existe WebRRHH");
      urlWebRRHH = props.WebRRHH;
    }



    var urlWebadasa = "https://activebt.sharepoint.com/sites/AdasaMyNet";
    if(props.Webadasasistemas != undefined){
      console.log("existe webMyNet");
      urlWebadasa = props.Webadasa;
    }

    Promise.all([
     



      repo.getSelected("Departamentos", urlWebadasasistemas),
      repo.getSelected("Oficinas", urlwebMyNet),
      repo.getSelected("Ubicaciones", urlWebRRHH),
      repo.getSelected("Puesto de trabajo", url),
      repo.getSelected("categorias", urlWebadasa),
      repo.getSelected("empresas",urlWebRRHH),
  
    ])
      .then(results => {
        console.log("Entro Promise result");
        console.log(results);
      
        setOptionCentros(repo.map2DropDownOption(results?.length > 0 ? results[0] : null));
        setOptionUbicacion(repo.map2DropDownOption(results?.length > 1 ? results[1] : null));
        setOptionPuesto(repo.map2DropDownOption(results?.length > 2 ? results[2] : null));
        setOptionCategoria(repo.map2DropDownOption(results?.length > 3 ? results[3] : null));
        setOptionDepartamento(repo.map2DropDownOption(results?.length > 4 ? results[4] : null));
        setOptionEmpresas(repo.map2DropDownOption(results?.length > 5 ? results[5] : null));
        console.log("Todo correcto");
      
        console.log("Render OK");
      })
      .catch(error => {
        console.log("Entro Promise result error");
        console.error(error);
      });
  };

  return (
    <Form>
    <Form.Group className="mb-3 row">
    <div className="col-md-2 bot10">
      <Form.Label>Nombre *: </Form.Label>
    </div>
    <div className="col-md-4 bot10 obligatorioAltaEmpleado" >
    <CustomTextFieldError type='text' value={listItem?.FullName} id="Nombre" mame="Nombre" guardado={pulsadoGuardar} 
     onValidationChange={handleValidationChange}  onChange={(e: { target: { value: any; }; }) => setListitem(prevState => ({ ...prevState, FullName: e.target.value }))} />

      </div>
    <div className="col-md-2 bot10">
      <Form.Label>Apellido *: </Form.Label>
    </div>
    <div className="col-md-4 bot10 obligatorioAltaEmpleado">
    <CustomTextFieldError type='text' value={listItem?.FirstName} id="Apellido" mame="Apellido" guardado={pulsadoGuardar} 
     onValidationChange={handleValidationChange}  onChange={(e: { target: { value: any; }; }) => setListitem(prevState => ({ ...prevState, FirstName: e.target.value }))} />
    
      </div>
    </Form.Group>
    <Form.Group className="mb-3 row" >
    <CustomTextField
              required={true}   
              tooltip={"Teléfono"} 
              className="active-proyectos-textboxes"
              label={"Teléfono"}
              maxLength={128}
              value={listItem?listItem.WorkPhone:""}
              onChange={(ev: { currentTarget: { value: any; }; }) => {
                const newText = ev.currentTarget.value;
                setListitem({ ...listItem, WorkPhone: newText });
              }}/>
    <div className="col-md-2 bot10">
      <Form.Label>Teléfono móvil: </Form.Label>
      </div>
      <div className="col-md-4 bot10">
      <Form.Control type="text" id="idtelefonoMovil"  placeholder="" value={listItem?.CellPhone} onChange={e => setListitem(prevState => ({ ...prevState, CellPhone: e.target.value }))}  />
      </div>
    </Form.Group>
    <Form.Group className="mb-3 row">
    <div className="col-md-2 bot10">
      <Form.Label>Email *: </Form.Label>
      </div>
      <div className="col-md-4 bot10 obligatorioAltaEmpleado">
      <CustomTextFieldError type='text' value={listItem?.EMail} id="Email" mame="Email" guardado={pulsadoGuardar} 
     onValidationChange={handleValidationChange}  onChange={(e: { target: { value: any; }; }) => setListitem(prevState => ({ ...prevState, EMail: e.target.value }))} />
     
      </div>
    <div className="col-md-2 bot10">
      <Form.Label>DNI *: </Form.Label>
    </div>
    <div className="col-md-4 bot10 obligatorioAltaEmpleado">
    <CustomTextFieldError type='text' value={listItem?.WorkZip} id="DNI" mame="DNI" guardado={pulsadoGuardar} 
     onValidationChange={handleValidationChange}  onChange={(e: { target: { value: any; }; }) => setListitem(prevState => ({ ...prevState, WorkZip: e.target.value }))} />
     
      </div>
    </Form.Group>
    <Form.Group className="mb-3 row">
    <div className="col-md-2 bot10">
    <Form.Label>Login *: </Form.Label>
    </div>
   {/*  <div className="col-md-4 bot10 obligatorioAltaEmpleado">
              <PeoplePicker context={context}
              personSelectionLimit={1}
              groupName={''} // Leave this blank in case you want to filter from all users
              showtooltip={true}
              required={true}
              disabled={false}
              ensureUser={true}
              onChange={e => setListitem(prevState => ({ ...prevState, LoginId: e[0].id}))} 
              showHiddenInUI={false}
              principalTypes={[PrincipalType.User]}
              resolveDelay={1000} />
            
        </div>   */}
    <div className="col-md-2 bot10">
      <Form.Label>Fecha Alta: </Form.Label>
      </div>
      <div className="col-md-4 bot10">
        <Form.Control type="date" name="idfechaAlta" placeholder="Fecha de Alta" value={listItem?.EmpresaId} onChange={e => setListitem(prevState => ({ ...prevState, EmpresaId: e.target.value }))} 
        />
     
      </div>
      
    </Form.Group>
    <Form.Group className="mb-3 row">
    <div className="col-md-2 bot10">
      <Form.Label>Observaciones: </Form.Label>
      </div>
      <div className="col-md-8 bot10">
      <Form.Control  as="textarea" rows={3} id="idObservaciones" placeholder="" value={escape(listItem?.Comments)} onChange={e => setListitem(prevState => ({ ...prevState, Comments: e.target.value }))} />
        </div>
  
    </Form.Group>
    <Form.Group className="mb-3 row">
     
    <div className="col-md-4 bot10">
          <CustomDropDown label={"Ubicación:"}  
                    options={OptionUbicacion} 
                
                    selecteditem={listItem && listItem.UbicacionId
                        ? listItem.UbicacionId
                        : null}
                        onChange={(ev: any, option: { key: any; }) => {
                            if (option) {
                                setListitem({ ...listItem, UbicacionId: option.key });
                            } else {
                                setListitem({ ...listItem, UbicacionId: null });
                            }
                            }}
                    usedialogblocking={false}
                    styles={dropdownStyles}
                /> 
        
   
        </div>


        <div className="col-md-4 bot10">
        
          <CustomDropDown label={"Empresa:"}  
                    options={OptionEmpresas} 
                
                    selecteditem={listItem && listItem.EmpresaId
                        ? listItem.EmpresaId
                        : null}
                        onChange={(ev: any, option: { key: any; }) => {
                            if (option) {
                                setListitem({ ...listItem, EmpresaId: option.key });
                            } else {
                                setListitem({ ...listItem, EmpresaId: null });
                            }
                            }}
                    usedialogblocking={false}
                    styles={dropdownStyles}
                /> 
      
        
</div>

       
      </Form.Group>
    <Form.Group className="mb-3 row">
    <div className="col-md-4 bot10">
    <CustomDropDown label={"Centros:"}  
                    options={OptionCentros} 
                
                    selecteditem={listItem && listItem.centroId
                        ? listItem.centroId
                        : null}
                        onChange={(ev: any, option: { key: any; }) => {
                            if (option) {
                                setListitem({ ...listItem, centroId: option.key });
                            } else {
                                setListitem({ ...listItem, centroId: null });
                            }
                            }}
                    usedialogblocking={false}
                    styles={dropdownStyles}
                /> 
     </div>
        <div className="col-md-4 bot10">
        <CustomDropDown label={"Departamento:"}  
                    options={OptionDepartamento} 
                
                    selecteditem={listItem && listItem.mynetDepartamentoId
                        ? listItem.mynetDepartamentoId
                        : null}
                        onChange={(ev: any, option: { key: any; }) => {
                            if (option) {
                                setListitem({ ...listItem, mynetDepartamentoId: option.key });
                            } else {
                                setListitem({ ...listItem, mynetDepartamentoId: null });
                            }
                            }}
                    usedialogblocking={false}
                    styles={dropdownStyles}
                /> 
          
          </div>
    </Form.Group>
   
    <Form.Group className="mb-3 row">

          <div className="col-md-4 bot10">
          <CustomDropDown label={"Puesto:"}  
                    options={OptionPuesto} 
                
                    selecteditem={listItem && listItem.Puesto_x0020_de_x0020_trabajoId
                        ? listItem.Puesto_x0020_de_x0020_trabajoId
                        : null}
                        onChange={(ev: any, option: { key: any; }) => {
                            if (option) {
                                setListitem({ ...listItem, Puesto_x0020_de_x0020_trabajoId: option.key });
                            } else {
                                setListitem({ ...listItem, Puesto_x0020_de_x0020_trabajoId: null });
                            }
                            }}
                    usedialogblocking={false}
                    styles={dropdownStyles}
                /> 
          
        </div>
      
          <div className="col-md-4 bot10">
          <CustomDropDown label={"Categoría:"}  
                    options={OptionCategoria} 
                
                    selecteditem={listItem && listItem.categoriaId
                        ? listItem.categoriaId
                        : null}
                        onChange={(ev: any, option: { key: any; }) => {
                            if (option) {
                                setListitem({ ...listItem, categoriaId: option.key });
                            } else {
                                setListitem({ ...listItem, categoriaId: null });
                            }
                            }}
                    usedialogblocking={false}
                    styles={dropdownStyles}
                /> 

        </div>
      
    </Form.Group>
   
    
    
  {/*   <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group> */}
    <Button onClick={() => Cancelar()} className="btnBlanco">Cancelar</Button>
              <Button onClick={() => onSave(this)} className="btnMyNet">Guardar</Button>
  </Form>
  );
};

export default AltaEmplados;
const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 200, marginRight: 5 },
    dropdownOptionText: { overflow: 'visible', whiteSpace: 'normal' },
    dropdownItem: { height: 'auto' }
  };