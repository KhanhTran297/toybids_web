import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button type="default" onClick={() => navigate("/admin/account")}>
        Login
      </Button>
    </div>
  );
};

export default LoginPage;
