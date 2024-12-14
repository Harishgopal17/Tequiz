import { useState, useContext } from "react";
import { IoMdSend } from "react-icons/io";
import { DetailsContext } from "./../App";
import contactussvg from "./../assets/icons/contactus.svg";

export default function Contact() {
  const { BaseUrl, setError } = useContext(DetailsContext);
  const [btnMove, setBtnMove] = useState(false);

  async function handleFormSubmit(name, email, message) {
    try {
      const res = await fetch(`${BaseUrl}/api/v1/users/submit-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setBtnMove(true);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div
      id="contact"
      className="w-full h-screen flex flex-col justify-center container max-xl:px-10 dark:bg-dark dark:text-light"
    >
      <div className="flex py-10">
        <h3 className="text-3xl font-bold">Contact</h3>
      </div>
      <div className="w-full grid grid-cols-1 gap-y-16 md:grid-cols-5 lg:gap-20">
        <div className="col-span-2 max-md:hidden">
          <img src={contactussvg} alt="contactussvg" />
        </div>
        <div className="col-span-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit(
                e.target.name.value,
                e.target.email.value,
                e.target.message.value
              );
            }}
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-2 text-lg font-semibold"
              >
                Name :
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                className="w-full md:w-[80%] p-2 border border-transparent bg-[#e6e6e6] focus:bg-[#f5f5f5] outline-none text-base rounded-md  focus:border-[#1f2129af] dark:bg-dark-bg dark:focus:bg-zinc-800 transition-all duration-300"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-lg font-semibold"
              >
                Email :
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@domain.com"
                className="w-full md:w-[80%] p-2 border border-transparent bg-[#e6e6e6] focus:bg-[#f5f5f5] outline-none text-base rounded-md  focus:border-[#1f2129af] dark:bg-dark-bg dark:focus:bg-zinc-800 transition-all duration-300"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block mb-2 text-lg font-semibold"
              >
                Message :
              </label>
              <textarea
                cols="30"
                rows="4"
                placeholder="Write something..."
                name="message"
                className="w-full md:w-[80%] p-2 border border-transparent bg-[#e6e6e6] focus:bg-[#f5f5f5] outline-none text-base rounded-md  focus:border-[#1f2129af] dark:bg-dark-bg dark:focus:bg-zinc-800 transition-all duration-300"
                required
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer border border-transparent relative h-10 w-24 overflow-hidden text-dark text-lg font-medium rounded-3xl bg-[#e6e6e6] transition-all duration-300  hover:border-slate-black hover:bg-white dark:hover:border-white"
            >
              <p
                className={
                  btnMove
                    ? `absolute top-[50%] -right-[100%] -translate-x-[50%] -translate-y-[50%]`
                    : `absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]`
                }
              >
                Send
              </p>
              <div
                className={
                  btnMove
                    ? `absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] transition-all duration-300`
                    : `absolute top-[50%] -left-[50%] -translate-x-[50%] -translate-y-[50%] transition-all duration-300`
                }
              >
                <IoMdSend size={25} />
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
