import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReqfiles } from "../../../API/ReqFiles";
import { queryClient } from "../../../../queryClient";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";

export const ReqfilesShower: React.FC = () => {
	const token = localStorage.getItem("token");
	const reqPdfQuery = useQuery(
		{
			queryFn: () => getReqfiles({ token }),
			queryKey: ["reqpdf"],
		},
		queryClient,
	);

	const [pdfUrl, setPdfUrl] = useState<string | null>(null);

	useEffect(() => {
		if (reqPdfQuery.data && reqPdfQuery.data.length > 0) {
			const firstPdf = reqPdfQuery.data.find((file) =>
				file.url?.endsWith(".pdf"),
			);
			if (firstPdf) {
				setPdfUrl(firstPdf.url);
			}
		}
	}, [reqPdfQuery.data]);

	const styles = {
		container: {
			height: "600px",
			width: "100%",
		},
	};

	if (reqPdfQuery.isLoading) return <p>Loading...</p>;
	if (reqPdfQuery.error) return <p>Error loading PDF files.</p>;

	return (
		<div className="reqfiles__content">
			<h1 className="sections__title reqfiles__title">Reqfiles</h1>
			{pdfUrl ? (
				<div style={styles.container}>
					<Worker
						workerUrl={`https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.js`}
					>
						<Viewer fileUrl={pdfUrl} />
					</Worker>
				</div>
			) : (
				<p>No PDF available</p>
			)}
		</div>
	);
};
