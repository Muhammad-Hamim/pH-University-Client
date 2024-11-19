// src/Login.tsx
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { Row } from "antd";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const defaultValues = {
    id: "A-0001",
    password: "hamim.ml",
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("logging in...");
    console.log(data);
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId });
      navigate(
        `/${user.role === "superAdmin" ? "admin" : user.role}/dashboard`
      );
    } catch {
      toast.error("something went wrong", { id: toastId });
    }
  };

  return (
    <Row align="middle" justify="center" style={{ height: "100vh" }}>
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
        <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
          {/* Email Input */}
          <div style={{ marginBottom: "15px" }}>
            <PHInput type="text" name="id" label="userId" />
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: "15px" }}>
            <PHInput type="password" name="password" label="Password" />
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
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </PHForm>
      </div>
    </Row>
  );
};

export default Login;
