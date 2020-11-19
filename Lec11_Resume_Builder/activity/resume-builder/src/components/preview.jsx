import React from "react";

const Preview = (props) => {
  let {
    fname,
    lname,
    summary,
    email,
    phone,
    profession,
    street,
    city,
    state,
    country,
    pin,
  } = props.contact;
  return (
    <React.Fragment>
      <div className="fname">{fname}</div>
      <div className="lname">{lname}</div>
      <div className="summary">{summary}</div>
      <div className="email">{email}</div>
      <div className="phone">{phone}</div>
      <div className="profession">{profession}</div>
      <div className="street">{street}</div>
      <div className="city">{city}</div>
      <div className="state">{state}</div>
      <div className="country">{country}</div>
      <div className="pin">{pin}</div>
    </React.Fragment>
  );
};

export default Preview;
