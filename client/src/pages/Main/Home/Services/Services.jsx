import React, { useEffect, useState } from 'react'
import { getAllServices } from '../../../../api/requests';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import serviceStyle from '../../../../style/services.module.css'

const Services = () => {
    const theme = useTheme();
    const [services, setServices] = useState([]);
    useEffect(() => {
        getAllServices().then((res) => {
            setServices(res.data)
        })
    }, [])
    return (
        <section className={serviceStyle.service_container}>
            <article>
                <h1 className={serviceStyle.service_title}>Services We Provide</h1>

                <div className={serviceStyle.service_img_container}>
                <img  className={serviceStyle.service_img} src='http://www.nicdarkthemes.com/themes/food/wp/demo/sweet-cake/wp-content/uploads/sites/2/2019/04/divider-services1200-1024x44.png'/>
                </div>

            </article>

           
                <Grid container spacing={2} style={{ padding: '50px 40px' }}>
                    {services && services.map((service) => {
                        return (
                            <Grid item sm={6} xs={12} md={4}>
                                <Card sx={{ display: 'flex', alignItems:'center' }} style={{border:'none', boxShadow:'none'}}>
                                <CardMedia
                                        component="img"
                                        
                                        image={service.image}
                                        style={{width:'100px', height:'100px'}}
                                        alt="Live from space album cover"
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography component="div" variant="h5" style={{fontFamily:'Lobster',color: '#7e7e7e'}}>
                                               {service.title}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div" className={serviceStyle.service_card_description}>
                                               {service.description}
                                            </Typography>
                                        </CardContent>
                                        
                                    </Box>
                                  
                                </Card>
                            </Grid>
                        )
                    })}

                </Grid>
            
        </section>
    )
}

export default Services