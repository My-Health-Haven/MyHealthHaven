import React from 'react';

const AppLoadingScreen = () => {
  return (
    <div className="app-loader" role="status" aria-live="polite" aria-busy="true">
      <div className="app-loader__spinner" aria-hidden="true">
        <div className="app-loader__spinner-core">
          <img className="app-loader__logo" src="/logo.png" alt="" />
        </div>
      </div>
      <p className="app-loader__text">Loading MyHealth Haven</p>
      <div className="app-loader__dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <span className="sr-only">Loading MyHealth Haven</span>
    </div>
  );
};

export default AppLoadingScreen;
