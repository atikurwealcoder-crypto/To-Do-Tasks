import { Toaster } from "sonner";
import ClassSelectionField from "./components/ClassSelectionField";
import ColorPickerField from "./components/ColorPickerField";
import GlobalSettingModal from "./components/GlobalSettingModal";
import NumberField from "./components/NumberField";
import NumberField2 from "./components/NumberField2";
import RepeatField from "./components/RepeatField";
import RotationField from "./components/RotationField";
import SelectField from "./components/SelectField";
import SliderField from "./components/SliderField";
import SwitchField from "./components/SwitchField";
import TextField from "./components/TextField";
import DynamicModal from "./components/DynamicModal";

function App() {
  return (
    <div className="mt-10 max-w-110 mx-auto">
      <Toaster richColors position="top-right" />
      {/* <SliderField />
      <RepeatField />
      <RotationField />
      <NumberField />
      <SelectField />
      <TextField />
      <SwitchField />
      <ClassSelectionField />
      <NumberField2 />
      <ColorPickerField/> */}
      {/* <GlobalSettingModal/> */}
      <DynamicModal/>
    </div>
  );
}

export default App;
