import React, { useEffect, useState } from 'react'
import { getAllTeam } from '../../../../api/requests';
import teamStyle from '../../../../style/team.module.css'
import { Grid } from '@mui/material';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import FacebookLogo from '../../../../assets/logos/facebook.png'
import FlickerLogo from '../../../../assets/logos/flicker.png'
import GoogleLogo from '../../../../assets/logos/google.png'
import TwitterLogo from '../../../../assets/logos/twitter.png'
const Team = () => {
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        getAllTeam().then((res) => {
            setTeams(res.data)
        })
    }, [])
    return (

        <section className={teamStyle.team_container}>

            <article>
                <h1 className={teamStyle.team_title}>Our Team</h1>
                <div className={teamStyle.team_img_container}>
                    <img className={teamStyle.team_img} src='http://www.nicdarkthemes.com/themes/food/wp/demo/sweet-cake/wp-content/uploads/sites/2/2019/04/divider-team1200-1024x37.png' alt='teamImage' />
                </div>
            </article>

            <Grid container spacing={2} style={{ padding: '50px 100px' }}>
                {teams && teams.map((person) => {
                    return (
                        <Grid item sm={6} xs={12} md={3} style={{ padding: '40px 5px' }} >
                            <Card style={{border:'3px solid #F1F1F1'}}>
                                <div className={teamStyle.team_card_img_container} >
                                    <Card.Img className={teamStyle.team_card_img} variant="top" src={person.image} />
                                </div>
                                <Card.Body className={teamStyle.team_card_body}>
                                    <Card.Title className={teamStyle.team_card_body_title}>{person.fullname}</Card.Title>
                                    <Card.Text className={teamStyle.team_card_body_desc}>
                                        {person.description}
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                            <br/>

                            <Card >
                                <ListGroup variant="flush">
                                    <ListGroup.Item style={{display:'flex', justifyContent:'center', gap:'6px'}}>
                                       
                                        <div style={{width:'15%'}}>
                                           <img style={{width:'100%'}} src={FacebookLogo} alt='facebook'/>
                                        </div>
                                        <div style={{width:'15%'}}>
                                           <img style={{width:'100%'}} src={FlickerLogo} alt='flicker'/>
                                        </div>
                                        <div style={{width:'15%'}}>
                                           <img style={{width:'100%'}} src={GoogleLogo} alt='google'/>
                                        </div>
                                        <div style={{width:'15%'}}>
                                           <img style={{width:'100%'}} src={TwitterLogo} alt='twitter'/>
                                        </div>
                                        
                                    </ListGroup.Item>
                                   
                                </ListGroup>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </section>
        // <Card style={{ width: '18rem' }}>
        //   <Card.Img variant="top" src="holder.js/100px180" />
        //   <Card.Body>
        //     <Card.Title>Card Title</Card.Title>
        //     <Card.Text>
        //       Some quick example text to build on the card title and make up the
        //       bulk of the card's content.
        //     </Card.Text>
        //     <Button variant="primary">Go somewhere</Button>
        //   </Card.Body>
        // </Card>
    )
}

export default Team