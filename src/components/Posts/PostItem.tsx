import React from 'react';
import {Post} from "../../types";
import {useNavigate} from "react-router-dom";

interface Props {
  post: Post;
}

const PostItem: React.FC<Props> = ({post}) => {
  const navigate = useNavigate();

  return (
    <div className='card mb-2'>
      <div className="card-body">
        <p>{post.id}</p>
        <p className='card-text small'>{post.datetime}</p>
        <h4 className='card-title'>{post.title}</h4>
        <button onClick={() => navigate('/' + post.id)} className='btn btn-dark'>Read more</button>
      </div>
    </div>
  );
};

export default PostItem;