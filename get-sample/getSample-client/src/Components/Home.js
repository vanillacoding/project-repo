import React from 'react';
import './Home.scss';
import './Common.scss';
import SearchIcon from '@material-ui/icons/Search';

function Home(props) {
  console.log(props);
  const {
    selected,
    onRadioChange,
    onCheckboxChange,
    onTextChange,
    onVideoSearchSubmit,
    history,
  } = props;
  console.log('history', history);

  return (
    <div className="Home">
      <div className="headline">Search words, Enjoy reality</div>

      <form
        className="search-form"
        onSubmit={ev => {
          onVideoSearchSubmit(ev);
          history.push('/videos');
        }}
      >
        <div className="input-search-container">
          <div className="input-search-wrapper">
            <SearchIcon className="search-icon" />
            <input
              onChange={ev => {
                onTextChange(ev);
              }}
              className="input-search"
              type="text"
              tabIndex="1"
            />
          </div>
          <input className="input-search-submit" type="submit" />
        </div>

        <div className="search-option-list-container">
          <div className="search-option-list language-wrapper">
            <h1 className="selection-title">LANGUAGE</h1>
            <div className="list language-list">
              <label>
                <input
                  onChange={ev => {
                    onRadioChange(ev);
                  }}
                  type="radio"
                  id="ENGLISH"
                  value="en"
                  name="language"
                  checked={'en' === selected.language}
                />
                <span>ENGLISH</span>
              </label>
              <label>
                <input
                  onChange={ev => {
                    onRadioChange(ev);
                  }}
                  type="radio"
                  id="korean"
                  value="ko"
                  name="language"
                  checked={'ko' === selected.language}
                />
                <span>KOREAN</span>
              </label>

              <label>
                <input
                  onChange={ev => {
                    onRadioChange(ev);
                  }}
                  type="radio"
                  id="arabic"
                  value="ar"
                  name="language"
                  checked={'ar' === selected.language}
                />
                <span>ARABIC</span>
              </label>
            </div>
          </div>

          <div className="search-option-list categories-wrapper">
            <h1 className="selection-title">CATEGORIES - 3 Selections Only</h1>
            <div className="list categories-list">
              <label>
                <input
                  onChange={ev => {
                    onCheckboxChange(ev, 'CATEGORY');
                  }}
                  type="checkbox"
                  id="comedy"
                  value="comedy"
                  name="category"
                  checked={selected.categories.includes('comedy')}
                />
                <span>COMEDY</span>
              </label>
              <label>
                <input
                  onChange={ev => {
                    onCheckboxChange(ev, 'CATEGORY');
                  }}
                  type="checkbox"
                  id="film"
                  value="film"
                  name="category"
                  checked={selected.categories.includes('film')}
                />
                <span>FILM</span>
              </label>
              <label>
                <input
                  onChange={ev => {
                    onCheckboxChange(ev, 'CATEGORY');
                  }}
                  type="checkbox"
                  id="entertainment"
                  value="entertainment"
                  name="category"
                  checked={selected.categories.includes('entertainment')}
                />
                <span>ENTER</span>
              </label>
              <label>
                <input
                  onChange={ev => {
                    onCheckboxChange(ev, 'CATEGORY');
                  }}
                  type="checkbox"
                  id="tech"
                  value="tech"
                  name="category"
                  checked={selected.categories.includes('tech')}
                />
                <span>TECH</span>
              </label>

              <label>
                <input
                  onChange={ev => {
                    onCheckboxChange(ev, 'CATEGORY');
                  }}
                  type="checkbox"
                  id="talk"
                  value="talk"
                  name="category"
                  checked={selected.categories.includes('talk')}
                />
                <span>TALK</span>
              </label>
            </div>
          </div>

          {/* Will be updated
          <div className="search-option-list recommendation-wrapper">
            <h1>RECOMMENDATION</h1>
            <ul className="list recommendation-list">
              <li>NEWS</li>
              <li>LECTURE</li>
              <li>DOCUMENTARY</li>
              <li>VLOG</li>
              <li>ENTERTANINMENT</li>
              <li>TEENAGERS</li>
              <li>KIDS</li>
              <li>ADVERTISEMENT</li>
              <li>GAMES</li>
            </ul>
          </div> */}
        </div>
      </form>

      {/* Will be updated
      <div>Add Channels for Video Search</div>
      <form
        className="search-form"
        onSubmit={ev => {
          onChannelSearchSubmit(ev);
        }}
      >
        <div className="input-search-wrapper">
          <input
            onChange={ev => {
              onTextChange(ev);
            }}
            className="input-search"
            placeholder="Search"
            type="text"
          />
          <input className="input-search" type="submit" />
        </div>
      </form> */}

      {/* <!-- video controller --> */}
      <div className="video-background-container">
        <div className="video-cover"></div>
        <iframe
          title={'video-controller'}
          src={'https://www.youtube.com/embed/Oa7BvzZZP0g?autoplay=1&loop=1&controls=0&disablekb=0&start=4&iv_load_policy=3&ref=0&mute=1'}
          frameBorder="0"
          allow="autoplay"
        ></iframe>
      </div>
    </div>
  );
}

export default Home;
