import React, { useState, useCallback, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import { Appliance } from '../components/Appliance';
import { IAppliance } from '../interfaces';

export const List: React.FC = () => {
  const [appliances, setAppliances] = useState<IAppliance[]>([]);

  const { request } = useHttp();

  const getAppliances = useCallback(async () => {
    try {

      const data = await request('http://localhost:5000/appliances/', 'GET');

      setAppliances(data.reverse());

    } catch (err) {
      console.error(err);
    }
  }, [request]);

  useEffect(() => { getAppliances(); }, [getAppliances]);

  const removeHandler = async (id: string): Promise<void> => {
    const isDelete = window.confirm(
      'Are you sure you want to remove this item?'
    );

    if (isDelete) {
      try {

        await request(`http://localhost:5000/appliances/${id}`, 'DELETE');

        setAppliances(prev => prev.filter(appliance => appliance._id !== id));

      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <React.Fragment>
      {appliances.map(appliance => {
        return (
          <Appliance
            key={appliance._id}
            appliance={appliance}
            onRemove={removeHandler}
          />
        );
      })}
    </React.Fragment>
  );
};
