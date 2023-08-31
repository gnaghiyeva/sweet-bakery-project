import React from 'react'
import Sliders from './Sliders/Sliders'
import Services from './Services/Services'
import Counts from './Counts/Counts'
import Works from './Works/Works'
import Prices from './Prices/Prices'
import Team from './Team/Team'
import Skills from './Skills/Skills'
import Follow from './Follow/Follow'
import Contact from './Contact/Contact'
import { Helmet } from 'react-helmet'
import favicon from '../../../assets/favicon-logo.png'
const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>

      <Sliders />
      <Services />
      <Counts />
      <Works />
      <Prices />
      <Team />
      <Skills />
      <Follow />
      <Contact />
    </>
  )
}

export default Home