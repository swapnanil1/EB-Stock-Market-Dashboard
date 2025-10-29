import type * as React from "react";
import { cn } from "../../lib/utils";

// Reusable prop types for table elements
type TableProps = React.HTMLAttributes<HTMLTableElement>; // id,style,title
type TableSectionProps = React.HTMLAttributes<HTMLTableSectionElement>; // thead, tbody, tfoot
type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>; // tr
type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>; // td
type TableHeaderCellProps = React.ThHTMLAttributes<HTMLTableCellElement>; // th
type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>; // caption

const Table = ({ className, ...props }: TableProps) => (
	<div className="relative w-full overflow-auto">
		<table
			className={cn("w-full caption-bottom text-sm", className)}
			{...props}
		/>
	</div>
);

const TableHeader = ({ className, ...props }: TableSectionProps) => (
	<thead className={cn("[&_tr]:border-b", className)} {...props} />
);

const TableBody = ({ className, ...props }: TableSectionProps) => (
	<tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
);

const TableFooter = ({ className, ...props }: TableSectionProps) => (
	<tfoot
		className={cn("border-t bg-secondary/50 font-medium", className)}
		{...props}
	/>
);

const TableRow = ({ className, ...props }: TableRowProps) => (
	<tr
		className={cn(
			"border-b transition-colors hover:bg-secondary/50 data-[state=selected]:bg-secondary",
			className,
		)}
		{...props}
	/>
);

const TableHead = ({ className, ...props }: TableHeaderCellProps) => (
	<th
		className={cn(
			"h-12 px-4 text-left align-middle font-medium text-foreground/70",
			"[&:has([role=checkbox])]:pr-0",
			className,
		)}
		{...props}
	/>
);

const TableCell = ({ className, ...props }: TableCellProps) => (
	<td
		className={cn(
			"p-4 align-middle",
			"[&:has([role=checkbox])]:pr-0",
			className,
		)}
		{...props}
	/>
);

const TableCaption = ({ className, ...props }: TableCaptionProps) => (
	<caption
		className={cn("mt-4 text-sm text-foreground/70", className)}
		{...props}
	/>
);

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
};
