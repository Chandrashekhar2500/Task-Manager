import { Field } from "formik";
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import { Typography, FormControl, TableCell, Grid, Box, TextField, Paper } from '@mui/material';

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
}));

export const CustomTableContainer = styled(TableContainer)(() => ({
    maxHeight: 'calc(100vh - 470px)',
    overflowX: 'hidden !important',
}));

export const CustomTableCell = styled(TableCell)(() => ({
    fontWeight: 700,
    fontSize: '18px',
    color: 'white',
    cursor: 'pointer',
}));

export const CustomSearchDiv = styled('div')(() => ({
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& .searchBar': {
        width: '30%'
    },
}));

export const CustomTypography = styled(Typography)(() => ({
    fontSize: '14px',
    fontWeight: 500,
    color: '#303c54',
    textAlign: 'center',
}));

export const CustomBoxComponent = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between'
}));

export const CustomButton = styled('button')(() => ({
    textTransform: "uppercase",
    outline: "0",
    background: "#3699FF",
    border: "0",
    borderRadius: "6px",
    padding: "15px",
    cursor: "pointer",
    float: "left",
    '& .saveButton': {
        color: '#094369',
        background: '#e2eff7',
        border: '#e2eff7',
        padding: '10px 25px 9px',
    }
}))

export const CustomInput = styled(Field)(() => ({
    outline: "0",
    width: "100%",
    padding: '14px !important',
    boxSizing: "border-box",
    fontSize: "18px",
    marginTop: '10px',
    fontFamily: "Poppins",
    fontStyle: "normal",
    boxShadow: '2px 2px 8px #00000026 !important',
    border: '1px solid #DCDDDD',
    borderRadius: '6px',
}));

export const CustomParagraph = styled('p')(() => ({
    color: 'red',
    fontSize: '12px',
    position: 'relative',
}));

export const CustomDiv = styled('div')(() => ({
    background: '#FFFFFF',
    '& .togetherData': {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        '& .peronalDetails': {
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "36px",
            color: "#212121"
        },
        '& .issuesHaving': {
            fontFamily: 'Poppins',
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "24px",
            textAlign: "right",
            color: "#A7A8BB"
        },
    },
    '& .AddressDetails': {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "24px",
        lineHeight: "36px",
        color: "#212121",
        marginTop: '25px'
    },
    '& .secondaryEd': {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontSize: "20px",
        fontWeight: 600,
        lineHeight: "20px",
        color: "#212121",
        marginTop: '20px'
    },
    '& .fieldSet': {
        marginTop: '2px',
        '& h5': {
            width: '100%',
        },
        '& .formRadios': {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            marginTop: '5px',
            marginBottom: '5px',
            '& .formRadio': {
                width: '100%',
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                '& .radioLabel': {
                    marginLeft: '10px'
                }
            },
            '& .formRadioQuestion': {
                display: 'flex',
                flex: 2,
            }
        }
    },
    '& .buttonDivider': {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '30px',
        '& .buttonProvider': {
            '& .buttonTerms': {
                marginRight: '30px',
                fontFamily: "'Poppins'",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "24px",
                color: "#3699FF"
            },
        },
    },
    '& .buttonRight': {
        float: 'right',
        '& .buttons': {
            background: '#3699FF',
            borderRadius: '4px',
            marginRight: '50px',
            width: '171px'
        },
    }
}));

export const CustomGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'row',
    '& .checkContent': {
        fontFamily: 'Poppins',
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "20px",
        color: "#000000",
        marginTop: '10px',
    },
    "& .monitoring": {
        boxSizing: "border-box"
    }
}));

export const CustomFormControl = styled(FormControl)(() => ({
    outline: "0",
    width: "100%",
    boxSizing: "border-box",
    fontSize: "18px",
    marginTop: '10px',
    fontFamily: "Poppins",
    fontStyle: "normal",
    border: '1px solid #DCDDDD',
    borderRadius: '6px',
    minWidth: '100%',
    boxShadow: '2px 2px 8px #00000026',
    '& .MuiFormLabel-root': {
        fontSize: '14px !important',
    },
    '& .selectDemo': {
        '& .MuiSelect-select': {
            fontSize: '13px !important',
            lineHeight: '20px !important',
            padding: '3px 10px 4px !important',
            borderLeft: 'none!important',
            height: '21px',

        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '0px !important',
            color: '#adafb7',
        },
    },
}));

export const CustomDivAtom = styled('div')(() => ({
    display: 'flex',
    cursor: 'pointer',
    background: "linear-gradient(0deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)), rgba(11, 116, 185, 0.42)",
    border: "1px solid #0B74B9",
    borderRadius: "10px"
}));

export const CustomBox = styled(Box)(() => ({
    flexGrow: 1,
    bgcolor: 'background.paper',
    display: 'flex',
    width: '100%',
    '& .tabularContent': {
        background: "#F3F6F9",
        width: '400px',
        '& .tabularFormat': {
            height: "104.99px",
            borderRadius: "4px 4px 0px 0px",
            fontFamily: "'Poppins'",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "21px",
            color: "#464E5F",
            textTransform: "capitalize",
            display: 'inline',
        },
    },
    '& .post-data': {
        width: '100%',
    },
}));

export const CustomTextField = styled(TextField)(() => ({
    outline: "0",
    width: "100%",
    // padding: '14px !important',
    boxSizing: "border-box",
    fontSize: "18px",
    marginTop: '10px',
    fontFamily: "Poppins",
    fontStyle: "normal",
    boxShadow: '2px 2px 8px #00000026 !important',
    border: '1px solid #DCDDDD',
    borderRadius: '6px',
}));

// export const MuiGridItem = styled()(() => ({
//     '& .MuiGrid-item': {
//         paddingTop: '10px',
//     }
// }));