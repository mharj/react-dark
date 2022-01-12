import React, {useContext} from 'react';

export interface WithDarkMode {
	isDarkMode: boolean | undefined;
}

interface IProps {
	children: React.ReactNode;
	initialValue?: boolean;
}

const initialContext: WithDarkMode = {
	isDarkMode: undefined,
};

const Context = React.createContext(initialContext);

export const DarkModeConsumer = Context.Consumer;

export function withDarkMode(WrappedComponent: typeof React.Component) {
	return function Wrapper(props: unknown) {
		return <DarkModeConsumer>{(value) => <WrappedComponent {...props} {...value} />}</DarkModeConsumer>;
	};
}

export function useDarkMode() {
	return useContext(Context);
}

export class DarkModeProvider extends React.Component<IProps, WithDarkMode> {
	constructor(props: IProps) {
		super(props);
		this.state = props.initialValue === undefined ? initialContext : {isDarkMode: props.initialValue};
	}

	public componentDidMount() {
		if (window && window.matchMedia) {
			const isDark = window.matchMedia('(prefers-color-scheme: dark)');
			if (isDark.matches) {
				this.setState({isDarkMode: true});
			}
			isDark.addEventListener('change', (e) => {
				if (e.matches) {
					this.setState({isDarkMode: true});
				}
			});
			const isLight = window.matchMedia('(prefers-color-scheme: light)');
			if (isLight.matches) {
				this.setState({isDarkMode: false});
			}
			isLight.addEventListener('change', (e) => {
				if (e.matches) {
					this.setState({isDarkMode: false});
				}
			});
		}
	}

	public render() {
		const contextValue: WithDarkMode = {
			isDarkMode: this.state.isDarkMode,
		};
		return <Context.Provider value={contextValue}>{this.props.children}</Context.Provider>;
	}
}
