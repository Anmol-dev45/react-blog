import { useEffect, useState } from "react";
import service from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm, Container } from "../components";
const EditPost = () => {
  const [post, setPost] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();
  console.log(slug);
  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug]);
  console.log(post);
  return post ? (
    <section className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </section>
  ) : (
    <></>
  );
};

export default EditPost;
