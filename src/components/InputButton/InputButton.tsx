export interface InputButtonPropsType {
  buttonText: string;
  leftIcon?: string;
  disabled?: boolean;
  onSubmit?: () => void;

  backgroundColor?: string;
  color?: string;
}

const InputButton = (props: InputButtonPropsType) => {
  const {
    buttonText,
    onSubmit,
    leftIcon,
    backgroundColor = '#f8f8f8',
    color = '#909090',
    ...rest
  } = props;

  return (
    <div
      onClick={onSubmit}
      className={`absolute flex justify-center items-center px-2 py-1 mx-auto my-0 cursor-pointer right-2 top-2 rounded-md text-xs`}
      style={{ backgroundColor, color }}
      {...rest}
    >
      {leftIcon ? (
        <img className="w-3 mr-2" src={leftIcon} alt={leftIcon.split('.')[0]} />
      ) : null}
      {buttonText}
    </div>
  );
};

export default InputButton;
