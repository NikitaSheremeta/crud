import React from 'react';
import { useHistory } from 'react-router-dom';
import { IApplianceProps } from '../interfaces';

export const Appliance: React.FC<IApplianceProps> = (props) => {
  const removeHandler = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    props.onRemove(id);
  };

  const history = useHistory();

  return (
    <div className="appliance">
      <span className="appliance__category">
        {props.appliance.category}
      </span>
      <div className="wrapper--content">
        <span className="appliance__vendor-code">
          {props.appliance.vendorCode}
        </span>
        <h3 className="appliance__title">
          {props.appliance.title}
        </h3>
        <p className="appliance__description">
          {props.appliance.description}
        </p>
        <div className="wrapper wrapper--action">
          <button
            className="button button--small button--primary"
            onClick={() => history.push(`/update/${props.appliance._id}`)}
          >
            Edit
          </button>
          <button
            className="button button--small button--outline"
            onClick={(event) => removeHandler(event, props.appliance._id!)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
