import React, { useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Select from "components/Form/Select";
import Input from "components/Form/Input";

import useForm from "helpers/hooks/useForm";
import fieldErrors from "helpers/fieldError";

import users from "constants/api/users";
import media from "constants/api/media";

import { populateProfile } from "store/actions/users";

import image2base64 from "utils/image2base64";

import { ReactComponent as DefaultUser } from "assets/images/default-avatar.svg";

function SettingForm({ details }) {
  const dispatch = useDispatch();
  const addPicture = useRef(null);

  const [state, setKey, setState] = useForm({
    name: details?.name ?? "",
    email: details?.email ?? "",
    profession: details?.profession ?? "",
    avatar: details?.avatar ?? "",
    password: details?.password ?? "",
    otherProfession: details?.otherProfession ?? "",
  });

  const [errors, setErrors] = useState(null);

  function previewImage(e) {
    e.persist();
    image2base64(e.target.files[0]).then((image) => {
      setKey({
        target: {
          name: e.target.name,
          value: image,
        },
      });
    });
  }

  async function submit(e) {
    e.preventDefault();

    const payload = {
      name: state.name,
      email: state.email,
      password: state.password,
      profession: state.profession,
    };

    if (payload.profession === "others") {
      payload.profession = state.otherProfession;
    }

    if (state.avatar.indexOf("base64") > -1) {
      const avatar = await media.upload(state.avatar);
      payload.avatar = avatar.data.image;
    }

    users
      .update(payload)
      .then((res) => {
        toast.success("Profile updated");
        setState({
          ...state,
          password: "",
        });
        setErrors(null);
        dispatch(
          populateProfile({
            ...details,
            ...res.data,
          })
        );
      })
      .catch((err) => setErrors(err?.response?.data?.message ?? "errors"));
  }

  const ERRORS = fieldErrors(errors);
  return (
    <>
      <section className="flex flex-col mt-8">
        <div className="flex justify-start items-center -mx-5">
          <div className="w-auto text-center px-5">
            <div className="rounded-rull overflow-hidden w-24 h-24">
              {state.avatar ? (
                <img
                  className="object-cover w-full h-full"
                  src={state.avatar}
                  alt="Preview"
                />
              ) : (
                <DefaultUser
                  className="fill-indigo-500"
                  style={{ width: 90, height: 90 }}
                ></DefaultUser>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col">
            <span className="text-gray-600">Add your picture...</span>
            <div>
              <input
                type="file"
                className="hidden"
                name="avatar"
                ref={addPicture}
                onChange={previewImage}
              />
              <button
                onClick={() => addPicture.current.click()}
                className="bg-gray-300 hover:bg-gray-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-3"
              >
                Browse
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col mt-8">
        <div className="flex items-center pb-24">
          <div className="w-4/12">
            <form onSubmit={submit}>
              <Input
                value={state.name}
                error={ERRORS?.name?.message}
                name="name"
                type="text"
                onChange={setKey}
                placeholder="Your Name"
                labelName="Full Name"
              />

              <Input
                value={state.email}
                error={ERRORS?.email?.message}
                name="email"
                type="email"
                onChange={setKey}
                placeholder="Your Email Address"
                labelName="Email Address"
              />

              <Input
                value={state.password}
                error={ERRORS?.password?.message}
                name="password"
                type="password"
                onChange={setKey}
                placeholder="Your Password"
                labelName="Password"
              />

              <Select
                labelName="Occupation"
                name="profession"
                value={state.profession}
                fallbackText="Select Your Focus"
                onClick={setKey}
              >
                <option value="">Select Your Focus</option>
                <option value="Web Designer">Web Designer</option>
                <option value="Front End Developer">Front End Developer</option>
                <option value="Back End Developer">Back End Developer</option>
                <option value="others">Others</option>
              </Select>

              {state.profession === "others" && (
                <Input
                  value={state.otherProfession}
                  error={ERRORS?.otherProfession?.message}
                  name="otherProfession"
                  type="text"
                  onChange={setKey}
                  placeholder="Your occupation"
                  labelName="Other Occupation"
                />
              )}

              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4"
              >
                Simpan
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default withRouter(SettingForm);
