interface InitModalStep2Props {
  onPrev: () => void;
  onClose: () => void;
}

export const InitModalStep2 = ({ onPrev, onClose }: InitModalStep2Props) => {
  return (
    <div>
      <h2>당신의 취향을 선택해주세요</h2>
      {/* 예시 */}
      <label><input type="checkbox" /> 게임</label>
      <label><input type="checkbox" /> 음악</label>
      <div>
        <button onClick={onPrev}>이전</button>
        <button onClick={onClose}>완료</button>
      </div>
    </div>
  );
};
