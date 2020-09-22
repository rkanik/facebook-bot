
export const vRequired = msg => v => !!v || (msg || 'Field is Required!.')

export const vLength = (max, min = 0, msg) => v => {
    let valid = ((v || '').length >= min && (v || '').length <= max)
    return valid || (msg || `Max ${min} characters and Max ${max} characters`)
}

export const vEmail = (bool = true, msg) => email => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return bool ? pattern.test(email) : pattern.test(email) || (msg || `${email} is not a valid Email Address`)
}

export const vUrl = ({ returnBoolean = true, checkEmpty = true, message }) => url => {
    if (!checkEmpty && url.trim() === '') return true
    const pattern = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi
    return returnBoolean ? pattern.test(url) : pattern.test(url) || (message || `Invalid Url!`)
}