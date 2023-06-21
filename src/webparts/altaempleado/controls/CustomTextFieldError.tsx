import * as React from "react";



const CustomTextFieldError: React.FC<any> = (props) => {
  const isValid = props.value !== "";
  props.onValidationChange(isValid);

    return (
      <div  style={{ display: "flex", flexDirection: "column" }}>
        <input type="text" id={props.id} value={props.value} onChange={props.onChange} />
         {props.value === "" && props.guardado && (
          <span  style={{ color: "red" }} id={props.id}>El campo {props.name} es obligatorio.</span>
        )}
      </div>
    );
};

export default CustomTextFieldError;
