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
import ModalInfoInputField from "./components/ModalInfoInputField";
import ModalInfoTextAreaField from "./components/ModalInfoTextAreaField";
import SearchField from "./components/SearchField";
import WidthHeightField from "./components/WidthHeightField";
import PaddingField from "./components/PaddingField";
import StrokeField from "./components/StrokeField";
import CodeblockField from "./components/CodeblockField";
import DirectionField from "./components/DirectionField";

function App() {
  return (
    <div className="mt-10 max-w-71.5 mx-auto  p-3.75 space-y-3">
      <Toaster richColors position="top-right" />
      {/* <SliderField /> */}
      {/* <RepeatField /> */}
      {/* <RotationField /> */}
      {/* <NumberField /> */}
      {/* <SelectField /> */}
      {/* <TextField /> */}
      {/* <SwitchField /> */}
      {/* <ClassSelectionField /> */}
      {/* <NumberField2 /> */}
      {/* <ColorPickerField /> */}
      {/* <WidthHeightField />
      <PaddingField />
      <StrokeField />
      <DirectionField />
      <CodeblockField /> */}
      <GlobalSettingModal/>
      {/* <DynamicModal /> */}
      {/* <ModalInfoInputField /> */}
      {/* <ModalInfoTextAreaField /> */}
      {/* <SearchField /> */}
    </div>
  );
}

export default App;
