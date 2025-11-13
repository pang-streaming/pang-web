import { create } from 'zustand';

interface AudioTrackInfo {
	id: string;
	track: MediaStreamTrack;
	source?: 'screen' | 'microphone' | 'system';
	label?: string;
	addedAt: number;
	gain: number;
}

interface AudioStore {
	audioTracks: AudioTrackInfo[];
	addAudioTrack: (track: MediaStreamTrack, source?: 'screen' | 'microphone' | 'system', label?: string) => void;
	removeAudioTrack: (trackId: string) => void;
	clearAllAudioTracks: () => void;
	hasAudioTrack: (trackId: string) => boolean;
	getAudioTracksBySource: (source: 'screen' | 'microphone' | 'system') => AudioTrackInfo[];
	setTrackGain: (trackId: string, gainDb: number) => void;
}

export const useAudioStore = create<AudioStore>((set, get) => ({
	audioTracks: [],
	
	addAudioTrack: (track, source, label) => {
		set((state) => {
			// 이미 존재하는 트랙인지 확인 (중복 방지)
			const exists = state.audioTracks.some(t => t.id === track.id);
			if (exists) {
				console.warn(`Audio track ${track.id} already exists`);
				return state;
			}
			
			console.log(`Adding audio track: ${track.id}`, { source, label });
			
			return {
				audioTracks: [
					...state.audioTracks,
					{
						id: track.id,
						track,
						source,
						label: label || track.label || 'Unknown',
						addedAt: Date.now(),
						gain: 1.0
					}
				]
			};
		});
	},
	
	removeAudioTrack: (trackId) => {
		set((state) => {
			const trackInfo = state.audioTracks.find(t => t.id === trackId);
			
			if (!trackInfo) {
				console.warn(`Audio track ${trackId} not found`);
				return state;
			}
			
			console.log(`Removing audio track: ${trackId}`);
			
			// 트랙 정리 (stop 호출)
			try {
				trackInfo.track.stop();
			} catch (error) {
				console.error('Error stopping track:', error);
			}
			
			return {
				audioTracks: state.audioTracks.filter(t => t.id !== trackId)
			};
		});
	},
	
	clearAllAudioTracks: () => {
		set((state) => {
			console.log(`Clearing all ${state.audioTracks.length} audio tracks`);
			
			// 모든 트랙 정리
			state.audioTracks.forEach(t => {
				try {
					t.track.stop();
				} catch (error) {
					console.error(`Error stopping track ${t.id}:`, error);
				}
			});
			
			return { audioTracks: [] };
		});
	},
	
	hasAudioTrack: (trackId) => {
		return get().audioTracks.some(t => t.id === trackId);
	},
	
	getAudioTracksBySource: (source) => {
		return get().audioTracks.filter(t => t.source === source);
	},
	setTrackGain: (trackId, gainDb) => {
		set((state) => {
			const track = state.audioTracks.find(t => t.id === trackId);
			if (!track) {
				console.warn(`Track ${trackId} not found`);
				return state;
			}
			
			const linearGain = Math.pow(10, gainDb / 20);
			console.log(`Setting gain for track ${trackId}: ${linearGain}`);
			
			return {
				audioTracks: state.audioTracks.map(t =>
					t.id === trackId ? { ...t, gain: linearGain } : t
				)
			}
		})
	}
}));
