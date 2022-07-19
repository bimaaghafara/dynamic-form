import { TextField } from "@mui/material";

export type Form = {
  fieldName: string;
  type: string;
  value?: string | number;
  options?: any[];
}

export type DynamicFormProps = Form & {
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

  if (['text', 'email', 'number'].includes(type)) return (
    <TextField
      id={fieldName}
      label={getLabel()}
      value={value}
      type={type}
      onChange={onChange}
    />
  );

  return (
    <div>{`${fieldName} - ${type}`}</div>
  )
}

export default DynamicForm;