import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { Form } from '../components/Form';
import { IAppliance } from '../interfaces';

export const Create: React.FC = () => {
  const [appliance, setAppliances] = useState<IAppliance>({
    title: '',
    description: '',
    category: '',
    vendorCode: ''
  });
  const history = useHistory();
  const { request } = useHttp();

  const ChannelHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setAppliances({
    ...appliance,
    [event.target.id]: event.target.value
  });

  const submitHandler = async (): Promise<void> => {
    try {

      await request('http://localhost:5000/appliances/add', 'POST', appliance);

      window.alert('Appliance added successfully!');
      history.push('/');

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <Form
        appliance={appliance}
        onChange={ChannelHandler}
        onSubmit={submitHandler}
      />
    </React.Fragment>
  );
};
