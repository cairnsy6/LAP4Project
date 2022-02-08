import React from "react";

import "@testing-library/jest-dom";

const renderWithProviders = (ui, options) =>
  render(ui, { wrapper: UnAuthedProviders, ...options });

global.renderWithProviders = renderWithProviders;
global.React = React;
