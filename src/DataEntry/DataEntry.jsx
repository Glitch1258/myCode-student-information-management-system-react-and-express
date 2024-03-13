
import DataElement from "../DataElement/DataElement.jsx";
function DataEntry(props) {
  var name = props.studentInformation.name;
  var id = props.studentInformation.id;
  var grade = props.studentInformation.class; // because class is reserved keyword
  var gpa = props.studentInformation.gpa;
  //<DataElement DataElementData={id} DataElementTitle={"id"} />
  return (
    <div id={"dataEntryForId "+id}>
      <DataElement index={props.index} DataId = {id} DataElementData={name} DataElementTitle={"name"} type= {"text"} min={''} max={''} />
      <DataElement index={props.index} DataId = {id} DataElementData={grade} DataElementTitle={"class"}  type = {"number"} step={"1"} />
      <DataElement index={props.index} DataId = {id} DataElementData={gpa} DataElementTitle={"gpa"} type={"number"} step="0.01"/><br/>
    </div>
  );
}

export default DataEntry;
