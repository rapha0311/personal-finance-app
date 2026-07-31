function ThemeButton({

    children,

    color = "blue",

    className = "",

    ...props

}) {

  const colors = {

    blue: "bg-blue-600 hover:bg-blue-700",

    green: "bg-green-600 hover:bg-green-700",

    yellow: "bg-yellow-500 hover:bg-yellow-600",

    red: "bg-red-600 hover:bg-red-700",

    gray: "bg-gray-500 hover:bg-gray-600"

  };

  return (

    <button
      {...props}
      className={`
        text-white
        px-4
        py-2
        rounded
        transition-colors
        font-semibold
        disabled:opacity-50
        disabled:cursor-not-allowed
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        ${colors[color]}
        ${className}
    `}
    >

      {children}

    </button>

  );

}

export default ThemeButton;