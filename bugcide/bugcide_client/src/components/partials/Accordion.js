import React, { useState } from 'react';
import moment from 'moment';

const Accordion = ({ errorItem }) => {
  const {
    created_at: createdAt,
    duplicate_count: duplicateCount,
    name,
    message,
    filename,
    lineno,
    colno,
    stack
  } = errorItem;
  const [ isAccordionOpen, setAccordion ] = useState(false);
  const handleAccordion = () => {
    setAccordion(!isAccordionOpen);
  };

  return (
    <li className="time-list">
      <div className="accordion-parent">
        <div className="error-time">
          <div>
            {moment(createdAt).format('YYYY.MM.DD')}
          </div>
          <div>
            {moment(createdAt).format('hh:mm a')}
          </div>
        </div>
        <div className="error-info">
          <ul className="error-title">
            <li>
              <span className="badge">
                {duplicateCount || 1}
              </span>
              <span className="title">
                {name}
              </span>
            </li>
            <li className="message">
              {message}
            </li>
          </ul>
          {(lineno || colno || filename) && (
            <ul className="error-source">
              {lineno && (
                <li className="lineno">
                  Line: {lineno}:{colno}
                </li>
              )}
              {!!filename && (
                <li className="filename">
                  {filename.replace('?', '')}
                </li>
              )}
            </ul>
          )}
        </div>
        <ul className="search-icons">
          <li>
            <a
              href={`https://stackoverflow.com/search?q=${message}`}
              target="_blank"
              className="link-search stackoverflow"
              title="Search on Stackoverflow"
              rel="noopener noreferrer"
            >
            </a>
          </li>
          <li>
            <a
              href={`https://www.google.com/search?q=${message}`}
              target="_blank"
              className="link-search google"
              title="Search on Google"
              rel="noopener noreferrer"
            >
            </a>
          </li>
        </ul>
        <div className="btn-box">
          <button
            type="button"
            className={isAccordionOpen ? "btn-more up" : "btn-more"}
            onClick={handleAccordion}
          >
          </button>
        </div>
      </div>
      {isAccordionOpen && (
        <div className="accordion-child">
          <div className="error-stack">
            <pre>
              {stack}
            </pre>
          </div>
        </div>
      )}
    </li>
  );
};

export default Accordion;
