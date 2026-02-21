import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import type {
  FieldError,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

interface DynamicPasswordInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
}

function DynamicPasswordInput<T extends FieldValues>({
  name,
  label,
  register,
  error,
}: DynamicPasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      fullWidth
      label={label}
      type={showPassword ? "text" : "password"}
      {...register(name)}
      error={!!error}
      helperText={error?.message}
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleToggle} edge="end">
              {showPassword ? (
                <VisibilityOff sx={{ color: "#fff" }} />
              ) : (
                <Visibility sx={{ color: "#fff" }} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
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

export default DynamicPasswordInput;
