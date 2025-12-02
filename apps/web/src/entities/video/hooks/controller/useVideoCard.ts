import {useNavigate} from "react-router-dom";
import type {MouseEvent} from "react";

interface VideoCardProps {
	streamId: string;
	username: string;
	isLive?: boolean;
}

export const useVideoCard = ({streamId, username, isLive = true}: VideoCardProps) => {
	const navigate = useNavigate();
	const handleOnClickVideoCard = () => {
		if (isLive) {
			navigate(`/livedetail?streamId=${streamId}`);
		} else {
			navigate(`/video?streamId=${streamId}`);
		}
	};

	const handleOnClickProfile = (e: MouseEvent) => {
		e.stopPropagation();
		navigate(`/profile/${username}`);
	}

	return {handleOnClickVideoCard, handleOnClickProfile};
}