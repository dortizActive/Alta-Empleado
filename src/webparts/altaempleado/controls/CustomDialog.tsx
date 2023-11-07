
import { DefaultButton, Modal, ProgressIndicator, css } from '@fluentui/react';
import * as strings from 'AltaEmpladosWebPartStrings';
import * as React from 'react';

export interface ICustomDialogProps {

}
export interface ICustomDialogState {
    Show: boolean;
    Text?: string;
    Error?: boolean;
    Procesando?: boolean;
}


export class CustomDialog extends React.Component<ICustomDialogProps, ICustomDialogState>  {
    //private idinterval: any;

    constructor(props: any) {

        super(props);

        this.state = {
            Show: false,
            Text: "",
            Error: false,
            Procesando: false
        }
    }

    // componentDidMount() {

    // }

    OnHideErrorModal(item: this): (event: any) => void {


        this.setState({
            Show: false
        });

        return;

    }
    public render(): JSX.Element {

        return (
            <div>
                {this.state.Show &&
                    <Modal
                        /*   className="ms-SPLegacyFabricBlock"*/
                        isOpen={this.state.Show}
                        onDismiss={this.OnHideErrorModal.bind(this)}
                        isModeless={false}
                        isBlocking={this.state.Procesando ? true : false}
                        isClickableOutsideFocusTrap={this.state.Procesando ? false : true}
                        containerClassName="active-listform-modalerror"
                    >
                        {/*ms-SPLegacyFabricBlock porque si no, no pilla los iconos en PRO, al estar esta capa fuera del principal ms-SPLegacy... 

 */}
                        <div className={css("ms-Grid-row active-listform-dialog-cuerpo-wrapper ms-SPLegacyFabricBlock", this.state.Error ? "error" : "procesando")}>
                            <div className="ms-Grid-col ms-sm2"><i className={this.state.Error ? "ms-Icon ms-Icon--Error" : "ms-Icon ms-Icon--Accept"}
                            /></div><div className="ms-Grid-col ms-sm10  moverDerechaTexto ">


                                {this.state.Procesando &&

                                    <ProgressIndicator label={strings.Procesando} description={strings.EspereSegundos} />

                                }
                                {!this.state.Procesando &&
                                    <div dangerouslySetInnerHTML={{ __html: this.state.Text }}/>
                                }
                            </div></div>

                        {this.state.Error &&
                            <div className="active-listform-dialog-close">
                                <DefaultButton onClick={this.OnHideErrorModal.bind(this)} text={strings.Cerrar} />
                            </div>
                        }
                    </Modal>

                }
            </div>
        );

        /*var html:string = "";  
        html+=  `<div  class="${ styles["main-dialog"] }">`; 
        html += `<div id="overlay" class="${ styles.dialogoverlay }"></div>`;
        html += `<img style="margin-left:40%;" src="/_layouts/15/images/progress.gif">`
        html+=  `<h1 class="${ styles.dialogtext }">!!Please wait!!</h1>`;
        html+=  `<h1 class="${ styles.text }">!!We are Converting your File to PDF!!</h1>`;
        html+=  `</div>`
        this.domElement.innerHTML += html;    */

    }

}
