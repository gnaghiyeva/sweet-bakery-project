import React, { useEffect, useState } from 'react'
import { getAllWorks } from '../../../../api/requests';
import { Grid } from '@mui/material';
import workStyle from '../../../../style/works.module.css'
import Card from 'react-bootstrap/Card';
const Works = () => {
    const [works, setWorks] = useState([]);
    useEffect(() => {
        getAllWorks().then((res) => {
            setWorks(res.data)
        })
    }, [])
    return (
        <section className={workStyle.works_container}>
            <article>
                <h1 className={workStyle.works_title}>Our Works</h1>
                <div className={workStyle.works_img_container}>
                    <img className={workStyle.works_img} src='http://www.nicdarkthemes.com/themes/food/wp/demo/sweet-cake/wp-content/uploads/sites/2/2019/04/divider-works1200-1024x33.png' alt='workimage' />
                </div>
            </article>

            <Grid container spacing={2} style={{ padding: '50px 60px' }}>
                {works && works.map((work) => {
                    return (
                        <Grid item sm={6} xs={12} md={4} lg={3}>
                            <Card >
                                <div className={workStyle.works_card}>
                                <Card.Img className={workStyle.card_image} variant="top" src={work.image} />
                                </div>

                              
                                <Card.Body>
                                    <Card.Title className={workStyle.works_card_title}>{work.title}</Card.Title>
                                    <Card.Text className={workStyle.works_card_description}>
                                        {work.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>

        </section>
    )
}

export default Works