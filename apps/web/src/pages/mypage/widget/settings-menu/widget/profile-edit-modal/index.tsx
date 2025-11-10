import React, { useRef, useState } from "react";
import { SubmitButton } from "@pang/shared/ui";
import { useSettingMenu } from "../../useSettingMenu";
import { uploadImage } from "@/entities/user/api";
import * as S from "./style";

interface ProfileEditModalProps {
  onClose: () => void;
}

export const ProfileEditModal = ({ onClose }: ProfileEditModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const {
    nickname,
    setNickname,
    age,
    setAge,
    gender,
    setGender,
    profileImage,
    setProfileImage,
    bannerImage,
    setBannerImage,
    description,
    setDescription,
    loading,
    error,
    initialLoading,
    handleUpdate,
  } = useSettingMenu({});

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const response = await uploadImage(file);
        console.log("이미지 업로드 응답:", response);
        
        const imageUrl = response.data || response.url || response;
        setProfileImage(imageUrl);
        
        alert("이미지 업로드 완료!");
      } catch (err) {
        console.error("이미지 업로드 실패:", err);
        alert("이미지 업로드에 실패했습니다.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    const result = await handleUpdate();
    if (result) {
      onClose();
    }
  };

  if (initialLoading) {
    return (
      <S.ModalOverlay>
        <S.ModalContainer>
          <S.Title>프로필 정보 수정</S.Title>
          <div style={{ textAlign: 'center', padding: '20px' ,color: 'white'}}>
            사용자 정보를 불러오는 중...
          </div>
        </S.ModalContainer>
      </S.ModalOverlay>
    );
  }

  return (
    <S.ModalOverlay>
      <S.ModalContainer>
        <S.Title>프로필 정보 수정</S.Title>

        <S.ProfileImageSection>
          <S.ProfileImageLabel>프로필 이미지</S.ProfileImageLabel>
          <S.ProfileImageContainer onClick={!isUploading ? handleImageClick : undefined}>
            {isUploading ? (
              <S.ProfileImagePlaceholder>
                <S.UploadIcon>⏳</S.UploadIcon>
                <S.UploadText>업로드 중...</S.UploadText>
              </S.ProfileImagePlaceholder>
            ) : profileImage ? (
              <S.ProfileImagePreview src={profileImage} alt="프로필 이미지" />
            ) : (
              <S.ProfileImagePlaceholder>
                <S.UploadIcon>📷</S.UploadIcon>
                <S.UploadText>이미지 업로드</S.UploadText>
              </S.ProfileImagePlaceholder>
            )}
          </S.ProfileImageContainer>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            disabled={isUploading}
          />
        </S.ProfileImageSection>

        <S.Input
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <S.Input
          placeholder="나이"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <S.Select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="MALE">남성</option>
          <option value="FEMALE">여성</option>
          <option value="OTHER">기타</option>
        </S.Select>

        <S.Input
          placeholder="소개글"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {error && <S.ErrorText>{error}</S.ErrorText>}

        <S.ButtonContainer>
          <SubmitButton onClick={handleSubmit} disabled={loading || isUploading}>
            {loading ? "저장 중..." : isUploading ? "업로드 중..." : "저장"}
          </SubmitButton>
          <SubmitButton type="alternative" onClick={onClose} disabled={loading || isUploading}>
            취소
          </SubmitButton>
        </S.ButtonContainer>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};
