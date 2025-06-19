import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import LoadingContext from "@/context/Loader/LoadingContext";

const LoginSignup = () => {
  const loadContext = useContext(LoadingContext);
  const { showLoading, hideLoading, isLoading } = loadContext;
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const [registerCredentials, setregisterCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const onRegisterChange = (e) => {
    setregisterCredentials({
      ...registerCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    showLoading();

    try {
      const response = await fetch(
        "https://pft-backend-wine.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );
      const json = await response.json();

      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem("token", json.authToken);
        navigate("/");
        toast.success("Logged In Successfully");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your network connection.");
    } finally {
      hideLoading();
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    showLoading();

    try {
      const response = await fetch(
        "https://pft-backend-wine.vercel.app/api/auth/createUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: registerCredentials.name,
            email: registerCredentials.email,
            password: registerCredentials.password,
          }),
        }
      );
      const json = await response.json();

      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem("token", json.authToken);
        navigate("/");
        toast.success("Account Created");
      } else {
        toast.error(json.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please check your network connection.");
    } finally {
      hideLoading();
    }
  };
  return (
    <div className="flex mt-30 w-full justify-center items-center ">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue="login">
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        value={credentials.email}
                        onChange={onChange}
                        name="email"
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        value={credentials.password}
                        name="password"
                        onChange={onChange}
                        id="password"
                        placeholder="Enter password"
                        type="password"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full mt-6">
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Register your account</CardTitle>
                <CardDescription>
                  Enter your details below to register your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        value={registerCredentials.name}
                        name="name"
                        onChange={onRegisterChange}
                        id="name"
                        type="text"
                        placeholder="Enter name"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        value={registerCredentials.email}
                        name="email"
                        onChange={onRegisterChange}
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        value={registerCredentials.password}
                        name="password"
                        onChange={onRegisterChange}
                        id="password"
                        placeholder="Enter password"
                        type="password"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full mt-6">
                    Register
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginSignup;
