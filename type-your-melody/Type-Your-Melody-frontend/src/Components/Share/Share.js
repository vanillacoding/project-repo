import React from 'react';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  EmailShareButton,
} from 'react-share';

import {
  FacebookIcon,
  GooglePlusIcon,
  TwitterIcon,
  EmailIcon,
} from 'react-share';

export default function Share (props) {
  return (
    <div className="Share">
      <FacebookShareButton url={props.url}>
        <FacebookIcon size={48} />
      </FacebookShareButton>
      <GooglePlusShareButton url={props.url}>
        <GooglePlusIcon size={48} />
      </GooglePlusShareButton>
      <TwitterShareButton url={props.url}>
        <TwitterIcon size={48} />
      </TwitterShareButton>
      <EmailShareButton url={props.url}>
        <EmailIcon size={48}/>
      </EmailShareButton>
    </div>
  );
}
