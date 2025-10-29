/*
 * CVA is a library that is not dependent on any particular framework, and is used to create variant based CSS logic in CSS-in-TS or CSS-in-JS environments.
 * It works alongside the layered structure of TailwindCSS (@base, @components, @utilities, @theme) to give styles separation.
 * CVA adds clarity, rules, and organization to CSS, which results in styles that are much more maintainable, scalable, and consistent.
 * Docs -> https://cva.style/docs/getting-started/typescript
 */

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../../lib/utils";

// Root: Defines Variant Structure
const buttonVariants = cva(
	// Section: Base values , these always apply . Commonly just layout styles goes here
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			/*
            Sub-Section : define types of `varients`, varient naming is custom and done in lowercase,singular format but first one being `variant` is a convention.
			Other \/ `varients` can be 
            \/ varient -> color and animations -> default, outline, ghost
            \/ state   -> interactive logic    -> active, inactive
			\/ shape   -> geometry             -> rounded, square, pill
            \/ size    -> layout               -> default, sm, lg
            */
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline:
					"border border-input bg-background hover:bg-secondary hover:text-secondary-foreground",
				ghost: "hover:bg-secondary hover:text-secondary-foreground",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
			},
		},
		// defaultVariants is builtin and necessary to define varients
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

/*
    limit and assign some restrictions to our Button Component by combining some types 
    that include std:html button types and our custom button varients via VarientProps
    now typescript will understand it's a button and our varients
*/
interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
	return (
		<button
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
};

export { Button };
