import { TextField } from "@mui/material";
import type {
  FieldError,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

interface DynamicInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
}

function DynamicInput<T extends FieldValues>({
  name,
  label,
  type = "text",
  register,
  error,
}: DynamicInputProps<T>) {
  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      {...register(name)}
      error={!!error}
      helperText={error?.message}
    />
  );
}

export default DynamicInput;
