import {
  IDropdownStyles,
  ITextFieldStyles,
  useTheme
} from '@fluentui/react';


export const dropdownCoordinadoresStyles: Partial<IDropdownStyles> = {
  dropdown: { marginRight: 5 },
  root: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '300px',
    maxWidth: '450px',
  },
  label: {
    minWidth: '144px',
  },
  dropdownOptionText: { overflow: 'visible', whiteSpace: 'normal' },
  dropdownItemsWrapper: {
    minWidth: '300px',
    'margin-left': '8px',
  },
  dropdownItem: {
    minWidth: '300px',
    height: 'auto',
  },
};

export const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { marginRight: 5 },
  root: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '300px',
  },
  label: {
    minWidth: '144px',
  },
  dropdownOptionText: { overflow: 'visible', whiteSpace: 'normal' },
  dropdownItemsWrapper: {
    minWidth: '300px',
    'margin-left': '8px',
  },
  dropdownItem: {
    minWidth: '300px',
    height: 'auto',
  },
};

export const addButtonStylesCommon = () => {
  try {
    const theme = useTheme();

    return {
      root: {
        borderRadius: '4px',
        padding: '6px',
        backgroundColor: theme.palette.white,
        color: theme.palette.themePrimary,
        border: `1px solid ${theme.palette.themePrimary}`,
        fontWeight: 'bold',
        selectors: {
          ':hover': {
            backgroundColor: theme.palette.themePrimary,
            color: theme.palette.white,
            border: `1px solid ${theme.palette.themePrimary}`,
          },
        },
      },
    };
  } catch (error) {
    return {};
  }
};

export const numberTextFieldStyles: Partial<ITextFieldStyles> = {
  fieldGroup: { minWidth: 100 },
};

export const longTextFieldStyles: Partial<ITextFieldStyles> = {
  fieldGroup: { minWidth: 250 },
};

