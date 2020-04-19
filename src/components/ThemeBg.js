import React, { Component } from 'react'
 
import BackgroundSlideshow from 'react-background-slideshow'
 
import red from '../assets/red.png'
import black from '../assets/black.png'
import white from '../assets/white.png'

import a from '../assets/a.jpg'
import b from '../assets/b.jpg'
// import c from '../assets/c.jpg'
// import d from '../assets/d.jpg'
// import e from '../assets/e.jpg'
 
export default class App extends Component {
  render () {
    return (
      <BackgroundSlideshow disableClick animationDelay={1000} images={[ a, b ]}  />
    )
  }
}