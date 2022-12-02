import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Post} from "../../types";
import axiosApi from "../../axiosApi";
import Spinner from "../../components/Spinner/Spinner";

const PostForm = () => {
  const [loading, setLoading] = useState(false);
  const [postState, setPostState] = useState<Post>({
    id: '',
    title: '',
    datetime: '',
    body: '',
  });

  const {id} = useParams();
  const navigate = useNavigate();

  const fetchPost = useCallback(async () => {
    try {
      const postResponse = await axiosApi.get('/posts/' + id + '.json');
      setPostState(postResponse.data);
    } finally {
      setLoading(false)
    }
  }, [id]);

  const postChangeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    const date = new Date();
    setPostState(prevState => ({
      ...prevState,
      [name]: value,
      datetime: date.getMonth() + '/' + date.getDate() + '/' + date.getSeconds(),
    }));
  };

  const addPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosApi.post('/posts.json', postState)
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const changePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosApi.put('/posts/' + id + '.json', postState);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }

  const deletePost = async () => {
    setLoading(true);

    try {
      await axiosApi.delete('/posts/' + id + '.json');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  let form = (
    <form onSubmit={addPost}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id='title' type='text' name='title'
          className='form-control'
          onChange={postChangeInfo}
        />
      </div>
      <div className="form-group">
        <label htmlFor="title">Body</label>
        <input
          style={{height: '100px', overflowY: 'scroll'}}
          id='body' type='text' name='body'
          className='form-control'
          onChange={postChangeInfo}
        />
      </div>
      <button type="submit" className="btn btn-primary m-2">Add</button>
    </form>
  );

  if (id) {
    form = (
      <form onSubmit={changePost}>
        <p>{id}</p>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id='title' type='text' name='title'
            className='form-control'
            value={postState.title}
            onChange={postChangeInfo}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Body</label>
          <input
            style={{height: '400px', overflowY: 'scroll'}}
            id='body' type='text' name='body'
            className='form-control'
            value={postState.body}
            onChange={postChangeInfo}
          />
        </div>
        <button type="button" onClick={deletePost} className="btn btn-danger m-2">Delete</button>
        <button type="submit" className="btn btn-primary m-2">Edit</button>
      </form>
    );
  }

  useEffect(() => {
    fetchPost().catch(console.error);
  }, [fetchPost, id]);

  return (
    <div>
      {loading ? <Spinner/> : form}
    </div>
  );
};

export default PostForm;
