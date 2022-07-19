import { TextField, MenuItem } from "@mui/material";

export type FormProps = {
  fieldName: string;
  type: string;
  value?: string | number;
  options?: any[];
}

export type DynamicFormProps = FormProps & {
  onChange?: (e: any) => void 
}

export const DynamicForm = ({
  fieldName,
  type,
  value,
  options,
  onChange = () => {}
}: DynamicFormProps) => {

  const getLabel = () => {
    const label = fieldName.split(/(?=[A-Z])/).join(' ');
    return label.charAt(0).toUpperCase() + label.slice(1);
  }

  if (['text', 'email', 'number', 'multiline', 'select'].includes(type)) return (
    <TextField
      id={fieldName}
      name={fieldName}
      label={getLabel()}
      value={value}
      type={type}
      onChange={onChange}
      select={type === 'select'}
      multiline={type === 'multiline'}
      rows={type === 'multiline' ? 6 : undefined}
    >
      {type === 'select' && options && ([
        (
          <MenuItem key="select-option" value="">
            -- Please select an option --
          </MenuItem>
        ),
        ...options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))
      ])}
    </TextField>
  );

  return (
    <div>{`Type "${type}" for "${fieldName}" is not a valid type!`}</div>
  )
}

export default DynamicForm;