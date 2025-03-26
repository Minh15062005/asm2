import { useForm } from 'react-hook-form';
import { Register as RegisterInput } from '../interfaces/user';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterInput>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterInput) => {
    try {
      await axios.post('http://localhost:3000/register', { ...data, confirmPassword: undefined });
      toast.success('Đăng ký thành công');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data || 'Đăng ký thất bại');
    }
  };

  return (
    <div>
      <h1>Đăng ký</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {[
          { id: 'username', label: 'Username', type: 'text', rules: { required: 'Không để trống Username' } },
          { id: 'email', label: 'Email address', type: 'text', rules: { required: 'Không để trống email', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Sai định dạng email' } } },
          { id: 'password', label: 'Password', type: 'password', rules: { required: 'Không để trống password', minLength: { value: 6, message: 'Cần tối thiểu 6 ký tự' } } },
          { id: 'confirmPassword', label: 'Confirm Password', type: 'password', rules: { required: 'Không để trống Confirm password', validate: (value: string) => value === watch('password') || 'Confirm password không trùng với password' } }
        ].map(({ id, label, type, rules }) => (
          <div key={id} className="mb-3">
            <label htmlFor={id} className="form-label">{label}</label>
            <input type={type} className="form-control" id={id} {...register(id as keyof RegisterInput, rules)} />
            {errors[id as keyof RegisterInput] && <span className="text-danger">{errors[id as keyof RegisterInput]?.message}</span>}
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Register;
