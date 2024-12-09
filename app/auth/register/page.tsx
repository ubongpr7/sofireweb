'use client';

import { useState,changeEvent } from "react";
import Link from "next/link";
import { useRegisterMutation } from "@/redux/features/authApiSlice";
export default function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const {register,{isLoading}}=useRegisterMutation()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.re_password) {
      alert("Passwords do not match!");
      return;
    }
    register({formData.first_name,formData.last_name,formData.email,formData.password,formData.re_password})
    .unwrap()
    .then(()=>{
      alert("Registration successful!")
    })
    .catch(()=>{

    })
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="re_password">Confirm Password:</label>
          <input
            type="password"
            name="re_password"
            id="re_password"
            value={formData.re_password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#0070f3",
            color: "white",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
          }}
        >
          
          Register
        </button>
        <div>
          <span>Already have an account? </span><Link href="/auth/login" >Login here</Link>

          </div>
      </form>
    </div>
  );
}
