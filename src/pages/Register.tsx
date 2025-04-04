import { useForm } from "react-hook-form";
import { Register as RegisterInput } from "../interfaces/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<RegisterInput>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterInput) => {
    try {
      data.confirmPassword = undefined;
      await axios.post(`http://localhost:3000/register`, data);
      toast.success("Đăng ký thành công");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  return (
    <div>
      <h1 className="text-black">Đăng ký</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label text-black">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            {...register("username", {
              required: "Không để trống Username"
            })}
          />
          {errors?.username && (
            <span className="text-danger">{errors?.username?.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-black">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            {...register("email", {
              required: "Không để trống email",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Sai định dạng email"
              }
            })}
          />
          {errors?.email && (
            <span className="text-danger">{errors?.email?.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label text-black">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register("password", {
              required: "Không để trống password",
              minLength: {
                value: 6,
                message: "Cần tối thiểu 6 ký tự"
              }
            })}
          />
          {errors?.password && (
            <span className="text-danger">{errors?.password?.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label text-black">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Không để trống Confirm password",
              validate: (value) => {
                return (
                  value == watch("password") ||
                  "Confirm password không trùng với password"
                );
              }
            })}
          />
          {errors?.confirmPassword && (
            <span className="text-danger">{errors?.confirmPassword?.message}</span>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
