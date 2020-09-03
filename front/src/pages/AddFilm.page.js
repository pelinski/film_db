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
    const arrValue = value.split(" ");
    name == "year" || name == "ISO" ? value = parseInt(value) : value = value;
    name == "month" || name == "location" ? value = arrValue : value = value;
    name == "year" || name == "month" ? setData({ ...data, date: { ...data.date, [name]: value } }) : setData({ ...data, [name]: value });
  };

  const handleSubmit = (data) => (console.log(data));



  return (<>
    <div id="page-title"> <marquee loop="infinite" direction="right" behavior="scroll"> <h1 >ADD FILM</h1></marquee></div>
    <form onSubmit={e => {
      e.preventDefault();
      handleSubmit(data);
      console.log(data)
    }}>

      <span>
        <h3>HARD</h3>
        <div className="options opt1">
          <SelectOption item="camera" {...{ data, handleInputChange }} />
          <SelectOption item="scan" title="scanned?" {...{ data, handleInputChange }} />
        </div>
      </span>
      <span>
        <h3>FIlM</h3>
        <div className="options">
          <SelectOption item="colorType"  {...{ data, handleInputChange, title: "color?" }} />
          <Field item="ISO" {...{ handleInputChange, placeholder: "400" }} />
          <Field item="filmType"{...{ handleInputChange, placeholder: "kodak-200", title: "film type" }} />
        </div>
      </span>
      <span>
        <h3>CONTENT</h3>
        <div className="options">
          <Field item="year"  {...{ handleInputChange, placeholder: "2020", title: "date:year" }} />
          <Field item="month"  {...{
            handleInputChange, placeholder: "jan, feb", title: "date:month(s)"
          }} />
          <Field item="location" {...{
            handleInputChange, placeholder: "Madrid, Aachen"
          }} />
          <Field item="comments" {...{ handleInputChange, placeholder: "Write here..." }} />
        </div>
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

    <div className="select" className={data?.options && data.options[item].length > 4 ? "two-col-select select" : "select"}>
      {data.options && data.options[item].map((e, i) => <div key={i} className={data[item] == e ? "select-element selected" : "select-element"} value={e}
        onClick={() => {
          handleInputChange({ target: { value: e, name: item } })
        }}>{e}</div>)}
    </div>
  </div >

const Field = ({ item, handleInputChange, placeholder = "", title = item }) =>
  <div className="form-element">
    <label htmlFor={item}>{title.toUpperCase()} </label>
    <input id={item} name={item} onChange={handleInputChange} {...{ placeholder, type: "text" }} />
  </div>