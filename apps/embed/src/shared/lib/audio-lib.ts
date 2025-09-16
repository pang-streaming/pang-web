export const playBase64Audio = async (base64: string) => {
  try {
    // Base64 → Uint8Array
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: "audio/mp3" });
    const url = URL.createObjectURL(blob);

    const audio = new Audio(url);
    await audio.play();

    await new Promise<void>((resolve) => {
      audio.onended = () => resolve();
    });
  } catch (err) {
    console.error("Base64 오디오 재생 실패:", err);
  }
};
