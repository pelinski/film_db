import React, { useState, useEffect, useRef } from "react";
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
  });
  const filmRef = useRef(null);
  const hardRef = useRef(null);
  const contentRef = useRef(null);


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

  console.log("hardRef", hardRef.current?.getBoundingClientRect())
  console.log("filmRef", filmRef.current?.getBoundingClientRect().x)




  return (<>
    <div id="page-title"> <marquee loop="infinite" direction="right" behavior="scroll"> <h1 >ADD FILM</h1></marquee></div>
    <form onSubmit={e => {
      e.preventDefault();
      handleSubmit(data);
      console.log(data)
    }}>

      <span>
        <div className="span-title" style={{ "height": hardRef.current?.getBoundingClientRect().height }}><h3 ref={hardRef}>HARDWARE</h3></div>
        <div className="options row hardware">
          <SelectOption item="camera" {...{ data, handleInputChange, col: true }} />
          <SelectOption item="scan" title="scanned?" {...{ data, handleInputChange, col: true }} />
        </div>
      </span>
      <span>
        <div className="span-title" style={{ "height": hardRef.current?.getBoundingClientRect().height }}><h3 ref={filmRef} style={{ "position": "absolute", "margin": "0px", "left": hardRef.current?.getBoundingClientRect().x + hardRef.current?.getBoundingClientRect().width }}>FILM ROLL</h3></div>
        <div className="options row">
          <SelectOption item="colorType"  {...{ data, handleInputChange, title: "color?" }} />
          <Field item="ISO" {...{ handleInputChange, placeholder: "400", short: true }} />
          <Field item="filmType"{...{ handleInputChange, placeholder: "kodak-200", title: "film type" }} />
        </div>
      </span>
      <span>
        <div className="span-title" style={{ "height": hardRef.current?.getBoundingClientRect().height }}><h3 ref={contentRef}
          style={{ "position": "absolute", "margin": "0px", "left": hardRef.current?.getBoundingClientRect().x + hardRef.current?.getBoundingClientRect().width + filmRef.current?.getBoundingClientRect().width }} >CONTENT</h3></div>
        <div className="options row">
          <div className="col">
            <Field item="year"  {...{ handleInputChange, placeholder: "2020", title: "date:year", short: true }} />
            <Field item="month"  {...{
              handleInputChange, placeholder: "jan, feb", title: "date:month(s)"
            }} />
            <Field item="location" {...{
              handleInputChange, placeholder: "Madrid, Aachen"
            }} />
          </div>
          <div className="col ">
            <TextArea item="comments" {...{ handleInputChange, placeholder: "Write here...", col: true }} />
          </div>
        </div>
      </span>
      <div className="button-container">
        <button style={{ "position": "absolute", "margin": "0px", "left": hardRef.current?.getBoundingClientRect().x + hardRef.current?.getBoundingClientRect().width + filmRef.current?.getBoundingClientRect().width + contentRef.current?.getBoundingClientRect().width }} type="submit" >
          ADD TO DB</button></div>

    </form>

  </>)
}

const SelectOption = ({ data, item, handleInputChange, title = item, col = false }) =>
  <div className={`form-element ${col ? " col" : ""}`}>
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

const Field = ({ item, handleInputChange, placeholder = "", title = item, col = false, short = false }) =>
  <div className={`form-element ${col ? " col" : ""}`}>
    <label htmlFor={item}>{title.toUpperCase()} </label>
    <input id={item} name={item} onChange={handleInputChange} className={`${short ? " short" : ""}`} {...{ placeholder, type: "text" }} />
  </div>

const TextArea = ({ item, handleInputChange, placeholder = "", title = item, col = false }) =>
  <div className={`form-element ${col ? " col" : ""}`}>
    <label htmlFor={item}>{title.toUpperCase()} </label>
    <textarea id={item} name={item} rows={3} onChange={handleInputChange} {...{ placeholder, type: "text" }} />
  </div>