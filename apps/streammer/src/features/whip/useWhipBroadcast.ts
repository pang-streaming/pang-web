import { RefObject, useCallback, useRef } from 'react';
import { WHIPClient } from '@eyevinn/whip-web-client';
import {api} from "@pang/shared/ui";

export const useWhipBroadcast = (
	canvasRef: RefObject<HTMLCanvasElement | null>,
	streamKey?: string | null,
	whipUrl?: string | null
) => {
	const clientRef = useRef<WHIPClient | null>(null);
	const isStreaming = useRef<boolean>(false);
	
	const createStream = async (): Promise<null> => {
		const res = await api.post(`/stream`, {}, {
			headers: {
				"X-Stream-Key": streamKey,
			}
		});
		return res.data.data || [];
	};
	
	const startStreaming = useCallback(async () => {
		if (!canvasRef.current) {
			throw new Error('Canvas reference is missing');
		}
		
		if (!streamKey || !whipUrl) {
			throw new Error('Stream key is missing');
		}
		
		try {
			const canvas = canvasRef.current;
			
			// Canvas 스트림 60fps
			const stream = canvas.captureStream(60);
			
			console.log(whipUrl)
			
			await createStream();
			
			// WHIPClient 생성 - streamKey를 endpoint URL에 포함
			const client = new WHIPClient({
				endpoint: whipUrl,
				opts: { debug: true }
			});
			clientRef.current = client;
			
			// ICE 서버 가져오기
			await client.setIceServersFromEndpoint();
			
			// 스트리밍 시작
			await client.ingest(stream);
			
			console.log('Streaming started with canvas at 60fps');
			isStreaming.current = true;
		} catch (error) {
			console.error('Failed to start streaming:', error);
			throw error;
		}
	}, [canvasRef, streamKey, whipUrl]);
	
	const stopStreaming = useCallback(async () => {
		clientRef.current?.destroy()
			.then(async ()=> {
				await api.delete("/stream", {
					headers: {
						"X-Stream-Key": streamKey
					}
				})
				isStreaming.current = false;
			})
			.catch(err=>console.log(err));
	}, [streamKey]);
	
	return { isStreaming, startStreaming, stopStreaming };
};
