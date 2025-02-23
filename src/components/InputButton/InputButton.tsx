export interface InputButtonPropsType {
  buttonText: string;
  leftIcon?: string;
  disabled?: boolean;
  onSubmit?: () => void;
  color?: string;
  backgroundColor?: string;
}

const InputButton = (props: InputButtonPropsType) => {
  const {
    buttonText,
    onSubmit,
    leftIcon,
    disabled,
    color,
    backgroundColor = '#f8f8f8',
  } = props;

  return (
    <div
      onClick={!disabled ? onSubmit : () => {}}
      className={`absolute flex justify-center items-center px-2 py-1 mx-auto my-0 cursor-pointer right-2 top-2 rounded-md text-xs text-grayscale500 `}
      style={{ backgroundColor }}
    >
      {leftIcon ? (
        <img className="w-3 mr-2" src={leftIcon} alt={leftIcon.split('.')[0]} />
      ) : null}
      {buttonText}
    </div>
  );
};

export default InputButton;
