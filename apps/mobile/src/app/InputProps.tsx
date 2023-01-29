export interface InputProps {
  value: string;
  placeholder: string;
  label?: string;
  iconName: string;
  onChange: (val: string) => void;
  success?: boolean;
  error?: boolean;
  errorMessage?: string;
  withAutoCorrection?: boolean;
  editable?: boolean;
  secureTextEntry?: boolean;
}

export interface StyledProps {
  isFocused: boolean;
  success: boolean;
  error: boolean;
  labelTop: boolean;
}

export default InputProps;
