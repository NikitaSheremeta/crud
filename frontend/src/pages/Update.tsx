import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { Form } from '../components/Form';
import { IAppliance, IUseParams } from '../interfaces';

export const Update: React.FC = () => {
  const [appliance, setAppliance] = useState<IAppliance>({
    title: '',
    description: '',
    category: '',
    vendorCode: ''
  });
  const { request } = useHttp();
  const applianceID = useParams<IUseParams>().id;

  const getAppliance = useCallback(async () => {
    try {

      const data = await request(
        `http://localhost:5000/appliances/${applianceID}`,
        'GET'
      );

      setAppliance(data);

    } catch (err) {
      console.error(err);
    }
  }, [applianceID, request]);

  useEffect(() => { getAppliance(); }, [getAppliance]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setAppliance({
    ...appliance,
    [event.target.id]: event.target.value
  });

  const handleSubmit = async (): Promise<void> => {
    try {

      await request(
        `http://localhost:5000/appliances/update/${applianceID}`,
        'POST',
        appliance
      );

      window.alert('Appliance update successfully!');

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <Form
        appliance={appliance}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </React.Fragment>
  );
};
