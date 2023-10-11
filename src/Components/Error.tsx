import { Dispatch } from '@reduxjs/toolkit';
import React from 'react';
import { Form } from 'react-bootstrap';

type Props = {
  error: String;
  setError: (params: any) => any;
};

export const Error = (props: Props) => {
  return (
    <div hidden={!props.error}>
      <Form.Text className="text-danger" onClick={props.setError}>
        {props.error}
      </Form.Text>
    </div>
  );
};
