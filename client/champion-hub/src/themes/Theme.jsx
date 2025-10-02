
// Normal text
export const textStyle = {
    color: "white", textAlign: "left", py: 1, pl: 2, fontSize: 16
}

// Text declaration
export const spanStyle = {
    color: "#D8BF78", fontWeight: "bold"
}

// Button that is currently active
export const activeButton = {
    backgroundColor: "#9f8353ff",
    color: "#ffebc886",
    boxShadow: "inset 0px 4px 12px rgba(0,0,0,0.5)"
  }
  
// Normal button style
export const buttonStyle = {
    backgroundColor: "#B38A43",
    px: 4,
    color: "#FFF2B4",
    textTransform: "capitalize",
    fontWeight: "bold",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
        backgroundColor: "#cea969ff",
        color: "#ecd9b5ff",
        transform: "scale(1.1)"
    }
}

export const inputFieldStyle = {
    '& .MuiInputLabel-root': {
      color: '#d7b478ff',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#ebdcc2ff',
    },    
    '& .MuiOutlinedInput-input': {
      color: '#e7d0a8ff',
    },
    backgroundColor: "#e7d0a891",
    input: {color: "#ffe6b7ff"}
}