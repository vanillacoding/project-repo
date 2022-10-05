import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from '../containers/App';
import Login from '../containers/Login';
import ChooseCategory from '../containers/ChooseCategory';
import Writing from '../containers/Writing';
import BookSearch from '../containers/BookSearch';
import Library from '../containers/Library';
import Bookmarks from '../containers/Bookmarks';
import AttachingImage from '../containers/AttachingImage';
import TextDetection from '../containers/TextDetection';
import CommentsModal from '../containers/CommentsModal';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/choose-category' component={ChooseCategory} />
        <Route exact path='/writing' component={Writing} />
        <Route exact path='/writing/book-search' component={BookSearch} />
        <Route exact path='/library' component={Library} />
        <Route exact path='/bookmarks' component={Bookmarks} />
        <Route exact path='/writing/attaching-image' component={AttachingImage} />
        <Route exact path='/writing/attaching-image/text-detection' component={TextDetection} />
        <Route exact path='/comments' component={CommentsModal} />
      </Switch>
    </Router>
  );
}

export default Routes
