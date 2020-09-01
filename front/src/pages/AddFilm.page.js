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
    date: { year: null, month: [] },
    location: [],
    comments: null,
    options: null,
  })

  useEffect(() => {
    getOptions().then((res) => setData({ ...data, options: res.data }))
  }, [])

  const handleInputChange = e => {
    let value = e.target.value;
    const name = e.target.name;
    name == "year" || name == "ISO" ? value = parseInt(value) : value = value;
    name == "month" || name == "location" ? value = arrValue : value = value;
    name == "year" || name == "month" ? setData({ ...data, date: { ...data.date, [name]: value } }) : setData({ ...data, [name]: value });
  };

  const handleSubmit = (data) => (console.log(data));



  return (<>
    <h2 className="page-title">ADD FILM</h2>

    <form onSubmit={e => {
      e.preventDefault();
      handleSubmit(data);
      console.log(data)
    }}>
      <span>
        <SelectOption item="camera" {...{ data, handleInputChange }} />
        <SelectOption item="scan" title="scanned?" {...{ data, handleInputChange }} />
      </span>
      <span>
        <h3>FILM</h3>
        <SelectOption item="colorType"  {...{ data, handleInputChange, title: "color?" }} />
        <Field item="ISO" {...{ handleInputChange, placeholder: "400", type: "number" }} />
        <Field item="filmType"{...{ handleInputChange, placeholder: "kodak-200", title: "film type" }} />
      </span>
      <span>
        <h3>CONTENT</h3>
        <Field item="year"  {...{ handleInputChange, placeholder: "2020", title: "date:year", type: "number" }} />
        <Field item="month"  {...{
          handleInputChange, placeholder: "jan, feb", title: "date:month(s)"
        }} />
        <Field item="location" {...{
          handleInputChange, placeholder: "Madrid, Aachen"
        }} />
        <Field item="comments" {...{ handleInputChange, placeholder: "Write here..." }} />
      </span>
      <button type="submit" > ADD</button>

    </form>

  </>)
}

const SelectOption = ({ data, item, handleInputChange, title = item }) =>
  <div className="form-element">
    <label htmlFor={item}>{title.toUpperCase()}</label>
    <div className="hidden-select">
      <select required name={item} value={data?.[item] || "[]"} onChange={handleInputChange} size={data.options && data.options[item].length}>
        {data.options && data.options[item].map((e, i) => <option value={e} key={i}>{e}</option>)}
      </select>
    </div >
    <div className="select">
      {data.options && data.options[item].map((e, i) => <div key={i} className={data[item] == e ? "select-element selected" : "select-element"} value={e}
        onClick={() => {
          handleInputChange({ target: { value: e, name: item } })
        }}>{e}</div>)}
    </div>
  </div >

const Field = ({ item, handleInputChange, placeholder = "", title = item, type = "text" }) =>
  <div className="form-element">
    <label htmlFor={item}>{title.toUpperCase()} </label>
    <input id={item} name={item} onChange={handleInputChange} {...{ placeholder, type }} />
  </div>