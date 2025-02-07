import React from 'react';

export type RenderProps<Args extends {}> =
	| ((args: Args) => React.ReactNode | undefined)
	| React.PropsWithChildren<any>;

export type DynamicClassName<Args extends {}> =
	| ((args: Args) => string)
	| string;

export type WithDynamicClassName<Props, Args extends {}> = (Props extends {
	className?: string;
}
	? Omit<Props, 'className'>
	: Props) & {
	className?: DynamicClassName<Args>;
};

export type DivProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;

export type ButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export type InputProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

export type TextareaProps = React.DetailedHTMLProps<
	React.TextareaHTMLAttributes<HTMLTextAreaElement>,
	HTMLTextAreaElement
>;

export type LinkProps = React.DetailedHTMLProps<
	React.AnchorHTMLAttributes<HTMLAnchorElement>,
	HTMLAnchorElement
>;

export type HeadingProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLHeadingElement>,
	HTMLHeadingElement
>;

export type ParagraphProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLParagraphElement>,
	HTMLParagraphElement
>;

export type UListProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLUListElement>,
	HTMLUListElement
>;

export type OListProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLOListElement>,
	HTMLOListElement
>;

export type LiProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLLIElement>,
	HTMLLIElement
>;

export type TableProps = React.DetailedHTMLProps<
	React.TableHTMLAttributes<HTMLTableElement>,
	HTMLTableElement
>;

export type TableBodyProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLElement>,
	HTMLElement
>;

export type TableHeaderProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLElement>,
	HTMLElement
>;

export type TableRowProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLTableRowElement>,
	HTMLTableRowElement
>;

export type TableCellProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLTableCellElement>,
	HTMLTableCellElement
>;

export type THeadProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLTableCellElement>,
	HTMLTableCellElement
>;

export type SpanProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLSpanElement>,
	HTMLSpanElement
>;

export type ImgProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLImageElement>,
	HTMLImageElement
>;

export type SvgProps = React.SVGProps<SVGSVGElement>;

export type GenericHTMLProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLElement>,
	HTMLElement
>;
