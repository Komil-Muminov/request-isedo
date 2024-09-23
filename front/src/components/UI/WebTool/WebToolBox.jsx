import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import "./WebToolBox.css";

const container = {
	hidden: { opacity: 0, scale: 0.5 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.2,
			staggerChildren: 0.1,
		},
	},
};

const item = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
};

const MotionDiv = motion.div;

const WebToolBox = () => {
	const [showTool, setShowTool] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const handleShowTool = () => {
		setShowTool(!showTool);
	};

	return (
		<>
			<div
				onClick={handleShowTool}
				className={`wrapper-webtoolbox ${showTool ? "hidden" : ""}`}
			>
				<IconButton className="icon-button">
					<AddOutlinedIcon className="icon" />
				</IconButton>
			</div>
			<AnimatePresence>
				{showTool && (
					<MotionDiv
						className="web-toolbox-container"
						variants={container}
						initial="hidden"
						animate="visible"
						exit="hidden"
						drag
						dragConstraints={{
							top: 0,
							left: 0,
							right: window.innerWidth - 100,
							bottom: window.innerHeight - 100,
						}}
						onDragEnd={(event, info) => {
							setPosition({
								x: info.point.x,
								y: info.point.y,
							});
						}}
						style={{ x: position.x, y: position.y }}
					>
						<div className="icon-circle">
							{/* Иконки по кругу */}
							<div className="icon-item facebook">
								<IconButton className="icon-button-custom">
									<FacebookOutlinedIcon className="icon" />
								</IconButton>
							</div>
							<div className="icon-item twitter">
								<IconButton className="icon-button-custom">
									<TwitterIcon className="icon" />
								</IconButton>
							</div>
							<div className="icon-item instagram">
								<IconButton className="icon-button-custom">
									<InstagramIcon className="icon" />
								</IconButton>
							</div>
							<div className="icon-item linkedin">
								<IconButton className="icon-button-custom">
									<LinkedInIcon className="icon" />
								</IconButton>
							</div>
							{/* Кнопка в центре */}
							<div className="center-icon">
								<IconButton
									onClick={handleShowTool}
									className="icon-button-custom"
								>
									<RemoveOutlinedIcon className="icon" />
								</IconButton>
							</div>
						</div>
					</MotionDiv>
				)}
			</AnimatePresence>
		</>
	);
};

export default WebToolBox;
