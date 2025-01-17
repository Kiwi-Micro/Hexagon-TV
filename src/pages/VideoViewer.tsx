import { useEffect, useRef, useState } from "react";
import "../assets/video.css";
import backButton from "../assets/img/backArrow.png";

interface ProductProps {
	name: string;
	videoURL: string;
	previousPage: string;
}

function VideoViewer({ name, videoURL, previousPage }: ProductProps) {
	document.title = "Hexagon TV | Watching " + name;
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [active, setActive] = useState(true);

	function formatTime(seconds: number): string {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = Math.floor(seconds % 60);

		if (hours > 0) {
			return `${hours}:${minutes
				.toString()
				.padStart(2, "0")}:${remainingSeconds
				.toString()
				.padStart(2, "0")}`;
		} else {
			return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
		}
	}

	const hideControlsDelay = 3000;
	let hideControlsTimeout: any;

	function hideControls() {
		setActive(false);
	}

	function handleMouseMove() {
		setActive(true);
		clearTimeout(hideControlsTimeout);
		hideControlsTimeout = setTimeout(hideControls, hideControlsDelay);
	}

	function playPauseVideo() {
		if (!videoRef.current) return;
		if (isPlaying) {
			videoRef.current.pause();
		} else {
			videoRef.current.play();
		}
		setIsPlaying(!isPlaying);
	}

	const handleKeyDown = (e: KeyboardEvent) => {
		if (!videoRef.current) return;
		if (e.key === "ArrowLeft") {
			videoRef.current.currentTime -= 5;
			handleMouseMove();
		} else if (e.key === "ArrowRight") {
			videoRef.current.currentTime += 5;
			handleMouseMove();
		} else if (e.key === " ") {
			playPauseVideo();
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);

		hideControlsTimeout = setTimeout(hideControls, hideControlsDelay);
		document.addEventListener("mousemove", handleMouseMove);

		return () => {
			clearTimeout(hideControlsTimeout);
			document.removeEventListener("mousemove", handleMouseMove);
			clearTimeout(hideControlsTimeout);

			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	function handleTimeUpdate() {
		if (!videoRef.current) return;
		setCurrentTime(videoRef.current.currentTime);
	}

	function handleLoadedMetadata() {
		if (!videoRef.current) return;
		setDuration(videoRef.current.duration);
	}

	function handleSeek(
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
	) {
		if (!videoRef.current) return;
		const rect = event.currentTarget.getBoundingClientRect();
		const seekTime =
			((event.clientX - rect.left) / rect.width) *
			videoRef.current.duration;
		videoRef.current.currentTime = seekTime;
		setCurrentTime(seekTime);
	}

	return (
		<div className="videoPage main">
			<div
				className="videoPageBackButtonDiv"
				style={{ display: active ? "flex" : "none" }}
				onClick={() => (window.location.href = previousPage)}
			>
				<img
					src={backButton}
					className="videoPageBackButton"
					alt="back button"
					draggable="false"
				/>
				<h3>Back</h3>
			</div>
			<video
				src={videoURL}
				className="videoPageVideo"
				ref={videoRef}
				onClick={playPauseVideo}
				onEnded={playPauseVideo}
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleLoadedMetadata}
			/>
			<div
				className="videoPageControls"
				style={{ display: active ? "flex" : "none" }}
			>
				<svg
					viewBox="0 0 100 100"
					width="32"
					height="32"
					style={{
						color: "#ffffff",
					}}
					xmlns="http://www.w3.org/2000/svg"
					onClick={playPauseVideo}
				>
					{isPlaying ? (
						<>
							<rect
								x="30"
								y="20"
								width="15"
								height="60"
								fill="currentColor"
							/>
							<rect
								x="55"
								y="20"
								width="15"
								height="60"
								fill="currentColor"
							/>
						</>
					) : (
						<polygon points="30,20 80,50 30,80" fill="currentColor" />
					)}
				</svg>
				<div
					className="playbackBarContainer"
					onClick={handleSeek}
					role="button"
					aria-label="Seek through video"
				>
					<div
						className="playbackBar"
						style={{
							width: `${(currentTime / duration) * 100 || 0}%`,
						}}
					/>
				</div>
				<p>{formatTime(currentTime)}</p>
			</div>
		</div>
	);
}

export default VideoViewer;
