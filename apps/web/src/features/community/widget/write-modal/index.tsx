import React from "react";
import { SubmitButton } from "@pang/shared/ui";
import { useWriteModal } from "./useWriteModal";
import * as S from "./style";

interface WritePostModalProps {
  communityId: number;
  onClose: () => void;
  onSuccess?: () => void;
}

export const WritePostModal = ({ communityId, onClose, onSuccess }: WritePostModalProps) => {
  const {
    title,
    setTitle,
    content,
    setContent,
    files,
    handleFileChange,
    removeFile,
    loading,
    uploadingImages,
    error,
    handleSubmit,
  } = useWriteModal({ communityId, onClose, onSuccess });

  return (
    <S.ModalOverlay>
      <S.ModalContainer>
        <S.Title>게시글 작성</S.Title>
        <S.TitleInput
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <S.ContentTextarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        
        {/* 이미지 업로드 섹션 */}
        <S.ImageSection>
          <S.FileInput
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileChange(e.target.files)}
          />
          <S.ImagePreviewContainer>
            {files.map((file, index) => (
              <S.ImagePreviewItem key={index}>
                <S.ImagePreview src={URL.createObjectURL(file)} alt={`미리보기 ${index + 1}`} />
                <S.RemoveImageButton onClick={() => removeFile(index)}>✕</S.RemoveImageButton>
              </S.ImagePreviewItem>
            ))}
          </S.ImagePreviewContainer>
          {files.length > 0 && (
            <S.ImageCount>{files.length}개의 이미지 선택됨</S.ImageCount>
          )}
        </S.ImageSection>

        {error && <S.ErrorText>{error}</S.ErrorText>}
        <S.ButtonContainer>
          <SubmitButton onClick={handleSubmit} disabled={loading}>
            {uploadingImages ? `이미지 업로드 중... (${files.length}개)` : loading ? "게시 중..." : "게시글 업로드"}
          </SubmitButton>
          <SubmitButton type="alternative" onClick={onClose} disabled={loading}>
            취소
          </SubmitButton>
        </S.ButtonContainer>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};
