import React from 'react';
import { withRouter } from 'react-router-dom';
import ErrorBox from './ErrorBox';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorBox message="알 수 없는 에러가 발생했습니다." />;
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
