import React,{useState} from "react";
export default function Checkbox(props){
    const [isChecked, setIsChecked] = useState(false);

    return(
        <div className="input-group-text">
        <input
          className="form-check-input mt-0"
          onChange={() => {
            setIsChecked(!isChecked);
           props.handleChange(!isChecked,props.position,props.label);
          }}
         
          checked={props.isDone}
          type="checkbox"
          aria-label="Checkbox for following text input"
        />
      </div>
    )
}