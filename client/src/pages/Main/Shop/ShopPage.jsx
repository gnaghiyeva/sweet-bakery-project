import React from 'react'
import Products from './Products'
import ShopSlider from './ShopSlider'
import { Helmet } from 'react-helmet'
import favicon from '../../../assets/favicon-logo.png'
const ShopPage = () => {
  return (
    <>
      <Helmet>
        <title>Shop</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>

      <ShopSlider />
      <Products />
    </>
  )
}

export default ShopPage