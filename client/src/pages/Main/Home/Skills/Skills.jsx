import React, { useEffect, useState } from 'react'
import skillStyle from '../../../../style/skills.module.css'
import { getAllSkills } from '../../../../api/requests';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ProgressBar from 'react-bootstrap/ProgressBar';
const Skills = () => {
    const [skills, setSkills] = useState([]);
    useEffect(() => {
        getAllSkills().then((res) => {
            setSkills(res.data)
        })
    }, [])
    return (
        <section className={skillStyle.skill_container}>
            <article>
                <h1 className={skillStyle.skill_title}>Our Skills</h1>
                <div className={skillStyle.skill_img_container}>
                    <img className={skillStyle.skill_img} src='http://www.nicdarkthemes.com/themes/food/wp/demo/sweet-cake/wp-content/uploads/sites/2/2019/04/divider-skill1200-1024x44.png' />
                </div>
            </article>

            <Grid container  >
                
            <Grid item sm={12} xs={12} md={6} style={{padding:'0 90px'}} >
                   {skills && skills.map((skill)=>{
                    return (
                        
                        <Card sx={{ display: 'flex', alignItems:'center' }} style={{backgroundColor:'transparent', border:'none', boxShadow:'none'}}>
                                <CardMedia
                                        component="img"
                                        
                                        image={skill.image}
                                        style={{width:'100px', height:'100px'}}
                                        alt="Live from space album cover"
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography component="div" variant="h5" style={{fontFamily:'Lobster',color: '#7e7e7e'}}>
                                               {skill.title}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div" style={{color:'white'}}>
                                               {skill.description}
                                            </Typography>
                                        </CardContent>
                                        
                                    </Box>
                                  
                                </Card>
                               
                    )
                   })}
            </Grid>

            <Grid item sm={12} xs={12} md={6} style={{ padding: '40px 80px' }} >
                {skills && skills.map((skill)=>{
                    return (
                   <div style={{padding:'10px 0'}}>
                    <h5 style={{color:'white'}}>{skill.progressName}</h5>
                   <ProgressBar striped variant='danger'  now={skill.progressCount} />
                   </div>
                        
                    )
                })}
            </Grid>
            </Grid>
        </section>
    )
}

export default Skills