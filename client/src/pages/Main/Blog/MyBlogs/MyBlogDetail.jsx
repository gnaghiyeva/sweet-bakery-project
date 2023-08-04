import React, { useEffect, useState } from 'react'
import { getBlogDetailById } from '../../../../api/requests';
import { useParams } from 'react-router-dom';
import blogdetailStyle from '../../../../style/blogdetail.module.css'
const MyBlogDetail = () => {
  const [blogdetails, setBlogDetails] = useState([])
  const { id } = useParams();
  useEffect(() => {
    getBlogDetailById(id).then((res) => {
      setBlogDetails(res);
    });
  }, [id]);
  return (
    <>
      <section className={blogdetailStyle.blog_detail_container}>

        {blogdetails && blogdetails.map((detail) => (
          <>
            <div>
              <article>
                <p className={blogdetailStyle.blog_detail_p}>{detail.description}</p>
              </article>
            </div>
            <br />

            <div>

              <article>
                <h4 className={blogdetailStyle.blog_detail_menu_title}>{detail.menuTitle}</h4><br/>
                <p>{detail.menuDesc}</p>
              </article>

              <br />

              <div className={blogdetailStyle.blog_detail_image_container}>
                <img className={blogdetailStyle.blog_detail_image} src={detail.image} />
              </div>
            </div>

            <br />
            <div>
              <article>
                <h4 className={blogdetailStyle.blog_detail_guest_title}>{detail.guestTitle}</h4><br/>
                <p>{detail.guestDesc}</p>
              </article>
            </div>
          </>
        ))}




      </section>
    </>
  )
}

export default MyBlogDetail