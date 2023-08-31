import React, { useEffect, useState } from 'react'
import { getAllPrices } from '../../../../api/requests';
import pricesStyle from '../../../../style/prices.module.css'
import { Grid } from '@mui/material';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const Prices = () => {
    const [prices, setPrices] = useState([]);
    useEffect(() => {
        getAllPrices().then((res) => {
            setPrices(res.data)
        })
    }, [])
    return (
        <section className={pricesStyle.prices_section}>
            <article>
                <h1 className={pricesStyle.prices_title}>Our Prices</h1>

                <div className={pricesStyle.prices_img_container}>
                    <img className={pricesStyle.prices_img} src='http://www.nicdarkthemes.com/themes/food/wp/demo/sweet-cake/wp-content/uploads/sites/2/2019/04/divider-price1200-1024x26.png' alt='priceImage' />
                </div>

            </article>

            <Grid container spacing={4} style={{ padding: '50px 40px' }}>
                {prices && prices.map((price) => {
                    return (
                        <Grid item sm={6} xs={12} md={3} style={{padding:'40px 5px'}}>
                            <Card >
                                <div className={pricesStyle.prices_card_img_container}>
                                <Card.Img className={pricesStyle.prices_card_img} variant="top" src={price.image} />
                                </div>
                                <Card.Body>
                                    <Card.Title>{price.title}</Card.Title>

                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item className={pricesStyle.prices_card_title_container}>
                                       <article className={pricesStyle.prices_card_title}>
                                            <h5 style={{fontSize:'25px'}}>${price.price} - </h5>
                                            <h5>{price.name}</h5>
                                       </article>
                                    </ListGroup.Item>
                                    <ListGroup.Item className={pricesStyle.prices_card_list}>{price.description}</ListGroup.Item>
                                    <ListGroup.Item className={pricesStyle.prices_card_list}>{price.description}</ListGroup.Item>
                                    <ListGroup.Item className={pricesStyle.prices_card_list}>{price.description}</ListGroup.Item>
                                </ListGroup>
                                <Card.Body style={{textAlign:'center'}}>
                                    <button style={{backgroundColor:price.color, padding:'10px 35px', border:'none', color:'white', borderRadius:'5px', fontFamily:'Lobster'}}>View More</button>
                                </Card.Body>
                            </Card>
                        </Grid>
                    )
                })}

            </Grid>
        </section>
    )
}

export default Prices