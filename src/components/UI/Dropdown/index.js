"use client";

import React, { Fragment } from "react";

const Dropdown = ({ label, onChange, name, data, value, text, disabled }) => {
  return (
    <Fragment>
      <label>{label}</label>
      <select className="border" onChange={onChange} name={name}>
        <option>select</option>
        {data?.map((s, i) => (
          <option key={`${name}_${i}`} value={s[value]} disabled={!s[disabled]}>
            {s[text].toUpperCase()}
          </option>
        ))}
      </select>
    </Fragment>
  );
};

export default Dropdown;
