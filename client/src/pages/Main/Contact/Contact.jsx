import React from 'react'
import ContactSlider from './ContactSlider'
import ContactData from './ContactData'
import favicon from '../../../assets/favicon-logo.png'
import { Helmet } from 'react-helmet'
const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>

      <ContactSlider />
      <ContactData />
    </>
  )
}

export default Contact