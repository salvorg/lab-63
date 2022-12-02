import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "../../axiosApi";
import Spinner from "../../components/Spinner/Spinner";

const Contacts = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState({
    planet: '',
    phone: '',
  });

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const dataResponse = await axiosApi.get('https://almaz-js17-default-rtdb.europe-west1.firebasedatabase.app/Contacts.json');
      setContacts(dataResponse.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts().catch(console.error);
  }, [fetchContacts]);

  let form = (
    <div>
      <h1>{contacts.planet}</h1>
      <p>{contacts.phone}</p>
    </div>
  )

  if (loading) {
    form = (<Spinner/>);
  }

  return (
    <div>
      {form}
    </div>
  );
};

export default Contacts;