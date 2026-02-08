
const ValidatePassword = (password) => {
 if (password.length < 10) return { valid: false, msg: "En az 10 karakter olmalıdır." };
 if (!/[A-Z]/.test(password)) return { valid: false, msg: "En az bir büyük harf olmalıdır." };
 if (!/[0-9]/.test(password)) return { valid: false, msg: "En az bir rakam olmalıdır." };
 return { valid: true };
}

export default ValidatePassword
