import React from 'react';
import { LoadingConsumer } from '../../context/Loading.context';

const Loading = () => (
    <LoadingConsumer>
    <div className="loading">
        <div className="container-fluid h-100">
            <div className="row align-items-center h-100">
                <div className="col-12">
                    <div className="spinner"></div>
                </div>
            </div>
        </div>
    </div>
    </LoadingConsumer>
);

export default Loading; 