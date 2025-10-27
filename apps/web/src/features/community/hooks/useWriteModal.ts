import { useState } from "react";
import { uploadImage, uploadPost } from "../api/api";


interface UseWriteModalProps {
  communityId: number;
  onSuccess?: () => void;
  onClose?: () => void;
}

export const useWriteModal = ({ communityId, onSuccess, onClose }: UseWriteModalProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImages, setUploadingImages] = useState(false);

  const handleFileChange = (newFiles: FileList | null) => {
    if (newFiles) {
      setFiles(prev => [...prev, ...Array.from(newFiles)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      setError("제목과 내용을 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);
    setUploadingImages(true);

    try {
      const imageUrls: string[] = [];
      
      for (const file of files) {
        try {
          const imageRes = await uploadImage(file);
          const imageUrl = imageRes.data || imageRes.url || "";
          if (imageUrl) {
            imageUrls.push(imageUrl);
          }
        } catch (err) {
          console.error("이미지 업로드 실패:", err);
        }
      }

      setUploadingImages(false);

      await uploadPost({
        title,
        content,
        communityId,
        images: imageUrls.length > 0 ? imageUrls : undefined,
      });

      onSuccess?.();
      onClose?.();
    } catch (err: any) {
      setError(err.message || "게시글 업로드 실패");
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  return {
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
  };
};
