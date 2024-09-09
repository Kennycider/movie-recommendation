export const signupValidations = {
  username: {
    message: "Username is invalid",
    min: 'Username must contain at least 3 characters',
    max: 'Username max characters are less than 50',
  },
  password: {
    message: "Password is invalid",
    min: 'Password must contain at least 6 characters',
    max: 'Password max characters are less than 50',
    regex: {
      value: ".*[A-Z].*",
      message: "Password must contain atleast one uppercase character."
    }
  },
  confirm: {
    message: "Passwords don't match",
    path: ["confirm"],
  }
}

export const createItemValidations = {
  name: {
    message: "Name is invalid",
    min: 'Name must contain at least 3 characters',
    max: 'Name max characters are less than 20',
  },
  description: {
    message: "Description is invalid",
    min: 'Description must contain at least 3 characters',
    max: 'Description max characters are less than 200',
  },
  price: {
    message: "Price is invalid",
    min: 'Price must be greater than 0',
    max: 'Price must be less than 100000',
  }
}