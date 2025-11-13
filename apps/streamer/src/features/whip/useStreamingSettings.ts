import {useCallback} from "react";

export const useStreamingSettings = () => {
	
	const setCodecPreferences = useCallback((sdp: string): string => {
		const lines = sdp.split('\r\n');
		const h264Payloads: string[] = [];
		const opusPayloads: string[] = [];
		const payloadsToKeep: string[] = [];
		const rtxMap = new Map<string, string>();
		
		lines.forEach(line => {
			const rtpmapMatch = line.match(/^a=rtpmap:(\d+)\s+(.+)/);
			if (rtpmapMatch) {
				const payload = rtpmapMatch[1];
				const codec = rtpmapMatch[2].toLowerCase();
				if (codec.includes('h264')) {
					h264Payloads.push(payload);
				} else if (codec.includes('opus')) {
					opusPayloads.push(payload);
				}
			}
			const fmtpMatch = line.match(/^a=fmtp:(\d+)\s+apt=(\d+)/);
			if (fmtpMatch) {
				rtxMap.set(fmtpMatch[1], fmtpMatch[2]);
			}
		});
		
		payloadsToKeep.push(...h264Payloads, ...opusPayloads);
		
		// 2. Find associated RTX payloads to keep
		rtxMap.forEach((mainPayload, rtxPayload) => {
			if (h264Payloads.includes(mainPayload) || opusPayloads.includes(mainPayload)) {
				payloadsToKeep.push(rtxPayload);
			}
		});
		
		// 3. Filter all lines that don't belong to a payload we want to keep
		const filteredLines = lines.filter(line => {
			if (!line.startsWith('a=')) {
				return true; // Keep non 'a=' lines (like m=, c=, etc.)
			}
			const match = line.match(/^a=(rtpmap|fmtp|rtcp-fb):(\d+)/);
			if (match) {
				return payloadsToKeep.includes(match[2]);
			}
			// Keep other a= lines that are not payload-specific
			return !line.match(/^a=(rtpmap|fmtp|rtcp-fb):/);
		});
		
		// 4. Reconstruct m-lines
		const finalLines = filteredLines.map(line => {
			if (line.startsWith('m=video')) {
				const parts = line.split(' ');
				const mediaInfo = parts.slice(0, 3);
				const originalPayloads = parts.slice(3);
				const keptPayloads = originalPayloads.filter(p => payloadsToKeep.includes(p));
				
				// Prioritize H.264
				const finalPayloads = [
					...h264Payloads,
					...keptPayloads.filter(p => !h264Payloads.includes(p)),
				];
				return `${mediaInfo.join(' ')} ${[...new Set(finalPayloads)].join(' ')}`;
			}
			if (line.startsWith('m=audio')) {
				const parts = line.split(' ');
				const mediaInfo = parts.slice(0, 3);
				const originalPayloads = parts.slice(3);
				const keptPayloads = originalPayloads.filter(p => payloadsToKeep.includes(p));
				
				// Prioritize Opus
				const finalPayloads = [
					...opusPayloads,
					...keptPayloads.filter(p => !opusPayloads.includes(p)),
				];
				return `${mediaInfo.join(' ')} ${[...new Set(finalPayloads)].join(' ')}`;
			}
			return line;
		});
		
		return finalLines.join('\r\n');
	}, []);
	return {setCodecPreferences};
}