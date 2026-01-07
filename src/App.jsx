import ClassSelectionField from "./components/ClassSelectionField";
import NumberField from "./components/NumberField";
import RepeatField from "./components/RepeatField";
import RotationField from "./components/RotationField";
import SelectField from "./components/SelectField";
import SliderField from "./components/SliderField";
import SwitchField from "./components/SwitchField";
import TextField from "./components/TextField";

function App() {
  return (
    <div className="mt-10 max-w-110 mx-auto bg-[#27272A]">
      <SliderField />
      <RepeatField />
      <RotationField />
      <NumberField />
      <SelectField />
      <TextField />
      <SwitchField />
      <ClassSelectionField />
    </div>
  );
}

export default App;
