var d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
];
var p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
];
var inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];
function invArray(array) {

    if (Object.prototype.toString.call(array) === "[object Number]") {
        array = String(array);
    }

    if (Object.prototype.toString.call(array) === "[object String]") {
        array = array.split("").map(Number);
    }

    return array.reverse();

}

export const validateAadhar = (value) => {
    let error = false;
    if (!value) {
        error = true
    } else if (isNaN(value) === false && value.length === 12) {
        var c = 0;
        var invertedArray = invArray(value);
        for (var i = 0; i < invertedArray.length; i++) {
            c = d[c][p[(i % 8)][invertedArray[i]]];
        }
        if (c !== 0) {
            error = true
        }
    } else {
        error = true
    }
    return error
}

export function validateUserName(value) {
    let error = "";
    let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[._]).{8,}$/i;
    if (!value) {
        error = 'Username is required'
    } else if (!regex.test(value)) {
        error = 'Invalid Username';
    }
    return error;
}

export function validatePhone(value) {
    let error = '';
    if (!value) {
        error = 'Phone is required';
    } else if (!/^[0-9]{10,10}$/i.test(value)) {
        error = 'Please enter Phone Number';
    }
    return error;
}

export function validateEmail(value) {
    let error = '';
    if (!value) {
        error = 'Email is required';
    } else if (!/^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(value)) {
        error = 'Please enter an email address';
    }
    else if (value.toLowerCase().startsWith('gmail.com')) {
        error = 'Email should not start with the domain name'
    }
    return error;
}


export function validateIFSCode(value) {
    let error;
    if (!value) {
        error = 'IFS Code is Required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(value)) {
        error = 'Invalid IFS Code';
    }
    return error;
}


export const validatePassword = (value) => {
    let error = "";

    if (!value) {
        error = "Password is required"
    }

    const isNonWhiteSpace = /^\S*$/;
    // const isNonWhiteSpace = /\s/; // for not white spaces
    if (!isNonWhiteSpace.test(value)) {
        error = "Password must not contain Whitespaces.";
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
        error = "Password must have at least one Uppercase Character.";
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
        error = "Password must have at least one Lowercase Character.";
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
        error = "Password must contain at least one Digit.";
    }

    const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(value)) {
        error = "Password must contain at least one Special Symbol.";
    }

    const isValidLength = /^.{6,16}$/;
    if (!isValidLength.test(value)) {
        error = "Password must be 6-10 Characters Long.";
    }
    return error;
}

export const validateconfirmPassword = (password, confirm_password) => {
    let error;
    if (!confirm_password) {
        error = "Confirm Password is required"
    } else if (confirm_password !== password) {
        error = 'Password not Matched'
    }
    return error
};

export const validateMobile = (value) => {
    let error;
    var regx = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
    if (!value) {
        error = "Please Enter Number Only"
    } else if (!regx.test(value)) {
        error = 'Please enter valid  Mobile Number.'
    }
    else if (value.length != 10) {
        error = 'Enter a valid Mobile Number'
    }
    return error;
};


// export const validateAadhar = (value) => {
//     let error;
//     var regx = /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/;
//     if (!value) {
//         error = "Aadhar is required"
//     }
//     else if (!regx.test(value)) {
//         error = "Invalid Aadhar Number"
//     }
//     return error;
// };


export const validateGSTN = (value) => {
    let error;
    var regx = /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/;
    if (!value) {
        error = "GSTN number is required";
    } else if (!regx.test(value)) {
        error = "Invalid GST Number"
    }
    return error;
};


export const RegisterNumber = (value) => {
    let error;
    var regex = /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/;
    if (!value) {
        error = "Registration number is required";
    } else if (!regex.test(value)) {
        error = "Invalid Registration Number"
    }
    return error;
};


export const validatePassport = (value) => {
    let error;
    var regex = /^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]$/;
    if (!value) {
        error = "Passport is required"
    } else if (!regex.test(value)) {
        error = 'Invalid Passport Number'
    }
    return error;
};


export const validatePanNumber = (value) => {
    let error;
    var regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!value) {
        error = 'Pan Number is required'
    } else if (!regex.test(value)) {
        error = 'Invalid Pan Number';
    }
    return error;
};


// export const validatePinCode = (value) => {
//     let error;
//     var regex = /^(\d{4}|\d{6})$/;
//     if (!value) {
//         error = 'Pin Code is required';
//     } else if (!regex.test(value)) {
//         error = 'Invalid Pin Code'
//     }
//     return error;
// };

export const ValidData = (objectName) => {
    let error = '';
    if (!Object.keys(objectName).length) {
        return true;
    }
    return true;
};

export const validateBlank = (value) => {
    if (!value) {
        return 'Required';
    }
    return undefined;

}

export const ValidationSchema = (type, validate, value, isRequired = false) => {
    var error = '';
    switch (type) {
        case 'dropdown':
            if (value.length <= 0)
                error = "Please select a value"
            return error;
        default:
            error = validateBlank(value);
            if (!!error && isRequired) return error;
            switch (validate) {
                case 'validateName':
                    if (!/^[a-zA-Z0-9._]{3,16}$/i.test(value))
                        error = "Invalid username"
                    return error;

                case 'validateEmail':
                    if (!new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value))
                        error = "Enter a valid email address"
                    return error;

                case 'validatePhone':
                    if (!new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i).test(value)) {
                        error = "Please enter a valid phone number"
                    }
                    else if (value.length != 10) {
                        error = 'Enter only 10 digit Number'
                    }
                    return error;

                case 'validateDob':
                    if (!new RegExp(/^(\d{1,2})-(\d{1,2})-(\d{4})$/).test(value))
                        error = "Invalid Date format"
                    return error;

                case 'validateEmploinId':
                    if (!/^[a-zA-Z0-9$-]{6,36}$/i.test(value))
                        error = "Invalid Emploin Id"
                    return error;

                case 'validateAadhar':
                    var c = 0;
                    var invertedArray = invArray(value);
                    for (var i = 0; i < invertedArray.length; i++) {
                        c = d[c][p[(i % 8)][invertedArray[i]]];
                    }
                    if (c !== 0) {
                        error = 'Invalid Aadhar Number'
                    }
                    return error;

                case 'validateUserName':
                    if (!/^[a-zA-Z0-9._]{3,40}$/i.test(value)) {
                        error = 'Invalid Username';
                    }
                    return error;

                case 'validateURL':
                    if (!/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi.test(value)) {
                        error = 'Invalid URL';
                    }
                    return error;

                case 'validateIFSCode':
                    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(value)) {
                        error = 'Invalid IFS Code';
                    }
                    return error;

                case 'validatePassword':
                    return validatePassword(value);

                case 'validateGSTN':
                    if (/(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/) {
                        error = 'Invalid GSTN Number';
                    }
                    return error;
                case 'RegisterNumber':
                    if (/(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/) {
                        error = 'Invalid Register Number';
                    }
                    return error;
                case 'validatePassport':
                    if (/^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]$/) {
                        error = 'Invalid Validate Passport';
                    }
                    return error;
                case 'validatePanNumber':
                    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
                        error = 'Invalid Pan Number';
                    }
                    return error;
                case 'validatePinCode':
                    if (!/^(\d{6})$/.test(value)) {
                        error = 'Invalid Pincode';
                    }
                    return error;
                case 'validateCGPA':
                    if (!/^\d\.\d$/.test(value)) {
                        error = 'Invalid CGPA';
                    }
                    return error;
                case 'validateBlank':
                    if (!value) {
                        error = 'Required';
                    }

                default:
                    return undefined;

            }
            break;
    }
    return error;
}