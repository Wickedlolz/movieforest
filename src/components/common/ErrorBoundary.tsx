import React, { Component } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

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
            return (
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="red"
                            gutterBottom
                            style={{ fontWeight: 700 }}
                        >
                            404
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            Something went wrong, try to reaload page.
                        </Typography>
                    </Container>
                </Box>
            );
        }

        return this.props.children;
    }
}
