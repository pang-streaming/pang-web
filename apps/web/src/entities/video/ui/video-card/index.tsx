import { useState, useRef, useEffect, useCallback } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
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
  isTopVideo = false,
}: IStreamDataResponse) => {
	const {handleOnClickVideoCard, handleOnClickProfile} = useVideoCard({streamId, username, isLive});
	const displayThumbnail = thumbnail || normalThumbnail;

	const [isHovering, setIsHovering] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isVideoReady, setIsVideoReady] = useState(false);
	const videoContainerRef = useRef<HTMLDivElement>(null);
	const playerRef = useRef<Player | null>(null);
	const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
	const previewTimerRef = useRef<NodeJS.Timeout | null>(null);

	const cleanupPlayer = useCallback(() => {
		if (previewTimerRef.current) {
			clearTimeout(previewTimerRef.current);
			previewTimerRef.current = null;
		}
		if (playerRef.current) {
			playerRef.current.dispose();
			playerRef.current = null;
		}
		// dispose 후 container 내부 정리
		if (videoContainerRef.current) {
			videoContainerRef.current.innerHTML = '';
		}
	}, []);

	const startPreview = useCallback(() => {
		if (!url || !videoContainerRef.current || playerRef.current) return;

		// video 요소를 동적으로 생성
		const video = document.createElement('video');
		video.className = 'video-js';
		video.muted = true;
		video.playsInline = true;
		videoContainerRef.current.appendChild(video);

		const player = videojs(video, {
			controls: false,
			autoplay: true,
			muted: true,
			preload: "auto",
			html5: {
				vhs: {
					overrideNative: true,
				},
				nativeAudioTracks: false,
				nativeVideoTracks: false,
			},
			sources: [
				{
					src: url,
					type: "application/x-mpegURL",
				},
			],
		});

		playerRef.current = player;

		player.ready(() => {
			setIsVideoReady(true);
			player.play()?.catch(() => {});
		});

		// 라이브일 때만 10초 후 미리보기 종료 (top video 제외)
		if (isLive && !isTopVideo) {
			previewTimerRef.current = setTimeout(() => {
				setIsLoading(false);
				setIsVideoReady(false);
				cleanupPlayer();
			}, PREVIEW_DURATION);
		}
	}, [url, cleanupPlayer, isLive, isTopVideo]);

	const handleMouseEnter = () => {
		if (isTopVideo) return;
		setIsHovering(true);
		hoverTimerRef.current = setTimeout(() => {
			setIsLoading(true);
		}, 100);
	};

	const handleMouseLeave = () => {
		if (isTopVideo) return;
		setIsHovering(false);
		setIsLoading(false);
		setIsVideoReady(false);

		if (hoverTimerRef.current) {
			clearTimeout(hoverTimerRef.current);
			hoverTimerRef.current = null;
		}

		cleanupPlayer();
	};

	// top video는 마운트 시 바로 재생
	useEffect(() => {
		if (isTopVideo && url) {
			startPreview();
		}
	}, [isTopVideo, url, startPreview]);

	useEffect(() => {
		if (!isTopVideo && isLoading && isHovering) {
			startPreview();
		}
	}, [isLoading, isHovering, startPreview, isTopVideo]);

	useEffect(() => {
		return () => {
			cleanupPlayer();
			if (hoverTimerRef.current) {
				clearTimeout(hoverTimerRef.current);
			}
		};
	}, [cleanupPlayer]);

	return (
		<S.LiveCardContainer onClick={handleOnClickVideoCard}>
			<S.VideoContainer
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				{!isTopVideo && <S.Thumbnail src={displayThumbnail} alt={title} />}
				<S.PreviewVideoContainer
					ref={videoContainerRef}
					$isVisible={isTopVideo || isVideoReady}
				/>
				{(isTopVideo || isVideoReady) && isLive && (
					<S.LiveBadge>LIVE</S.LiveBadge>
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
