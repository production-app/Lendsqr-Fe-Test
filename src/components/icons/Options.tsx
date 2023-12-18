const Options = ({...props}) => {
    return (
        <svg
            width={4}
            height={16}
            viewBox="0 0 4 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M2 4.111c.922 0 1.667-.744 1.667-1.667C3.667 1.522 2.922.778 2 .778S.333 1.522.333 2.444c0 .923.745 1.667 1.667 1.667zm0 2.222C1.078 6.333.333 7.078.333 8S1.078 9.667 2 9.667 3.667 8.922 3.667 8 2.922 6.333 2 6.333zm0 5.556c-.922 0-1.667.744-1.667 1.667 0 .922.745 1.666 1.667 1.666s1.667-.744 1.667-1.666c0-.923-.745-1.667-1.667-1.667z"
                fill="currentColor"
            />
        </svg>
    )
}
      
export default Options