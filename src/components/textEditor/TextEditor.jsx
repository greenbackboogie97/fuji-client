import React, { useState } from 'react';
import { Editor, RichUtils } from 'draft-js';
import { IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { BiBold, BiColorFill, BiItalic, BiUnderline, BiImages } from 'react-icons/bi';

export default function TextEditor(props) {
  const classes = useStyles();
  const [menuAnchorElement, setMenuAnchorElement] = useState(null);

  const handleKeyCommand = (command, state) => {
    const newState = RichUtils.handleKeyCommand(state, command);

    if (newState) {
      props.setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const handleFormatClick = (format) =>
    props.setEditorState(RichUtils.toggleInlineStyle(props.editorState, format));

  const handleColorMenuClick = (e) => setMenuAnchorElement(e.currentTarget);

  const handleMenuClose = () => setMenuAnchorElement(null);

  const handleColorClick = (format) => {
    handleMenuClose();
    handleFormatClick(format);
  };

  const styleMap = {
    RED: {
      color: '#BC012D',
    },
    GREEN: {
      color: '#08fcc3',
    },
    BLUE: {
      color: '#187cc9',
    },
    ORANGE: {
      color: '#f79245',
    },
    PURPLE: {
      color: '#ba07a8',
    },
  };

  return (
    <>
      <div className={classes.editorMenu}>
        <IconButton className={classes.editorButton} onClick={() => handleFormatClick('BOLD')}>
          <BiBold />
        </IconButton>
        <IconButton className={classes.editorButton} onClick={() => handleFormatClick('ITALIC')}>
          <BiItalic />
        </IconButton>
        <IconButton className={classes.editorButton} onClick={() => handleFormatClick('UNDERLINE')}>
          <BiUnderline />
        </IconButton>
        <IconButton className={classes.editorButton} onClick={handleColorMenuClick}>
          <BiColorFill />
        </IconButton>
        <IconButton className={classes.editorButton} onClick={props.onMediaClick}>
          <BiImages />
        </IconButton>
        <Menu
          anchorEl={menuAnchorElement}
          open={Boolean(menuAnchorElement)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 10, vertical: -45 }}
        >
          <MenuItem className={classes.menuItem} onClick={() => handleColorClick('RED')}>
            <div className={classes.colorMenuItem} style={{ background: '#BC012D' }} />
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={() => handleColorClick('GREEN')}>
            <div className={classes.colorMenuItem} style={{ background: '#08FCC3' }} />
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={() => handleColorClick('BLUE')}>
            <div className={classes.colorMenuItem} style={{ background: '#187CC9' }} />
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={() => handleColorClick('ORANGE')}>
            <div className={classes.colorMenuItem} style={{ background: '#F79245' }} />
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={() => handleColorClick('PURPLE')}>
            <div className={classes.colorMenuItem} style={{ background: '#BA07A8' }} />
          </MenuItem>
        </Menu>
      </div>

      <Editor
        editorState={props.editorState}
        onChange={props.setEditorState}
        handleKeyCommand={handleKeyCommand}
        customStyleMap={styleMap}
      />
    </>
  );
}

const useStyles = makeStyles({
  editorMenu: {
    padding: 8,
    width: 'fit-content',
  },
  menuItem: {
    minHeight: 'unset',
  },
  editorButton: {
    padding: 2,
    marginRight: 8,
  },
  colorMenuItem: {
    width: 15,
    height: 15,
    borderRadius: 4,
  },
});
