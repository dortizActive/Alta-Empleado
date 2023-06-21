import {
  ContextualMenu, DefaultButton, Dialog, DialogFooter, DialogType, Dropdown, Icon,
  IDropdownOption, IDropdownProps, PrimaryButton, Stack, TooltipHost
} from '@fluentui/react';
import { useConst, useId } from '@fluentui/react-hooks';
import * as React from "react";
import { useState } from "react";

const CustomDropDown : React.FC<any> = (props) => {
  const [selected, setSelected] = useState({ key: null, text: null });
  const [hideDialog, setHideDialog] = useState(true);
  const [opcionactual, setOpcionActual] = useState<IDropdownOption>(null);
  const labelId: string = useId('dialogLabel');
  const subTextId: string = useId('subTextLabel');
  
  // eslint-disable-next-line
  const onClear = (event:any) => {
    
    setSelected({ key: null, text:null });   

    if(props.onChange)
    {
      props.onChange(event,null);
    }
  };

  const onChange = ( 
    ev:any,
    option: IDropdownOption) : void => {
    if(props.onChange){      
      if(props.usedialogblocking)
      {
          setOpcionActual(option);
         setHideDialog(false)
      }
      else{
          props.onChange(ev,option);
          setSelected(option);
      }
    }
  };  

 
  const tooltipId = useId('tooltip');
  const dropDownId = useId('targetDropDown');

  const dialogContentProps = {
    type: DialogType.normal,
    title: "Confirmación",
    subText: props.confirmationtext?props.confirmationtext:"Confirmación text"
  };

  const dialogStyles = { main: { maxWidth: 450 } };
  const dragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu,
    keepInBounds: true,
  };
  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
      dragOptions: dragOptions,
    }),
    [labelId, subTextId],
  );


  const calloutProps = useConst({
    gapSpace: 0,
    // If the tooltip should point to an absolutely-positioned element,
    // you must manually specify the callout target.
    target: `#${dropDownId}`,
  });
  
  let propsIfmultipleorsingle:IDropdownProps;
  
  if(!props.multiSelect)
  {
    propsIfmultipleorsingle={  
      options:props.options,  selectedKey:(props.selecteditem ==undefined)?selected.key:props.selecteditem
    };
  }
  else{
   
        propsIfmultipleorsingle={  
          options:props.options,  defaultSelectedKeys:props.selectedKeys,
          multiSelect:props.multiSelect }
    ;
    //,  selectedKeys:props.selectedKeys
  }

  return (
    <div className="active-control active-customdropdown">

      <TooltipHost
        content={props.tooltip}
        id={tooltipId}
        calloutProps={calloutProps}>
          {props.options && props.options.length>0 &&
      <Dropdown
        id={dropDownId}
        required={props.required}
        label={props.label}
        placeholder={props.placeholder}
        style={{width:"100%"}}
        styles={props.styles}
        {...propsIfmultipleorsingle}
        onChange={onChange}
        disabled={props.disabled}
        //defaultSelectedKey={props.selecteditem}
      
        onRenderCaretDown={(event) => {
          return (
            <Stack horizontal verticalAlign={"center"}>
              {props.selecteditem && (
                <Icon
                  iconName={"Cancel"}
                  styles={{
                    root: {
                      color: "rgb(96, 94, 92)",
                      paddingRight: ".7em",
                      "&:hover": {
                        fontWeight: 800
                      }
                    }
                  }}
                  onClick={(event) => {
                    if(props.usedialogblocking)
                    {
                        setHideDialog(false);

                    }else{
                    event.stopPropagation();
                    onClear(event);
                    }
                  }}
                />
              )}
              <Icon
                iconName={"ChevronDown"}
                styles={{
                  root: {
                    color: "rgb(96, 94, 92)",
                    "&:hover": {
                      fontWeight: 800
                    }
                  }
                }}                
              />
            </Stack>
          );
        }}/>
        }
      </TooltipHost>
      {!hideDialog && props.usedialogblocking && 
      <Dialog
        hidden={hideDialog}
        onDismiss={()=>{setHideDialog(true)}}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <DialogFooter>
          <PrimaryButton onClick={()=>{setHideDialog(true);
            if(opcionactual){
              props.onChange(event,opcionactual);
              setSelected(opcionactual);
              setOpcionActual(null);
            }else{
              onClear(event);
            }
          }} text={"Si"} />
          <DefaultButton onClick={()=>{setHideDialog(true)}}text={"No"} />
        </DialogFooter>
      </Dialog>
      }
    </div>
  );
};

export default CustomDropDown;