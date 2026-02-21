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
  variant="outlined"
  sx={{
    "& .MuiInputBase-input": {
      color: "#fff",
    },

    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.7)",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#ff2d2d",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(255,255,255,0.3)",
      },
      "&:hover fieldset": {
        borderColor: "#ff2d2d",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ff2d2d",
      },
    },

    "& input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px transparent inset",
      WebkitTextFillColor: "#fff",
      transition: "background-color 5000s ease-in-out 0s",
    },
  }}
/>

  );
}

export default DynamicInput;
