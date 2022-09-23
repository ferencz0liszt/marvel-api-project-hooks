import {Component, ErrorInfo} from "react";

interface state {
    error: boolean
}

class ErrorBoundary extends Component<any, state> {
    state = {
        error: false
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log(error, errorInfo);
        this.setState({error: true})
    }

    render() {
        if (this.state.error) {
            return <div>Something went wrong.</div>
        } else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;