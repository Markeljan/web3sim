"use client";

export const SmartContractUI = ({ html }: { html: string }) => {
	// biome-ignore lint/security/noDangerouslySetInnerHtml: yolo
	return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
