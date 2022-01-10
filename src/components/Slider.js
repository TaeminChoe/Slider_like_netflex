import React, { useEffect } from "react";
import data from "../db/data.json";
import { useState } from "react";
import ScrollCss from "../css/Slider.module.css";

export default function Slider({ show = 4, imgs = data.color }) {
	const WINDOW_WIDTH = 100; // 창의 전체 크기 비율
	const BUTTON_WIDTH = 3; // slider 양 끝의 버튼 공간 비율
	const PADDING = 1; // 버튼과 이미지 사이의 공간 비율
	const STRIDE = WINDOW_WIDTH - (BUTTON_WIDTH * 2 + PADDING);
	const IMG_SIZE =
		(WINDOW_WIDTH - (BUTTON_WIDTH * 2 + PADDING * (show + 1))) / show;

	const [transX, setTransX] = useState(BUTTON_WIDTH + PADDING);
	const [leftBtn, setLeftBtn] = useState(false);
	const [rightBtn, setRightBtn] = useState(true);
	const [page, setPage] = useState(1);

	function toRight() {
		setTransX(prev => prev - STRIDE);
		setPage(page + 1);
	}

	function toLeft() {
		setTransX(pre => pre + STRIDE);
		setPage(page - 1);
	}

	const trans = {
		transform: `translate3d(${transX}%, 0px, 0px)`,
	};

	const imgSpec = {
		width: `${IMG_SIZE}%`,
		height: "auto",
		marginRight: "1%",
		transition: "transform 450ms",
	};

	useEffect(() => {
		if (page === 1) {
			setLeftBtn(false);
			setRightBtn(true);
		} else if (page === Math.ceil(imgs.length / show)) {
			setLeftBtn(true);
			setRightBtn(false);
		} else {
			setLeftBtn(true);
			setRightBtn(true);
		}
	}, [page]);

	return (
		<div className={ScrollCss.slider}>
			<span
				className={`${ScrollCss.handle} ${ScrollCss.prev} ${
					leftBtn ? ScrollCss.active : ""
				}`}
				onClick={toLeft}
			>
				{`<`}
			</span>
			<div className={ScrollCss.sliderMask}>
				<div className={ScrollCss.sliderContents} style={trans}>
					{imgs.map(img => {
						return (
							<img key={img.id} src={img.src} style={imgSpec} />
						);
					})}
				</div>
			</div>
			<span
				className={`${ScrollCss.handle} ${ScrollCss.next} ${
					rightBtn ? ScrollCss.active : ""
				}`}
				onClick={toRight}
			>
				{`>`}
			</span>
		</div>
	);
}
