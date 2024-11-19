import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};
const PHInput = ({ type, name, label }: TInputProps) => {
  const { control } = useFormContext();
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <Input {...field} type={type} id={name} />}
      />
    </>
  );
};

export default PHInput;
