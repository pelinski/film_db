import React, { useState, useEffect } from "react";
import { getOptions } from "../api/db.api";


export const AddFilmPage = () => {
  const [data, setData] = useState({
    format: null,
    filmType: null,
    ISO: null,
    camera: null,
    colorType: null,
    scan: null,
    date: { year: null, month: null },
    location: null,
    comments: null,
    options: null,
  })

  useEffect(() => {
    getOptions().then((res) => setData({ ...data, options: res.data }))
  }, [])

  const handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    setData({ ...data, [name]: value });
  };
  return (<>
    <h1>Add film</h1>

    <form onSubmit={e => {
      e.preventDefault();
      //handleSubmit(data);
      console.log(data)
    }}>

      <SelectOption item="format" {...{ data, handleInputChange }} />
      <SelectOption item="camera" {...{ data, handleInputChange }} />
      <SelectOption item="colorType" {...{ data, handleInputChange }} />
      <SelectOption item="scan" {...{ data, handleInputChange }} />
      <Field item="ISO" {...{ handleInputChange, placeholder: "400" }} />
      <Field item="filmType" {...{ handleInputChange, placeholder: "kodak-200" }} />
      <Field item="year" {...{ handleInputChange, placeholder: "2020" }} />
      <Field item="month" {...{
        handleInputChange, placeholder: "jan, feb (separate w comma)"
      }} />
      <Field item="location" {...{
        handleInputChange, placeholder: "Madrid, Aachen (separate w comma)"
      }} />
      <Field item="comments" {...{ handleInputChange, placeholder: "Write here..." }} />



      < button type="submit" > add</button>

    </form>

  </>)
}

const SelectOption = ({ data, item, handleInputChange }) => <>
  <label htmlFor={item}>{item}</label>
  <select required name={item} value={data?.[item] || "loading"} onChange={handleInputChange}>
    {data.options && data.options[item].map((e, i) => <option value={e} key={i}>{e}</option>)}
  </select>
</>

const Field = ({ item, handleInputChange, placeholder = "" }) => <>
  <label htmlFor={item}>{item} </label>
  <input type="text" id={item} name={item} onChange={handleInputChange} {...{ placeholder }} /></>