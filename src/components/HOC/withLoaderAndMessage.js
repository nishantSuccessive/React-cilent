import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const withLoaderAndMessage = WrappedComponent => {
  class HOC extends React.Component {
    state = {};

    render() {
      const { loading, dataLength, page } = this.props;
      if (!loading && dataLength ) {
        return <WrappedComponent {...this.props} />;
      }
      if (loading) {
        return (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        );
      }

        if(!page) {
      return <p>OOPS!, No More Trainees</p>;
        }
        return <WrappedComponent {...this.props} />;

    }
  }

  return HOC;
};

export default withLoaderAndMessage;
