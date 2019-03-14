import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import NoMatch from '../../pages/Nomatch/NoMatch';

const withLoaderAndMessage = (WrappedComponent) => {
  class HigherOrderComponent extends React.Component {
    state = {};

    render() {
      const { loading, dataLength, page } = this.props;
      HigherOrderComponent.propTypes = {
        loading: PropTypes.bool,
        dataLength: PropTypes.string,
        page: PropTypes.string,
      };
      HigherOrderComponent.defaultProps = {
        loading: false,
        dataLength: '',
        page: '0',
      };

      if (!loading && dataLength) {
        return <WrappedComponent {...this.props} />;
      }
      if (loading) {
        return (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress />
          </div>
        );
      }

      if (!page) {
        return <NoMatch />;
      }
      return <WrappedComponent {...this.props} />;
    }
  }

  return HigherOrderComponent;
};

export default withLoaderAndMessage;
