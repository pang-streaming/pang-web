export interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

export interface ButtonContainerProps{
  isLoading?: boolean;
  isDisabled?: boolean;
}
