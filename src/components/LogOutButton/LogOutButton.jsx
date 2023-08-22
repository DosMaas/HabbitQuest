import React from 'react';
import { useDispatch } from 'react-redux';

function LogOutButton({ style }) {

  if (style === undefined) {
    style = {
      margin: "0",
      fontWeight: '400',
      fontSize: '1rem',
      lineHeight: '1.5',
      fontFamily: 'fantasy',
      paddingLeft: '16px',
    }
  }

  const dispatch = useDispatch();
  return (
    <div
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      // className={props.className}
      style={style}
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </div>
  );
}

export default LogOutButton;
