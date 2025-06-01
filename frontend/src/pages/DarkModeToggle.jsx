import React from "react";
function DarkModeToggle(){
    return (
    <button
      onClick={toggleDarkMode}
      style={{
        margin: '10px',
        padding: '5px 10px',
        backgroundColor: darkMode ? '#333' : '#eee',
        color: darkMode ? '#fff' : '#000',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '4px',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      {darkMode ? 'Mode clair' : 'Mode sombre'}
    </button>
  );


}
export default DarkModeToggle;