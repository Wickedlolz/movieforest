import React, { Component } from 'react';

interface IState {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        return {
            hasError: true,
        };
    }

    componentDidCatch(error: any) {
        console.log('Error from ComponentDidCatch: ', error);
    }

    render() {
        if (this.state.hasError) {
            return <div>ErrorBoundary</div>;
        }

        return this.props.children;
    }
}
