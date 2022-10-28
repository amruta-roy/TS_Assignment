export function validatePassword(password: any) {
    const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return re.test(password);
  }
  
  export function validateName(name: any) {
    const re = /^[a-zA-Z0-9]{1,30}$/;
    // /^[A-Za-z]{1,30}$/;
    return re.test(name);
  }
  