"use client";
import React, { useState, useEffect } from "react";
import { BsInfoCircle } from "react-icons/bs";

interface SectionHeaderProps {
  step: string;
  title: string;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({ step, title }) => (
  <div className="pt-8">
    <div className="mb-4">
      <p className="text-sm text-gray-500">{step}</p>
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
    </div>
    <hr className="mb-6" />
  </div>
);

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  labelClassName?: string;
  inputClassName?: string;
}
const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  labelClassName = "",
  inputClassName = "",
}) => (
  <div className="mb-6">
    <div className="flex flex-col md:flex-row md:items-center">
      <label
        className={`md:w-1/2 block text-gray-700 text-sm font-medium mb-2 md:mb-0 ${labelClassName}`}
      >
        {label}
      </label>
      <div className={`md:w-1/2 ${inputClassName}`}>{children}</div>
    </div>
  </div>
);

const IndividualPage = () => {
  const [formData, setFormData] = useState({
    businessHistory: "first_time",
    hadABN: "no",
    oldAbn: "",
    activityLocation: "australia",
    abnReason: "starting_business",
    title: "Mr",
    givenNames: "",
    lastName: "",
    email: "",
    phone: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    tfn: "",
    isAustralianResident: true,
    homeAddress: "",
    isBusinessAtHome: "yes",
    serviceAddress: "home",
    serviceAddressOther: "",
    abnActiveDate: new Date().toISOString().split("T")[0],
    mainBusinessActivity: "",
    businessCategory: "",
    tradeUnderBusinessName: "yes",
    businessNameSearch: "",
    registerDomainName: "yes",
    domainNameSearch: "",
    registerForGST: "yes",
    declarationAccepted: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let checked = false;
    if (type === "checkbox") {
      checked = (e.target as HTMLInputElement).checked;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Custom styled radio button component
  interface RadioButtonProps {
    name: string;
    value: string;
    checkedValue: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    price?: string;
  }
  const RadioButton: React.FC<RadioButtonProps> = ({
    name,
    value,
    checkedValue,
    onChange,
    label,
    price,
  }) => (
    <label className="flex items-center cursor-pointer text-gray-700">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checkedValue === value}
        onChange={onChange}
        className="hidden"
      />
      <span className="w-5 h-5 inline-flex items-center justify-center mr-2 rounded-full border-2 border-gray-300 flex-shrink-0 transition-all duration-200">
        {checkedValue === value && (
          <span className="w-3 h-3 rounded-full bg-green-600"></span>
        )}
      </span>
      {label} {price && <span className="text-gray-500 ml-1">{price}</span>}
    </label>
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const {
      hadABN,
      oldAbn,
      givenNames,
      lastName,
      email,
      phone,
      dobDay,
      dobMonth,
      dobYear,
      tfn,
      homeAddress,
      serviceAddress,
      serviceAddressOther,
      mainBusinessActivity,
      businessCategory,
      tradeUnderBusinessName,
      businessNameSearch,
      registerDomainName,
      domainNameSearch,
      declarationAccepted,
    } = formData;

    if (hadABN === "yes" && !oldAbn.trim())
      newErrors.oldAbn = "Old ABN is required.";
    if (givenNames.trim().length < 2)
      newErrors.givenNames = "Given names must be at least 2 characters.";
    if (lastName.trim().length < 2)
      newErrors.lastName = "Last name must be at least 2 characters.";
    if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Please enter a valid email address.";
    if (!/^\+?[0-9\s-()]{8,}$/.test(phone))
      newErrors.phone = "Please enter a valid phone number.";
    if (!tfn.trim()) newErrors.tfn = "TFN is required.";
    if (!homeAddress.trim())
      newErrors.homeAddress = "Home address is required.";
    if (serviceAddress === "other" && !serviceAddressOther.trim())
      newErrors.serviceAddressOther = "Service address is required.";
    if (!mainBusinessActivity.trim())
      newErrors.mainBusinessActivity = "Main business activity is required.";
    if (!businessCategory.trim())
      newErrors.businessCategory = "Business category is required.";
    if (tradeUnderBusinessName === "yes" && !businessNameSearch.trim())
      newErrors.businessNameSearch = "Business name is required.";
    if (registerDomainName === "yes" && !domainNameSearch.trim())
      newErrors.domainNameSearch = "Domain name is required.";

    const day = parseInt(dobDay, 10);
    const month = parseInt(dobMonth, 10);
    const year = parseInt(dobYear, 10);
    if (!dobDay || !dobMonth || !dobYear) {
      newErrors.dob = "Date of birth is required.";
    } else {
      const date = new Date(year, month - 1, day);
      if (
        isNaN(day) ||
        isNaN(month) ||
        isNaN(year) ||
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day ||
        date > new Date()
      ) {
        newErrors.dob = "Please enter a valid date of birth.";
      }
    }

    if (!declarationAccepted)
      newErrors.declarationAccepted = "You must accept the declaration.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 ">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Individual ABN Registration Form
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (validate()) {
            console.log(
              "Form Data Submitted:",
              JSON.stringify(formData, null, 2)
            );
            // Here you would typically send the data to your backend API
          }
        }}
      >
        {/* Step 1: Your business details */}
        <SectionHeader step="Step 1 of 8" title="Your business details" />
        <FormField label="Business history:">
          <select
            name="businessHistory"
            value={formData.businessHistory}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          >
            <option value="first_time">
              This is my first time doing business in Australia
            </option>
            <option value="existing_business">
              I have been in business in Australia before
            </option>
          </select>
        </FormField>
        <FormField label="Have you had an ABN in the past?">
          <div className="flex flex-col space-y-2">
            <RadioButton
              name="hadABN"
              value="no"
              checkedValue={formData.hadABN}
              onChange={handleChange}
              label="No, I have never had an ABN as a sole trader."
            />
            <RadioButton
              name="hadABN"
              value="yes"
              checkedValue={formData.hadABN}
              onChange={handleChange}
              label="Yes, I have had an ABN as a sole trader before."
            />
            {formData.hadABN === "yes" && (
              <div className="flex items-center mt-2">
                <label className="mr-2 text-gray-700 whitespace-nowrap">
                  Enter your old ABN:
                </label>
                <input
                  type="text"
                  name="oldAbn"
                  placeholder="Australian Business Number"
                  value={formData.oldAbn || ""}
                  onChange={handleChange}
                  className={`w-72 p-2 border ${
                    errors.oldAbn ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-green-500`}
                />
                <BsInfoCircle
                  className="ml-2 text-green-600"
                  title="Your previous ABN as a sole trader, if known."
                />
              </div>
            )}
            {errors.oldAbn && (
              <p className="text-red-500 text-xs mt-1">{errors.oldAbn}</p>
            )}
          </div>
        </FormField>

        {/* Step 2: ABN Entitlement */}
        <SectionHeader step="Step 2 of 8" title="ABN Entitlement" />
        <FormField label="Where will your activities be carried out?">
          <div className="flex flex-col space-y-2">
            <RadioButton
              name="activityLocation"
              value="australia"
              checkedValue={formData.activityLocation}
              onChange={handleChange}
              label="Australia"
            />
            <RadioButton
              name="activityLocation"
              value="overseas"
              checkedValue={formData.activityLocation}
              onChange={handleChange}
              label="Overseas"
            />
          </div>
        </FormField>
        <FormField label="Why do you need an ABN?">
          <select
            name="abnReason"
            value={formData.abnReason}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          >
            <option value="starting_business">
              Starting or running a business
            </option>
            <option value="renting_leasing">
              Renting or leasing out a residential property on a regular or
              continuous basis
            </option>
            <option value="license_lease_interest">
              A license, lease or other grant of an interest in property on a
              regular or continuous basis
            </option>
            <option value="one_off_transaction">
              One-off commercial transactions not done in the course of a
              business for a profit or gain
            </option>
            <option value="labourer_apprentice">
              Labourer, Apprentice or Trade Assistant
            </option>
          </select>
        </FormField>

        {/* Step 3: Sole trader's details */}
        <SectionHeader step="Step 3 of 8" title="Sole trader's details" />
        <FormField label="Full name:">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <select
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="md:col-span-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            >
              <option>Mr</option>
              <option>Mrs</option>
              <option>Miss</option>
              <option>Ms</option>
            </select>
            <div className="md:col-span-5">
              <input
                type="text"
                name="givenNames"
                placeholder="Given names"
                value={formData.givenNames}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.givenNames ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-green-500`}
              />
              {errors.givenNames && (
                <p className="text-red-500 text-xs mt-1">{errors.givenNames}</p>
              )}
            </div>
            <div className="md:col-span-5">
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-green-500`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>
        </FormField>
        <FormField label="Your email:">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:ring-2 focus:ring-green-500`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </FormField>
        <FormField label="Phone number:">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } rounded-md focus:ring-2 focus:ring-green-500`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </FormField>
        <FormField label="Date of birth:">
          <div>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                name="dobDay"
                placeholder="DD"
                value={formData.dobDay}
                onChange={handleChange}
                className={`p-2 border ${
                  errors.dob ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-green-500`}
              />
              <input
                type="text"
                name="dobMonth"
                placeholder="MM"
                value={formData.dobMonth}
                onChange={handleChange}
                className={`p-2 border ${
                  errors.dob ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-green-500`}
              />
              <input
                type="text"
                name="dobYear"
                placeholder="YYYY"
                value={formData.dobYear}
                onChange={handleChange}
                className={`p-2 border ${
                  errors.dob ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-green-500`}
              />
            </div>
            {errors.dob && (
              <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
            )}
          </div>
        </FormField>
        <FormField label="Tax File Number (TFN):">
          <div className="relative">
            <input
              type="text"
              name="tfn"
              value={formData.tfn}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.tfn ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 focus:ring-green-500`}
            />
            <BsInfoCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          {errors.tfn && (
            <p className="text-red-500 text-xs mt-1">{errors.tfn}</p>
          )}
        </FormField>
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="isAustralianResident"
            name="isAustralianResident"
            checked={formData.isAustralianResident}
            onChange={handleChange}
            className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label
            htmlFor="isAustralianResident"
            className="ml-2 block text-sm text-gray-900"
          >
            I am an Australian resident for tax purposes.
          </label>
        </div>

        {/* Step 4: Business Location */}
        <SectionHeader step="Step 4 of 8" title="Business Location" />
        <FormField label="Home address:">
          <input
            type="text"
            name="homeAddress"
            placeholder="Type here to start searching address"
            value={formData.homeAddress}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.homeAddress ? "border-red-500" : "border-gray-300"
            } rounded-md focus:ring-2 focus:ring-green-500`}
          />
          {errors.homeAddress && (
            <p className="text-red-500 text-xs mt-1">{errors.homeAddress}</p>
          )}
        </FormField>
        <FormField label="Is your business located at your home address?">
          <div className="flex space-x-4">
            <RadioButton
              name="isBusinessAtHome"
              value="yes"
              checkedValue={formData.isBusinessAtHome}
              onChange={handleChange}
              label="Yes"
            />
            <RadioButton
              name="isBusinessAtHome"
              value="no"
              checkedValue={formData.isBusinessAtHome}
              onChange={handleChange}
              label="No"
            />
          </div>
        </FormField>
        <FormField label="What is your address for service of documents?">
          <div className="flex space-x-4 items-center">
            <RadioButton
              name="serviceAddress"
              value="home"
              checkedValue={formData.serviceAddress}
              onChange={handleChange}
              label="Home"
            />
            <RadioButton
              name="serviceAddress"
              value="other"
              checkedValue={formData.serviceAddress}
              onChange={handleChange}
              label="Other"
            />
            {formData.serviceAddress === "other" && (
              <input
                type="text"
                name="serviceAddressOther"
                placeholder="Type here to start searching address"
                value={formData.serviceAddressOther || ""}
                onChange={handleChange}
                className={`ml-4 w-96 p-2 border ${
                  errors.serviceAddressOther
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-green-500`}
              />
            )}
          </div>
          {errors.serviceAddressOther && (
            <p className="text-red-500 text-xs mt-1 md:w-1/2 md:ml-auto">
              {errors.serviceAddressOther}
            </p>
          )}
        </FormField>

        {/* Step 5: ABN Registration details */}
        <SectionHeader step="Step 5 of 8" title="ABN Registration details" />
        <FormField label="ABN active date:">
          <input
            type="date"
            name="abnActiveDate"
            value={formData.abnActiveDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          />
        </FormField>
        <FormField label="Main business activity:">
          <input
            type="text"
            name="mainBusinessActivity"
            value={formData.mainBusinessActivity}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.mainBusinessActivity ? "border-red-500" : "border-gray-300"
            } rounded-md focus:ring-2 focus:ring-green-500`}
          />
          {errors.mainBusinessActivity && (
            <p className="text-red-500 text-xs mt-1">
              {errors.mainBusinessActivity}
            </p>
          )}
        </FormField>
        <FormField label="Business Category:">
          <input
            type="text"
            name="businessCategory"
            placeholder="Please select the category that best describes your business"
            value={formData.businessCategory}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.businessCategory ? "border-red-500" : "border-gray-300"
            } rounded-md focus:ring-2 focus:ring-green-500`}
          />
          {errors.businessCategory && (
            <p className="text-red-500 text-xs mt-1">
              {errors.businessCategory}
            </p>
          )}
        </FormField>

        {/* Step 6: Business Name Application */}
        <SectionHeader step="Step 6 of 8" title="Business Name Application" />
        <FormField label="Will you trade under a business name?">
          <div className="flex flex-col space-y-4">
            <RadioButton
              name="tradeUnderBusinessName"
              value="yes"
              checkedValue={formData.tradeUnderBusinessName}
              onChange={handleChange}
              label="Yes, the business name I need is ..."
            />
            {formData.tradeUnderBusinessName === "yes" && (
              <div className="pl-6 flex items-center space-x-2">
                <input
                  type="text"
                  name="businessNameSearch"
                  placeholder="Type here to start searching"
                  value={formData.businessNameSearch}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.businessNameSearch
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-green-500`}
                />
                <button
                  type="button"
                  className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors"
                >
                  CHECK NAME
                </button>
              </div>
            )}
            {errors.businessNameSearch && (
              <p className="text-red-500 text-xs mt-1 pl-6">
                {errors.businessNameSearch}
              </p>
            )}
            <RadioButton
              name="tradeUnderBusinessName"
              value="no"
              checkedValue={formData.tradeUnderBusinessName}
              onChange={handleChange}
              label="No, I will trade under my full name."
            />
          </div>
        </FormField>

        {/* Step 7: Domain Name Registration */}
        <SectionHeader step="Step 7 of 8" title="Domain Name Registration" />
        <FormField label="Do you want to register a domain name for your business name?">
          <div className="flex flex-col space-y-4">
            <RadioButton
              name="registerDomainName"
              value="yes"
              checkedValue={formData.registerDomainName}
              onChange={handleChange}
              label="Yes, the domain name I need is ..."
            />
            {formData.registerDomainName === "yes" && (
              <div className="pl-6 flex items-center space-x-2">
                <input
                  type="text"
                  name="domainNameSearch"
                  placeholder="Type domain name to search here"
                  value={formData.domainNameSearch}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.domainNameSearch
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-green-500`}
                />
                <button
                  type="button"
                  className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors"
                >
                  SEARCH
                </button>
              </div>
            )}
            {errors.domainNameSearch && (
              <p className="text-red-500 text-xs mt-1 pl-6">
                {errors.domainNameSearch}
              </p>
            )}
            <RadioButton
              name="registerDomainName"
              value="no"
              checkedValue={formData.registerDomainName}
              onChange={handleChange}
              label="No, I don't want a domain name for my business."
            />
          </div>
        </FormField>

        {/* Step 8: GST Registration */}
        <SectionHeader step="Step 8 of 8" title="GST Registration" />
        <FormField label="Will you register for GST?">
          <div className="flex space-x-6">
            <RadioButton
              name="registerForGST"
              value="yes"
              checkedValue={formData.registerForGST}
              onChange={handleChange}
              label="Yes"
              price="($69)"
            />
            <RadioButton
              name="registerForGST"
              value="no"
              checkedValue={formData.registerForGST}
              onChange={handleChange}
              label="No"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Recommended</p>
        </FormField>

        {/* Declaration */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Your Declaration And Important Information
          </h3>
          <div className="p-4 border border-gray-300 rounded-md bg-gray-50 max-h-40 overflow-y-auto text-sm text-gray-600">
            <p>
              By submitting this form, I declare that Business Switch Pty Ltd
              (ABN 63 134 235 304) is authorised to submit an ABN application to
              the Australian Tax Office on my behalf and to do so as my
              registered tax agent, and if necessary, submit a Business Name
              application to the Australian Securities & Investments Commission
              (ASIC). I understand that Business Switch will utilise information
              supplied by me in this form to apply for an ABN, and if necessary,
              will remain my ASIC agent and notify me when my business name is
              due for renewal.
            </p>
          </div>
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="declarationAccepted"
              name="declarationAccepted"
              checked={formData.declarationAccepted}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label
              htmlFor="declarationAccepted"
              className="ml-2 block text-sm text-gray-900"
            >
              I have read and accept the declaration and{" "}
              <a href="#" className="text-green-600 hover:underline">
                Terms of Service
              </a>
            </label>
          </div>
          {errors.declarationAccepted && (
            <p className="text-red-500 text-xs mt-1">
              {errors.declarationAccepted}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-10 text-center">
          <button
            type="submit"
            className="bg-green-600 text-white font-bold py-3 px-12 rounded-md hover:bg-green-700 transition-colors text-lg"
          >
            CONTINUE
          </button>
        </div>
      </form>
    </div>
  );
};

export default IndividualPage;
