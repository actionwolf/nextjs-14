interface IInputProps {
  name?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: string[];
}

export default function Input({
  name,
  type = 'text',
  placeholder = '',
  required = false,
  disabled = false,
  errors = []
}: IInputProps) {
  return (
    <div className='flex flex-col gap-2'>
      <input
        className='bg-transparent rounded-md w-full h-10 px-3 focus:outline-none ring-1 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400'
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />

      {errors.map((error: string, index: number) => {
        return (
          <span key={`${name}-error-${index}`} className='text-xs text-red-500'>
            {error}
          </span>
        );
      })}
    </div>
  );
}
