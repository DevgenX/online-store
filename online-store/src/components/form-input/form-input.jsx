import { FormInputLabel, Input, Group } from "./form-input.styles";

// This component renders the input field with props passed from the sign-up component
const signInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default signInput;
