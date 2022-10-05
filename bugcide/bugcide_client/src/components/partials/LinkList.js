import React from 'react';

const LinkList = () => {
  return (
    <ul className="link-icon-box">
      <li>
        <a
          href="https://github.com/jy7123943/bugcide_npm_package"
          target="_blank"
          rel="noopener noreferrer"
          className="github"
        >
          <span className="sr-only">Github</span>
        </a>
      </li>
      <li>
        <a
          href="https://www.npmjs.com/package/bugcide"
          target="_blank"
          rel="noopener noreferrer"
          className="npm"
        >
          <span className="sr-only">NPM Package</span>
        </a>
      </li>
      <li>
        <a
          href="https://www.npmjs.com/package/bugcide-webpack-plugin"
          target="_blank"
          rel="noopener noreferrer"
          className="webpack"
        >
          <span className="sr-only">Webpack Plugin</span>
        </a>
      </li>
    </ul>
  );
};

export default LinkList;
