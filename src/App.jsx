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

function App() {
  return (
    <div className="mt-10 max-w-110 mx-auto bg-[#27272A]">
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
      <GlobalSettingModal/>
    </div>
  );
}

export default App;
