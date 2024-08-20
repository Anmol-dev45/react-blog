import { useEffect, useState } from "react";
import service from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm, Container } from "../components";

const EditPost = () => {
  const [post, setPost] = useState(null); // Initialize with `null` to easily check if data is loaded
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (slug) {
          const post = await service.getPost(slug);
          if (post) {
            setPost(post);
          } else {
            navigate("/"); // Redirect if the post doesn't exist
          }
        } else {
          navigate("/"); // Redirect if the slug is invalid
        }
      } catch (error) {
        console.error("Failed to fetch post:", error);
        navigate("/"); // Redirect on error
      }
    };

    fetchPost(); // Call the async function
  }, [slug, navigate]);

  if (post === null) {
    // You can display a loading indicator while waiting for the data
    return <div>Loading...</div>;
  }

  return (
    <section className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </section>
  );
};

export default EditPost;
