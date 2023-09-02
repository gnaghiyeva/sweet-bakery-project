import React, { useEffect, useState } from 'react'
import { getBlogById } from '../../../../api/requests';
import { useParams } from 'react-router-dom';
import blogdetailStyle from '../../../../style/blogdetail.module.css'
const MyBlogDetail = () => {
  const [blogdetails, setBlogDetails] = useState([])
  const { id } = useParams();
  useEffect(() => {
    getBlogById(id).then((res) => {
      setBlogDetails(res.data);
    });
  }, [id]);
  return (
    <>
      <section className={blogdetailStyle.blog_detail_container}>

       
          <>
            <div>
              <article>
                <p className={blogdetailStyle.blog_detail_p}>{blogdetails.description}</p>
              </article>
            </div>
            <br />

            <div>

              <article>
                <h4 className={blogdetailStyle.blog_detail_menu_title}>{blogdetails.menuTitle}</h4><br/>
                <p>{blogdetails.menuDesc}</p>
              </article>

              <br />

              <div className={blogdetailStyle.blog_detail_image_container}>
                <img className={blogdetailStyle.blog_detail_image} src={blogdetails.image} alt='detailimage'/>
              </div>
            </div>

            <br />
            <div>
              <article>
                <h4 className={blogdetailStyle.blog_detail_guest_title}>{blogdetails.guestTitle}</h4><br/>
                <p>{blogdetails.guestDesc}</p>
              </article>
            </div>
          </>
     




      </section>
    </>
  )
}

export default MyBlogDetail