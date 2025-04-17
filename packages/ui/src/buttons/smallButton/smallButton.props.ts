export interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

export interface ButtonContainerProps{
  label: string;
  isLoading?: boolean;
  isDisabled?: boolean;
}
