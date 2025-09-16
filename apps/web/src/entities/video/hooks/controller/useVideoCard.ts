import {useNavigate} from "react-router-dom";
import type {MouseEvent} from "react";

interface VideoCardProps {
	streamId: string;
	username: string;
}

export const useVideoCard = ({streamId, username}: VideoCardProps) => {
	const navigate = useNavigate();
	const handleOnClickVideoCard = () => {
		navigate(`/livedetail?streamId=${streamId}`);
	};
	
	const handleOnClickProfile = (e: MouseEvent) => {
		e.stopPropagation();
		navigate(`/profile/${username}`);
	}
	
	return {handleOnClickVideoCard, handleOnClickProfile};
}