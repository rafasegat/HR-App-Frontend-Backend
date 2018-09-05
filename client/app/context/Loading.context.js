import React from 'react';

export const LoadingContext = React.createContext();

class LoadingProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: false
    };
  }

  hide = () => {
    this.setState({
        isLoading: false
    });
    console.log('hide')
  }

  show = () => {
    this.setState({
        isLoading: true
    });
    console.log('show')
  }

  render() {
    const {
        isLoading
    } = this.state;

    return (
      <LoadingContext.Provider 
      value={{ 
        show: this.show,
        hide: this.hide
      }}>
        <div className="loading">
            <div className="container-fluid h-100">
                <div className="row align-items-center h-100">
                    <div className="col-12">
                        <div className="spinner"></div>
                    </div>
                </div>
            </div>
        </div>
        {this.props.children}
      </LoadingContext.Provider>
    );
  }
}

export default LoadingProvider;

export const LoadingConsumer = LoadingContext.Consumer;