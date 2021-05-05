import React from 'react';
import cx from 'classnames';

import './styles.css';

const Page = props => {
  return (
    <div className="container">
      <div className={cx("Page", props.className)}>{props.children}</div>
    </div>
  );
};

export default Page;
