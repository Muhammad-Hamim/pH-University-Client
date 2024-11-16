// src/Login.tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { setUser } from "../redux/features/auth/authSlice";

interface LoginFormInputs {
  id: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const res = await login(data).unwrap();
    const user = verifyToken(res.data.accessToken);
    dispatch(setUser({ user, token: res.data.accessToken }));
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Input */}
        <div style={{ marginBottom: "15px" }}>
          <label>ID:</label>
          <input
            type="id"
            {...register("id", {
              required: "id is required",
            })}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          {errors.id && (
            <span style={{ color: "red" }}>{errors.id.message}</span>
          )}
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: "15px" }}>
          <label>Password:</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
