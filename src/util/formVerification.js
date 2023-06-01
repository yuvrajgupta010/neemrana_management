export const loginInputVerification = (data) => {
  const { email, password } = data;
  let returnStatement = { error: false, message: "" };
  if (!email.trim()) {
    returnStatement.error = true;
    returnStatement.message = "Please enter valid email!";
  } else if (password.trim().length < 6) {
    returnStatement.error = true;
    returnStatement.message = "Please enter password more than lenght of 6 !";
  }
  return returnStatement;
};
