import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "../../axiosApi";
import Spinner from "../../components/Spinner/Spinner";

const About = () => {
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState({
    title: '',
    name: '',
    body: '',
  });

  const fetchAbout = useCallback(async () => {
    try {
      setLoading(true);
      const aboutResponse = await axiosApi.get('https://almaz-js17-default-rtdb.europe-west1.firebasedatabase.app/about.json');
      setAbout(aboutResponse.data);
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    fetchAbout().catch(console.error);
  }, [fetchAbout]);

  let form = (
    <div>
      <h4>{about.title}</h4>
      <p>{about.name}</p>
      <p>{about.body}</p>
    </div>
  );

  if (loading) {
    form = <Spinner/>
  }

  return (
    <div>{form}</div>
  );
};

export default About;