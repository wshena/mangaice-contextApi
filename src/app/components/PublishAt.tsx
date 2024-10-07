import React from "react";
import { ClockIcon } from "../utils/Icon";

const PublishAt = ({ publishAt }: any) => {
	const publishDate = new Date(publishAt);
	const currentDate = new Date();
	const diffTime = Math.abs(currentDate.getTime() - publishDate.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	let timeAgo = `${diffDays} days ago`;

	if (diffDays > 365) {
		const years = Math.floor(diffDays / 365);
		timeAgo = `${years} years ago`;
	} else if (diffDays > 30) {
		const months = Math.floor(diffDays / 30);
		timeAgo = `${months} month ago`;
	}

	return (
		<h3 className="flex gap-[5px] items-center text-[.8rem]">
			<ClockIcon size={18} className='text-color' />
			<span>{timeAgo ? timeAgo : 'Unknown'}</span>
		</h3>
	);
};

export default PublishAt;