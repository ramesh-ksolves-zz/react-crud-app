import React, { useState } from "react";
function CustomSelect(props) {
  const [data] = useState(props.data);
  const [selectedData, updateSelectedData] = useState("");
  function handleChange(event) {
    updateSelectedData(event.target.value);
    console.log(event.target.value);
    if (props.onSelectChange) props.onSelectChange(selectedData);
    console.log(props);
  }
  let options = data.map(data => (
    <option key={data.id} value={data.id}>
      {data.name}
    </option>
  ));
  return (
    <select
      name="customSearch"
      className="custom-search-select"
      onChange={handleChange}
    >
      <option>Select Item</option>
      {options}
    </select>
  );
}
export default CustomSelect;