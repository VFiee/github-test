// type FieldType =
//   | "input"
//   | "checkbox"
//   | "picker"
//   | "radio"
//   | "slider"
//   | "switch"
//   | "textarea";
interface FieldType {
  input;
  checkbox;
  picker;
  radio;
}

type InputProps = {};
type RadioProps = {};

type T0<T> = Extract<InputProps | RadioProps, T>;

type FieldItemProps = {
  _type: keyof FieldType;
  key: string;
  defaultValue?: any;
};

type FieldProps = FieldItemProps & T0<keyof FieldType>;
