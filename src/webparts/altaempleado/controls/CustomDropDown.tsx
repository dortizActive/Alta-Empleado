import {
 Dropdown, Icon,
  IDropdownOption, IDropdownProps, Stack, TooltipHost
} from '@fluentui/react';
import { useConst, useId } from '@fluentui/react-hooks';

import * as React from "react";
import { useState } from "react";

const CustomDropDown : React.FC<any> = (props) => {
  const [selected, setSelected] = useState({ key: null, text: null });

  
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

  };  

 
  const tooltipId = useId('tooltip');
  const dropDownId = useId('targetDropDown');







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
      options: (props.options && props.options.length > 0) ? props.options : [],
      selectedKey:(props.selecteditem ==undefined)?selected.key:props.selecteditem
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
    

<div className={`active-control active-customdropdown${props.className?" "+props.className:""}${props.labelPosition === 'Izquierda' ? ' flexDropdown' : ''}`}>
     { props.labelPosition == "Izquierda" &&
               <label className="boldtext">{props.label}</label>
            }
          <div   style={{ width: "-webkit-fill-available" }}>
      
          {props.OnlyText && (props.labelPosition === 'Izquierda') && (
                <span className='active-solotexto'>
                  {props.text}
                </span>
              )}

{props.OnlyText && (props.labelPosition === '' || props.labelPosition == null) && (
  <>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <label className='boldtextCheck'>{props.label}</label>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <label className='displayMargincustomtextAbajo'>{props.text}</label>
    </div>
  </>
)}
      {!props.OnlyText &&
      <TooltipHost
        content={props.tooltip}
        id={tooltipId}
        calloutProps={calloutProps}
      
        >
          
        {
        // props.options && props.options.length > 0 &&
        <Dropdown
          id={dropDownId}
          required={props.required}
          label={props.labelPosition !== "Izquierda" ? props.label : ""}
          placeholder={props.placeholder}
          style={{width:"100%"}}
          styles={props.styles}
          {...propsIfmultipleorsingle}
          onChange={onChange}
          disabled={props.disabled}
          //defaultSelectedKey={props.selecteditem}
        
          onRenderCaretDown={(event) => {
            if (props.noX) {
              return (
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
              );
            } else {
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
                       
                          event.stopPropagation();
                          onClear(event);
                        
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
            }
          }}
          />
          }
      </TooltipHost>
      }

      </div>
     
    </div>
  );
};

export default CustomDropDown;