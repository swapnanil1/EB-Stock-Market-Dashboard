import type * as React from "react";
import { cn } from "../../lib/utils";

/* Strict type defined for jsx props.
This helps typescript understand , that these props must accept valid html.
So in future , I won't be passing any custom variables to break the component
*/
type DivProps = React.HTMLAttributes<HTMLDivElement>;
type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;

//  Root: Card Container
const Card = ({ className, ...props }: DivProps) => (
	<div
		className={cn(
			"rounded-lg border bg-card text-card-foreground shadow-sm",
			className,
		)}
		{...props}
	/>
);

// Section: Header inside card
const CardHeader = ({ className, ...props }: DivProps) => (
	<div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);

// Sub-Section: Title inside Header
const CardTitle = ({ className, ...props }: HeadingProps) => (
	<h3
		className={cn(
			"text-lg font-semibold leading-none tracking-tight",
			className,
		)}
		{...props}
	/>
);

// Section: Description inside card
const CardDescription = ({ className, ...props }: ParagraphProps) => (
	<p className={cn("text-sm text-foreground/70", className)} {...props} />
);

// Section: To add Content inside card
const CardContent = ({ className, ...props }: DivProps) => (
	<div className={cn("p-6 pt-0", className)} {...props} />
);

// Section: Footer inside card
const CardFooter = ({ className, ...props }: DivProps) => (
	<div className={cn("flex items-center p-6 pt-0", className)} {...props} />
);

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
};
