// login.test.js
test("valida campos vacíos", async () => {
    const error = { email: "", password: "" };
    const formData = { email: "", password: "" };
  
    const handleSubmit = async (e) => {
      e.preventDefault?.();
      if (!formData.email) error.email = "Email Field is Required";
      if (!formData.password) error.password = "Password Field is required";
    };
  
    await handleSubmit({ preventDefault: () => {} });
  
    expect(error.email).toBe("Email Field is Required");
    expect(error.password).toBe("Password Field is required");
  });
  