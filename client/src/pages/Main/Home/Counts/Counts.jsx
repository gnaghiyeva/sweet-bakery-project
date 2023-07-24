import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import countStyle from '../../../../style/counts.module.css'
import { Grid } from '@mui/material'
import { getAllCategories } from '../../../../api/requests'
const Counts = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getAllCategories().then((res) => {
            setCategories(res.data)
            console.log(res.data)
        })
    }, [])
    return (
        <section className={countStyle.counts_container} >
            <Grid container spacing={2} style={{ padding: '0 40px' }}>
                {categories && categories.map((category)=>{
                    return (
                        <Grid item sm={6} xs={12} md={3}>
                            <div style={{textAlign:'center'}}>
                                <h1 className={countStyle.counts_text}>{category.count}</h1>
                                <Button className={countStyle.counts_button} variant="outline-light">{category.name}</Button>
                            </div>
                        </Grid>
                    )
                })}

            </Grid>
        </section>
    )
}

export default Counts