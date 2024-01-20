import {ValueFormatter} from '@nivo/bar';
import {fontFamily} from './font';
import {SpringValues, animated} from '@react-spring/web';
import {ScaleValue} from '@nivo/scales';
export const nivoTheme = {text: {fontSize: 30, fontFamily}};

export const getTspanGroups = (
	value: string,
	maxLineLength: number,
	maxLines: number = 2
) => {
	const words = value.split(/[\s-]/);

	type linesAcc = {
		lines: string[];
		currLine: string;
	};

	// Reduces the words into lines of maxLineLength
	const assembleLines: linesAcc = words.reduce(
		(acc: linesAcc, word: string) => {
			// If the current line isn't empty and the word + current line is larger than the allowed line size, create a new line and update current line
			if ((word + acc.currLine).length > maxLineLength && acc.currLine !== '') {
				return {
					lines: acc.lines.concat([acc.currLine]),
					currLine: word,
				};
			}
			// Otherwise add the word to the current line
			return {
				...acc,
				currLine: acc.currLine + ' ' + word,
			};
		},
		{lines: [], currLine: ''}
	);

	// Add the ending state of current line (the last line) to lines
	const allLines = assembleLines.lines.concat([assembleLines.currLine]);

	// For now, only take first 2 lines due to tick spacing and possible overflow
	const lines = allLines.slice(0, maxLines);
	const children: JSX.Element[] = [];
	let dy = 0;

	lines.forEach((lineText, i) => {
		children.push(
			<tspan key={i} x={0} dy={dy}>
				{
					// If on the second line, and that line's length is within 3 of the max length, add ellipsis
					i === 1 && allLines.length > 2
						? lineText.slice(0, maxLineLength - 3) + '...'
						: lineText
				}
			</tspan>
		);
		// Increment dy to render next line text below
		dy += 35;
	});

	return children;
};

export interface AxisTickProps<Value extends ScaleValue> {
	tickIndex: number;
	value: Value;
	format?: ValueFormatter;
	x: number;
	y: number;
	lineX: number;
	lineY: number;
	textX: number;
	textY: number;
	textAnchor: string;
	opacity?: number;
	rotate?: number;
	animatedProps: SpringValues<{
		opacity: number;
		textTransform: string;
		transform: string;
	}>;
	truncateTickAt: number | undefined;
	onClick?: (
		event: React.MouseEvent<SVGGElement, MouseEvent>,
		value: Value | string
	) => void;
}

export const renderTick = ({
	animatedProps,
	textAnchor,
	value,
}: AxisTickProps<string>) => {
	return (
		<animated.g
			transform={animatedProps.transform}
			style={{opacity: animatedProps.opacity}}
		>
			<animated.text
				textAnchor={textAnchor}
				transform={animatedProps.textTransform}
				style={nivoTheme.text}
			>
				{getTspanGroups(value, 9, 2)}
			</animated.text>
		</animated.g>
	);
};
