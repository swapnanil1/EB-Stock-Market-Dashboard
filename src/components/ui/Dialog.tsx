// src/components/ui/Dialog.tsx

import type * as React from "react";
import { useEffect } from "react";
import { cn } from "../../lib/utils";

interface DialogProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	className?: string;
}

export const Dialog = ({
	isOpen,
	onClose,
	children,
	className,
}: DialogProps) => {
	// --- FIX for Keyboard Navigation ---
	// Add an effect to listen for the "Escape" key
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};
		// Add the event listener when the dialog is open
		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown);
		}
		// Clean up the event listener when the component unmounts or closes
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, onClose]); // Rerun this effect if isOpen or onClose changes

	if (!isOpen) {
		return null;
	}

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			role="dialog"
			aria-modal="true"
			tabIndex={-1} // allow keyboard focus
			className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
			onClick={handleOverlayClick}
			onKeyUp={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					onClose();
				}
			}}
		>
			<div
				className={cn(
					"relative w-full max-w-lg max-h-[90vh] overflow-auto rounded-lg border bg-background p-2 shadow-lg",
					className,
				)}
			>
				<button
					onClick={onClose}
					className="absolute top-2 right-3 p-1 rounded-full text-foreground/70 hover:bg-secondary"
					aria-label="Close dialog"
					type="button"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="h-8 w-8"
					>
						<title>Close</title>
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
					</svg>
				</button>

				{children}
			</div>
		</div>
	);
};
