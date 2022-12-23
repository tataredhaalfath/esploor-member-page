import React, { useState } from "react";
import users from "constants/api/users";
import { withRouter } from "react-router-dom";

import useForm from "helpers/hooks/useForm";
import fieldErrors from "helpers/fieldError";

import Select from "components/Form/Select";
import Input from "components/Form/Input";

function RegisterForm({ history }) {
  const [{ name, email, password, profession, otherProfession }, setState] =
    useForm({
      name: "",
      email: "",
      password: "",
      profession: "",
      otherProfession: "",
    });

  const [errors, seterrors] = useState(null);

  function submit(e) {
    e.preventDefault();

    users
      .register({
        name,
        email,
        password,
        profession: profession === "others" ? otherProfession : profession,
      })
      .then((res) => {
        history.push("/login");
      })
      .catch((err) => {
        seterrors(err?.response?.data?.message);
        console.log(err);
      });
  }

  const ERRORS = fieldErrors(errors);

  return (
    <div className="flex justify-center items-center pb-24">
      <div className="w-3/12">
        <h1 className="text-4xl text-gray-900 mb-6">
          <span className="font-bold">Grow Skills</span> From, <br />
          Anywhere
        </h1>
        <form onSubmit={submit}>
          <Input
            value={name}
            error={ERRORS?.name?.message}
            name="name"
            type="text"
            onChange={setState}
            placeholder="Your Name"
            labelName="Full Name"
          />

          <Input
            value={email}
            error={ERRORS?.email?.message}
            name="email"
            type="email"
            onChange={setState}
            placeholder="Your Email Address"
            labelName="Email Address"
          />

          <Input
            value={password}
            error={ERRORS?.password?.message}
            name="password"
            type="password"
            onChange={setState}
            placeholder="Your Password"
            labelName="Password"
          />

          <Select
            labelName="Occupation"
            name="profession"
            value={profession}
            fallbackText="Select Your Focus"
            onClick={setState}
          >
            <option value="">Select Your Focus</option>
            <option value="Web Designer">Web Designer</option>
            <option value="Front End Developer">Front End Developer</option>
            <option value="Back End Developer">Back End Developer</option>
            <option value="others">Others</option>
          </Select>

          {profession === "others" && (
            <Input
              value={otherProfession}
              error={ERRORS?.otherProfession?.message}
              name="otherProfession"
              type="text"
              onChange={setState}
              placeholder="Your occupation"
              labelName="Other Occupation"
            />
          )}
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4 w-full"
          >
            Daftar
          </button>
        </form>
      </div>

      <div className="w-1/12"></div>
      <div className="w-5/12 flex justify-end pt-24 pr-16">
        <div className="relative" style={{ width: 369, height: 440 }}>
          <div
            className="absolute border-indigo-700 border-2 -mt-8 -ml-16 left-0"
            style={{ width: 324, height: 374 }}
          ></div>
          <div className="absolute w-full h-full -mb-8 -ml-8">
            <img src="/assets/images/register.jpg" alt="Hero Image" />
          </div>
          <div
            className="absolute z-10 bg-white bottom-0 right-0 py-3 px-4 -mr-12"
            style={{ width: 290 }}
          >
            <p className="text-gray-900 mb-2">
              Semua materi terstruktur baik dan mentor sangat lihai
            </p>
            <span className="text-gray-600">James, Apps Developer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(RegisterForm);
