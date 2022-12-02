import React, {useCallback, useEffect, useState} from 'react';
import {Post} from "../../types";
import Spinner from "../../components/Spinner/Spinner";
import PostItem from "../../components/Posts/PostItem";
import {Outlet, useLocation, useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const location = useLocation();
  const {id} = useParams();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);

      const postsResponse = await axiosApi.get('/posts.json');
      if (postsResponse.data !== null) {
        const postsApi: Post[] = Object.keys(postsResponse.data).map(key => {
          const post = postsResponse.data[key];
          post.id = key;
          return post;
        });

        setPosts(postsApi);
      } else {
        setPosts([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (
      location.pathname === '/' ||
      location.pathname === '/posts' ||
      location.pathname === ('/' + id)) {
      void fetchPosts();
    }
  }, [fetchPosts, location, id]);

  const draw = () => {
    if (posts.length === 0) {
      return (
        <div>Post blog is empty. Add some posts to view</div>
      )
    }

    return (
      posts.map(post => (
        <PostItem
          key={post.id}
          post={post}
        />
      ))
    )
  }

  return (
    <div className='row mt-2'>
      <div className="col-5">
        {loading ? <Spinner/> : draw()
        }
      </div>
      <div className="col-5">
        <Outlet/>
      </div>
    </div>
  );
};

export default Home;