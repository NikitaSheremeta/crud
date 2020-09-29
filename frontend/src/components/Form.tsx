import React from 'react';
import { useHistory } from 'react-router-dom';
import { IFormProps } from '../interfaces';

export const Form: React.FC<IFormProps> = (props) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit();
  };
  const history = useHistory();

  return (
    <form
      onSubmit={submitHandler}
      className="form form-appliance"
    >
      <div className="input">
        <label htmlFor="title" className="input__label">
          title
        </label>
        <input
          id="title"
          type="text"
          className="input__field"
          value={props.appliance.title}
          onChange={changeHandler}
          required
        />
      </div>
      <div className="input">
        <label htmlFor="description" className="input__label">
          description
        </label>
        <input
          id="description"
          type="text"
          className="input__field"
          value={props.appliance.description}
          onChange={changeHandler}
          required
        />
      </div>
      <div className="input">
        <label htmlFor="category" className="input__label">
          category
        </label>
        <input
          id="category"
          type="text"
          className="input__field"
          value={props.appliance.category}
          onChange={changeHandler}
          required
        />
      </div>
      <div className="input">
        <label htmlFor="vendorCode" className="input__label">
          vendorCode
        </label>
        <input
          id="vendorCode"
          type="text"
          className="input__field"
          value={props.appliance.vendorCode}
          onChange={changeHandler}
          required
        />
      </div>
      <div className="wrapper--action">
        <button
          type="submit"
          className="button button--small button--success"
        >
          Submit
        </button>
        <span
          className="button button--small button--outline"
          onClick={() => history.push('/')}
        >
          Cancel
        </span>
      </div>
    </form>
  );
};
