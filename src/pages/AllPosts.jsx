import { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";
const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (setPosts) setPosts(posts.documents);
    });
  }, []);
  return (
    <section className="w-full py-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {posts?.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AllPosts;
