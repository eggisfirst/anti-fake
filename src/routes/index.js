import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Loadable from 'react-loadable'

const MyLoadingComponent = ({isLoading, error}) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>
  }
  else {
    return null;
  }
}

const [AsyncIndex,AsyncCalia,AsyncKaisha] = [
  Loadable({
    loader: () => import ('../pages/index'),
    loading: MyLoadingComponent,
    delay:300   //默认200
  }),
  Loadable({
    loader: () => import ('../pages/calia'),
    loading: MyLoadingComponent,
    delay:300   //默认200
  }),
  Loadable({
    loader: () => import ('../pages/kaisha'),
    loading: MyLoadingComponent,
    delay:300   //默认200
  })
]



class Routes extends Component {
  render () {
    return (
      <Switch>
        <Route path="/" exact component={AsyncIndex}/>
        <Route path="/calia" exact component={AsyncCalia}/>
        <Route path="/kaisha" exact component={AsyncKaisha}/>
        
      </Switch>
    )
  }
}

export default Routes