import { TextField } from "@mui/material";

export type DynamicFormProps = {
  fieldName: string;
  type: string;
  value?: string | number;
  options?: any[];
  handleChange?: (e: any) => void 
}

const DynamicForm = ({
  fieldName,
  type,
  value,
  options,
  handleChange = () => {}
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
      onChange={handleChange}
    />
  );

  return (
    <div>{`${fieldName} - ${type}`}</div>
  )
}

export default DynamicForm;