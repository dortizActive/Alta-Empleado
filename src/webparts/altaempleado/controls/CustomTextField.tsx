import {
  Icon, TextField, TooltipHost
} from "@fluentui/react";
import { useConst, useId } from '@fluentui/react-hooks';
import * as React from "react";
import { useState } from "react";

const CustomTextField : React.FC<any> = (props) => {
      // eslint-disable-next-line
  const [value, setValue] = useState({value:''});

  // eslint-disable-next-line
  const onClear = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    
    setValue({value:''});
     console.log(value);
    if(props.onChange)
    {
      props.onChange(event,'');
    }
  };

  const onChange = (
    (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, 
      newText: string):  any => {  
   
    if(props.onChange){      
      props.onChange(ev,newText);
      setValue({value: newText});
    }
    });  
    

    const onFocus = (
      (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) 
       : void => { 
     
          if(props.onFocus){
            props.onFocus(ev);
            console.log((ev.target as any).value);
           // setValue({value: ((<HTMLInputElement>ev.target).value != undefined || (ev.target as HTMLInputElement).value != '' )?  (ev.target as HTMLInputElement).value.toString().replace('.',''):''});
          }

    })

    const onBlur = (
      (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) 
       : void => { 
     
          if(props.onBlur){
            props.onBlur(ev);
            //console.log((ev.target as any).value);
           // setValue({value: ((<HTMLInputElement>ev.target).value != undefined || (ev.target as HTMLInputElement).value != '' )?  (ev.target as HTMLInputElement).value.toString().replace('.',''):''});
          }

    })

    
    const onKeyDown = (
      (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) 
       : void => { 
     
          if(props.onKeyDown){
            props.onKeyDown(ev);
           // setValue({value: ((<HTMLInputElement>ev.target).value != undefined || (ev.target as HTMLInputElement).value != '' )?  (ev.target as HTMLInputElement).value.toString().replace('.',''):''});
          }

    })


  const tooltipId = useId('tooltip');
  const textFieldId = useId('targetTextField');
  
  const calloutProps = useConst({
    gapSpace: 0,
    // If the tooltip should point to an absolutely-positioned element,
    // you must manually specify the callout target.
    target: `#${textFieldId}`,
  });
  
  
  return (

    
    <div  className="active-control active-customtextbox">
      <TooltipHost
        content={props.tooltip}
        id={tooltipId}
        calloutProps={calloutProps}>     
            <TextField
              ariaLabel={props.ariaLabel}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={onKeyDown}
              disabled={props.disabled}
              name={props.name}
              autoFocus={props.autoFocus}
              inputMode={props.inputMode}
              //onGetErrorMessage={onGetErrorMessage}
              errorMessage={props.errorMessage}
              autoComplete='off'
              required={props.required}
              id={textFieldId}
              label={props.label}
              placeholder={props.placeholder}
              multiline={props.multiline}
              styles={props.styles}
              className={props.className}
              validateOnFocusOut={props.validateOnFocusOut}
              validateOnFocusIn={props.validateOnFocusOut}
              maxLength={props.maxLength}
              onRenderSuffix={(!props.noX && props.value != '') ? () => {
                return  <Icon 
                iconName={"Cancel"}
                styles={{
                  root: {
                    cursor:'pointer',
                    color: 'rgb(96, 94, 92)',
                    background: 'rgb(255, 255, 255) !important',
                    paddingRight: ".5em",
                    "&:hover": {
                      fontWeight: 800
                    }
                   }
                 }
                }
                onClick={(event) => {
                  event.stopPropagation();
                  onClear(event);
                }}
              />;
              } : null}
              resizable={false}
              value={(props.value == undefined)?'':props.value} 
              onChange={onChange}/>
      </TooltipHost>
    </div>
  );
};

export default CustomTextField;