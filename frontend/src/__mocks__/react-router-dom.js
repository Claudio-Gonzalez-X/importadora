import React from 'react';
const rrd = require('react-router-dom');

module.exports = {
  ...rrd,
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: () => null,
  Link: ({ children }) => <a href="#">{children}</a>,
  useNavigate: () => jest.fn(),
};