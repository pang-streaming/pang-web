import { useState } from "react";
import {ButtonProps} from "./smallButton.props"
import {ButtonConatiner, ButtonText, Spinning} from "./smallButton.styles"

export const SmallButton = ({ label, disabled, onClick }: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const buttonHandler = async () => {
    // 버튼 클릭 이벤트와 비활성화 되지 않았을시에만 작동
    if (onClick && !disabled) { 
      // 이미 버튼이 불러 와졌다면
      if (isLoading)
        return;
      
      // 버튼 로딩 상태 변경
      setIsLoading(true)
      try{
        // 전달받은 이벤트 실행
        await onClick()
      }finally{
        // 모든 이벤트가 종료된 후 상태 변경
        setIsLoading(false)
      }
    }
  }

  return (
    <ButtonConatiner
      onClick={buttonHandler}
      label={label}
      isLoading={isLoading}
      isDisabled={disabled}
    >
      { !isLoading ? 
        <ButtonText>
          {label}
        </ButtonText>
       : 
        <Spinning size={18}/>
      } 
    </ButtonConatiner>  
  );
};
