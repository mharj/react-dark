# react-dark

Dark Mode context API based on prefers-color-scheme 

## Install
```powershell
npm i mharj-react-dark
```

## Provider setup

```JSX
ReactDOM.render(
	<DarkModeProvider>
		<App />
	</DarkModeProvider>,
	document.getElementById('root'),
);
```

Provider can have initialValue={true/false} attribute

## usage as HOC

### use direct DarkModeConsumer, or

### withDarkMode wrapper

```JSX
class SomeComponent extends React.Component<IWithDarkMode> {
	public render() {
		return <>Dark Mode: {this.props.isDarkMode ? 'true' : 'false'}</>;
	}
}

export default withDarkMode(App);
```

## usage as Hook
### useDarkMode

```JSX
export const SomeComponent: React.FC = () => {
	const {isDarkMode} = useDarkMode();
	return <>Dark Mode: {isDarkMode ? 'true' : 'false'}</>;
};
```
