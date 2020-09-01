import React, { useState, useEffect, cloneElement } from "react";
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
    console.log(value, name)
    setData({ ...data, [name]: value });
  };
  return (<>
    <h2>ADD FILM</h2>

    <form onSubmit={e => {
      e.preventDefault();
      //handleSubmit(data);
      console.log(data)
    }}>
      <span>
        <SelectOption item="camera" {...{ data, handleInputChange }} />
        <SelectOption item="scan" {...{ data, handleInputChange }} />

      </span>
      <span>
        <h3>film</h3>
        <SelectOption item="colorType" {...{ data, handleInputChange }} />
        <Field item="ISO" {...{ handleInputChange, placeholder: "400" }} />
        <Field item="filmType" {...{ handleInputChange, placeholder: "kodak-200" }} />
      </span>
      <span>
        <h3>content</h3>
        <Field item="year" {...{ handleInputChange, placeholder: "2020" }} />
        <Field item="month" {...{
          handleInputChange, placeholder: "jan, feb (separate w comma)"
        }} />
        <Field item="location" {...{
          handleInputChange, placeholder: "Madrid, Aachen (separate w comma)"
        }} />
        <Field item="comments" {...{ handleInputChange, placeholder: "Write here..." }} />
      </span>
      <button type="submit" > ADD</button>

    </form>

  </>)
}

const SelectOption = ({ data, item, handleInputChange }) =>
  <div className="form-element">
    <label htmlFor={item}>{item}</label>
    <div className="hidden-select">
      <select required name={item} value={data?.[item] || "[]"} onChange={handleInputChange} size={data.options && data.options[item].length}>
        {data.options && data.options[item].map((e, i) => <option value={e} key={i} className={data[item] == e ? "selected" : ""}>{e}</option>)}
      </select>
    </div >
    <div className="select">
      {data.options && data.options[item].map((e, i) => <div key={i} className={data[item] == e ? "select-element selected" : "select-element"} value={e} onClick={() => { const element = { target: { value: e, name: item } }; handleInputChange(element) }}>{e}</div>)}
    </div>


    {/* SELECT SHOULD BE HIDDEN TO AVOID THE BLUE SELECTION, CREATE ANOTHER ONE, LINK THE SELECTION AND SET SELECTION:HIDDEN*/}


  </div >

const Field = ({ item, handleInputChange, placeholder = "" }) =>
  <div className="form-element">
    <label htmlFor={item}>{item} </label>
    <input type="text" id={item} name={item} onChange={handleInputChange} {...{ placeholder }} />
  </div>