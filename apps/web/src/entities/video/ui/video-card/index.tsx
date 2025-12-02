import { useState, useRef, useEffect, useCallback } from "react";
import Hls from "hls.js";
import * as S from "./style";
import normalProfile from "@/app/assets/images/normal_profile.svg";
import {useVideoCard} from "@/entities/video/hooks/controller/useVideoCard";
import { IStreamDataResponse } from "../../model/type";
import normalThumbnail from '@/app/assets/video-thumbnail.png'

const PREVIEW_DURATION = 10000; // 10초

export const VideoCard = ({
  streamId,
  title,
  url,
  username,
  nickname,
  profileImage,
  thumbnail,
  isLive = true,
}: IStreamDataResponse) => {
	const {handleOnClickVideoCard, handleOnClickProfile} = useVideoCard({streamId, username, isLive});
	const displayThumbnail = thumbnail || normalThumbnail;

	const [isHovering, setIsHovering] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isVideoReady, setIsVideoReady] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const hlsRef = useRef<Hls | null>(null);
	const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
	const previewTimerRef = useRef<NodeJS.Timeout | null>(null);

	const cleanupHls = useCallback(() => {
		if (hlsRef.current) {
			hlsRef.current.destroy();
			hlsRef.current = null;
		}
		if (previewTimerRef.current) {
			clearTimeout(previewTimerRef.current);
			previewTimerRef.current = null;
		}
	}, []);

	const startPreview = useCallback(() => {
		if (!url || !videoRef.current) return;

		const video = videoRef.current;
		let hasStartedPlaying = false;

		const onCanPlay = () => {
			if (!hasStartedPlaying) {
				hasStartedPlaying = true;
				setIsVideoReady(true);
				video.play().catch(() => {});
			}
		};

		if (video.canPlayType("application/vnd.apple.mpegurl")) {
			video.src = url;
			video.muted = true;
			video.addEventListener('canplay', onCanPlay, { once: true });
		} else if (Hls.isSupported()) {
			const hls = new Hls({
				enableWorker: true,
				lowLatencyMode: isLive,
			});
			hlsRef.current = hls;
			hls.loadSource(url);
			hls.attachMedia(video);
			hls.on(Hls.Events.FRAG_BUFFERED, () => {
				if (!hasStartedPlaying) {
					hasStartedPlaying = true;
					video.muted = true;
					setIsVideoReady(true);
					video.play().catch(() => {});
				}
			});
		}

		// 라이브일 때만 10초 후 미리보기 종료
		if (isLive) {
			previewTimerRef.current = setTimeout(() => {
				setIsLoading(false);
				setIsVideoReady(false);
				cleanupHls();
			}, PREVIEW_DURATION);
		}
	}, [url, cleanupHls, isLive]);

	const handleMouseEnter = () => {
		setIsHovering(true);
		hoverTimerRef.current = setTimeout(() => {
			setIsLoading(true);
		}, 100);
	};

	const handleMouseLeave = () => {
		setIsHovering(false);
		setIsLoading(false);
		setIsVideoReady(false);

		if (hoverTimerRef.current) {
			clearTimeout(hoverTimerRef.current);
			hoverTimerRef.current = null;
		}
		cleanupHls();
	};

	useEffect(() => {
		if (isLoading && isHovering) {
			startPreview();
		}
	}, [isLoading, isHovering, startPreview]);

	useEffect(() => {
		return () => {
			cleanupHls();
			if (hoverTimerRef.current) {
				clearTimeout(hoverTimerRef.current);
			}
		};
	}, [cleanupHls]);

	return (
		<S.LiveCardContainer onClick={handleOnClickVideoCard}>
			<S.VideoContainer
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<S.Thumbnail src={displayThumbnail} alt={title} />
				{isLoading && url && (
					<>
						<S.PreviewVideo
							ref={videoRef}
							muted
							playsInline
							$isVisible={isVideoReady}
						/>
						{isVideoReady && isLive && (
							<S.LiveBadge>LIVE</S.LiveBadge>
						)}
					</>
				)}
			</S.VideoContainer>
			<S.LiveInfo>
				<S.ProfileImage src={profileImage || normalProfile} onClick={handleOnClickProfile} />
				<S.TitleContainer>
					<S.LiveTitle>{title}</S.LiveTitle>
					<S.StreamerName>{nickname}</S.StreamerName>
				</S.TitleContainer>
			</S.LiveInfo>
		</S.LiveCardContainer>
	);
};
