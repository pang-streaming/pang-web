import { RefObject, useCallback, useRef } from 'react';
import { WHIPClient } from '@eyevinn/whip-web-client';

export const useWhipBroadcast = (
	canvasRef: RefObject<HTMLCanvasElement | null>,
	streamKey?: string | null,
) => {
	const clientRef = useRef<WHIPClient | null>(null);
	
	const startStreaming = useCallback(async () => {
		if (!canvasRef.current) {
			throw new Error('Canvas reference is missing');
		}
		
		if (!streamKey) {
			throw new Error('Stream key is missing');
		}
		
		try {
			const canvas = canvasRef.current;
			
			// Canvas 스트림 60fps
			const stream = canvas.captureStream(60);
			
			console.log(stream)
			
			// WHIPClient 생성 - streamKey를 endpoint URL에 포함
			const client = new WHIPClient({
				endpoint: `https://customer-0z4kxqofwc4dm6km.cloudflarestream.com/${streamKey}/webRTC/publish`,
				opts: { debug: true }
			});
			clientRef.current = client;
			
			// ICE 서버 가져오기
			await client.setIceServersFromEndpoint();
			
			// 스트리밍 시작
			await client.ingest(stream);
			
			console.log('Streaming started with canvas at 60fps');
		} catch (error) {
			console.error('Failed to start streaming:', error);
			throw error;
		}
	}, [canvasRef, streamKey]);
	
	return { startStreaming };
};
