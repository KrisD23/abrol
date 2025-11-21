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

const PartnershipPage = () => {
  const [partners, setPartners] = useState([
    {
      type: "Individual",
      title: "Mr",
      givenNames: "",
      lastName: "",
      email: "",
      phone: "",
      dobDay: "",
      dobMonth: "",
      dobYear: "",
      countryOfBirth: "Australia",
      stateOfBirth: "New South Wales",
      cityOfBirth: "",
      tfn: "",
      homeAddress: "",
      isAustralianResident: true,
      declarationAccepted: false,
    },
    {
      type: "Individual",
      title: "Mr",
      givenNames: "",
      lastName: "",
      email: "",
      phone: "",
      dobDay: "",
      dobMonth: "",
      dobYear: "",
      countryOfBirth: "Australia",
      stateOfBirth: "New South Wales",
      cityOfBirth: "",
      tfn: "",
      homeAddress: "",
      isAustralianResident: true,
      declarationAccepted: false,
    },
  ]);
  const [formData, setFormData] = useState({
    activityLocation: "australia",
    abnReason: "starting_business",
    businessAddress: "",
    serviceAddress: "business",
    serviceAddressOther: "",
    abnActiveDate: new Date().toISOString().split("T")[0],
    mainBusinessActivity: "",
    businessCategory: "",
    businessHistory: "first_time",
    partnersRelated: "no",
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
    // formData validation
    if (!formData.businessAddress.trim())
      newErrors.businessAddress = "Business address is required.";
    if (
      formData.serviceAddress === "other" &&
      !formData.serviceAddressOther.trim()
    )
      newErrors.serviceAddressOther = "Service address is required.";
    if (
      !formData.mainBusinessActivity.trim() ||
      !formData.businessCategory.trim()
    )
      if (!formData.mainBusinessActivity.trim())
        newErrors.mainBusinessActivity = "Main business activity is required.";
    if (!formData.businessCategory.trim())
      newErrors.businessCategory = "Business category is required.";
    if (
      formData.tradeUnderBusinessName === "yes" &&
      !formData.businessNameSearch.trim()
    )
      newErrors.businessNameSearch = "Business name is required.";
    if (
      formData.registerDomainName === "yes" &&
      !formData.domainNameSearch.trim()
    )
      newErrors.domainNameSearch = "Domain name is required.";

    // partners validation
    partners.forEach((partner, idx) => {
      if (partner.givenNames.trim().length < 2)
        newErrors[`givenNames-${idx}`] = "Must be at least 2 characters.";
      if (partner.lastName.trim().length < 2)
        newErrors[`lastName-${idx}`] = "Must be at least 2 characters.";
      if (!/^\S+@\S+\.\S+$/.test(partner.email))
        newErrors[`email-${idx}`] = "Please enter a valid email.";
      if (!/^\+?[0-9\s-()]{8,}$/.test(partner.phone))
        newErrors[`phone-${idx}`] = "Please enter a valid phone number.";
      if (!partner.cityOfBirth.trim())
        newErrors[`cityOfBirth-${idx}`] = "City of birth is required.";
      if (!partner.tfn.trim()) newErrors[`tfn-${idx}`] = "TFN is required.";
      if (!partner.homeAddress.trim())
        newErrors[`homeAddress-${idx}`] = "Home address is required.";

      const day = parseInt(partner.dobDay, 10);
      const month = parseInt(partner.dobMonth, 10);
      const year = parseInt(partner.dobYear, 10);
      if (!partner.dobDay || !partner.dobMonth || !partner.dobYear) {
        newErrors[`dob-${idx}`] = "Date of birth is required.";
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
          newErrors[`dob-${idx}`] = "Please enter a valid date.";
        }
      }
    });

    if (!formData.declarationAccepted)
      newErrors.declarationAccepted = "You must accept the declaration.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 ">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Partnership ABN Registration Form
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (validate()) {
            const submissionData = { formData, partners };
            console.log(
              "Form Data Submitted:",
              JSON.stringify(submissionData, null, 2)
            );
            // Here you would typically send the data to your backend API
          }
        }}
      >
        {/* Step 1: ABN Entitlement */}
        <SectionHeader step="Step 1 of 7" title="ABN Entitlement" />
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
          </select>
        </FormField>

        {/* Step 2: Partnership Details */}
        <SectionHeader step="Step 2 of 7" title="Partnership Details" />
        {partners.map((partner, idx) => (
          <div key={idx} className="mb-8 border-b pb-6">
            <h3 className="text-lg font-semibold mb-2">
              {(() => {
                const ordinals = [
                  "First",
                  "Second",
                  "Third",
                  "Fourth",
                  "Fifth",
                  "Sixth",
                  "Seventh",
                  "Eighth",
                  "Ninth",
                  "Tenth",
                ];
                return `${ordinals[idx] || `${idx + 1}th`} partner's details`;
              })()}
            </h3>
            <FormField label="Type:">
              <select
                name={`type-${idx}`}
                value={partner.type}
                onChange={(e) => {
                  const newPartners = [...partners];
                  newPartners[idx].type = e.target.value;
                  setPartners(newPartners);
                }}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              >
                <option>Individual</option>
                <option>Company</option>
              </select>
            </FormField>
            <FormField label="Full name:">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <select
                  name={`title-${idx}`}
                  value={partner.title}
                  onChange={(e) => {
                    const newPartners = [...partners];
                    newPartners[idx].title = e.target.value;
                    setPartners(newPartners);
                  }}
                  className="md:col-span-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                >
                  <option>Mr</option>
                  <option>Mrs</option>
                  <option>Miss</option>
                  <option>Ms</option>
                </select>
                <input
                  type="text"
                  name={`givenNames-${idx}`}
                  placeholder="Given names"
                  value={partner.givenNames}
                  onChange={(e) => {
                    const newPartners = [...partners];
                    newPartners[idx].givenNames = e.target.value;
                    setPartners(newPartners);
                  }}
                  className={`md:col-span-5 p-2 border ${
                    errors[`givenNames-${idx}`]
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-green-500`}
                />
                {errors[`givenNames-${idx}`] && (
                  <p className="text-red-500 text-xs mt-1 md:col-span-5">
                    {errors[`givenNames-${idx}`]}
                  </p>
                )}
                <input
                  type="text"
                  name={`lastName-${idx}`}
                  placeholder="Last name"
                  value={partner.lastName}
                  onChange={(e) => {
                    const newPartners = [...partners];
                    newPartners[idx].lastName = e.target.value;
                    setPartners(newPartners);
                  }}
                  className={`md:col-span-5 p-2 border ${
                    errors[`lastName-${idx}`]
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-green-500`}
                />
                {errors[`lastName-${idx}`] && (
                  <p className="text-red-500 text-xs mt-1 md:col-span-5">
                    {errors[`lastName-${idx}`]}
                  </p>
                )}
              </div>
            </FormField>
            <FormField label="Your email:">
              <input
                type="email"
                name={`email-${idx}`}
                value={partner.email}
                onChange={(e) => {
                  const newPartners = [...partners];
                  newPartners[idx].email = e.target.value;
                  setPartners(newPartners);
                }}
                className={`w-full p-2 border ${
                  errors[`email-${idx}`] ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-green-500`}
              />
              {errors[`email-${idx}`] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[`email-${idx}`]}
                </p>
              )}
            </FormField>
            <FormField label="Phone number:">
              <input
                type="tel"
                name={`phone-${idx}`}
                value={partner.phone}
                onChange={(e) => {
                  const newPartners = [...partners];
                  newPartners[idx].phone = e.target.value;
                  setPartners(newPartners);
                }}
                className={`w-full p-2 border ${
                  errors[`phone-${idx}`] ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-green-500`}
              />
              {errors[`phone-${idx}`] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[`phone-${idx}`]}
                </p>
              )}
            </FormField>
            <FormField label="Date of birth:">
              <div>
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    name={`dobDay-${idx}`}
                    placeholder="DD"
                    value={partner.dobDay}
                    onChange={(e) => {
                      const newPartners = [...partners];
                      newPartners[idx].dobDay = e.target.value;
                      setPartners(newPartners);
                    }}
                    className={`p-2 border ${
                      errors[`dob-${idx}`]
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:ring-2 focus:ring-green-500`}
                  />
                  <input
                    type="text"
                    name={`dobMonth-${idx}`}
                    placeholder="MM"
                    value={partner.dobMonth}
                    onChange={(e) => {
                      const newPartners = [...partners];
                      newPartners[idx].dobMonth = e.target.value;
                      setPartners(newPartners);
                    }}
                    className={`p-2 border ${
                      errors[`dob-${idx}`]
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:ring-2 focus:ring-green-500`}
                  />
                  <input
                    type="text"
                    name={`dobYear-${idx}`}
                    placeholder="YYYY"
                    value={partner.dobYear}
                    onChange={(e) => {
                      const newPartners = [...partners];
                      newPartners[idx].dobYear = e.target.value;
                      setPartners(newPartners);
                    }}
                    className={`p-2 border ${
                      errors[`dob-${idx}`]
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:ring-2 focus:ring-green-500`}
                  />
                </div>
                {errors[`dob-${idx}`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`dob-${idx}`]}
                  </p>
                )}
              </div>
            </FormField>
            <FormField label="Country of birth:">
              <select
                name={`countryOfBirth-${idx}`}
                value={partner.countryOfBirth}
                onChange={(e) => {
                  const newPartners = [...partners];
                  newPartners[idx].countryOfBirth = e.target.value;
                  setPartners(newPartners);
                }}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              >
                <option>Australia</option>
                <option>Other</option>
              </select>
            </FormField>
            <FormField label="State of birth:">
              <select
                name={`stateOfBirth-${idx}`}
                value={partner.stateOfBirth}
                onChange={(e) => {
                  const newPartners = [...partners];
                  newPartners[idx].stateOfBirth = e.target.value;
                  setPartners(newPartners);
                }}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              >
                <option>New South Wales</option>
                <option>Victoria</option>
                <option>Queensland</option>
                <option>Western Australia</option>
                <option>South Australia</option>
                <option>Tasmania</option>
                <option>Australian Capital Territory</option>
                <option>Northern Territory</option>
              </select>
            </FormField>
            <FormField label="City of birth:">
              <input
                type="text"
                name={`cityOfBirth-${idx}`}
                value={partner.cityOfBirth}
                onChange={(e) => {
                  const newPartners = [...partners];
                  newPartners[idx].cityOfBirth = e.target.value;
                  setPartners(newPartners);
                }}
                className={`w-full p-2 border ${
                  errors[`cityOfBirth-${idx}`]
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-green-500`}
              />
              {errors[`cityOfBirth-${idx}`] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[`cityOfBirth-${idx}`]}
                </p>
              )}
            </FormField>
            <FormField label="Tax File Number (TFN):">
              <div className="relative">
                <input
                  type="text"
                  name={`tfn-${idx}`}
                  value={partner.tfn}
                  onChange={(e) => {
                    const newPartners = [...partners];
                    newPartners[idx].tfn = e.target.value;
                    setPartners(newPartners);
                  }}
                  className={`w-full p-2 border ${
                    errors[`tfn-${idx}`] ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-green-500`}
                />
                <BsInfoCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              {errors[`tfn-${idx}`] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[`tfn-${idx}`]}
                </p>
              )}
            </FormField>
            <FormField label="Home address:">
              <input
                type="text"
                name={`homeAddress-${idx}`}
                placeholder="Type here to start searching address"
                value={partner.homeAddress}
                onChange={(e) => {
                  const newPartners = [...partners];
                  newPartners[idx].homeAddress = e.target.value;
                  setPartners(newPartners);
                }}
                className={`w-full p-2 border ${
                  errors[`homeAddress-${idx}`]
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-green-500`}
              />
              {errors[`homeAddress-${idx}`] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[`homeAddress-${idx}`]}
                </p>
              )}
            </FormField>
            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                id={`isAustralianResident-${idx}`}
                name={`isAustralianResident-${idx}`}
                checked={partner.isAustralianResident}
                onChange={(e) => {
                  const newPartners = [...partners];
                  newPartners[idx].isAustralianResident = e.target.checked;
                  setPartners(newPartners);
                }}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label
                htmlFor={`isAustralianResident-${idx}`}
                className="ml-2 block text-sm text-gray-900"
              >
                I am an Australian resident for tax purposes.
              </label>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors mb-8"
          onClick={() =>
            setPartners([
              ...partners,
              {
                type: "Individual",
                title: "Mr",
                givenNames: "",
                lastName: "",
                email: "",
                phone: "",
                dobDay: "",
                dobMonth: "",
                dobYear: "",
                countryOfBirth: "Australia",
                stateOfBirth: "New South Wales",
                cityOfBirth: "",
                tfn: "",
                homeAddress: "",
                isAustralianResident: true,
                declarationAccepted: false,
              },
            ])
          }
        >
          ADD A PARTNER
        </button>

        {/* Step 3: Business Location */}
        <SectionHeader step="Step 3 of 7" title="Business Location" />
        <FormField label="Business address:">
          <input
            type="text"
            name="businessAddress"
            placeholder="Type here to start searching address"
            value={formData.businessAddress}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.businessAddress ? "border-red-500" : "border-gray-300"
            } rounded-md focus:ring-2 focus:ring-green-500`}
          />
          {errors.businessAddress && (
            <p className="text-red-500 text-xs mt-1">
              {errors.businessAddress}
            </p>
          )}
        </FormField>
        <FormField label="What is your address for service of documents?">
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-4">
              <RadioButton
                name="serviceAddress"
                value="business"
                checkedValue={formData.serviceAddress}
                onChange={handleChange}
                label="Business"
              />
              <RadioButton
                name="serviceAddress"
                value="other"
                checkedValue={formData.serviceAddress}
                onChange={handleChange}
                label="Other"
              />
            </div>
            {formData.serviceAddress === "other" && (
              <input
                type="text"
                name="serviceAddressOther"
                placeholder="Type here to start searching address"
                value={formData.serviceAddressOther || ""}
                onChange={handleChange}
                className={`w-full mt-2 p-2 border ${
                  errors.serviceAddressOther
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-green-500`}
              />
            )}
            {errors.serviceAddressOther && (
              <p className="text-red-500 text-xs mt-1">
                {errors.serviceAddressOther}
              </p>
            )}
          </div>
        </FormField>

        {/* Step 4: ABN Registration details */}
        <SectionHeader step="Step 4 of 7" title="ABN Registration details" />
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
        <FormField label="Business history of all partners?">
          <div className="flex flex-col space-y-2">
            <RadioButton
              name="businessHistory"
              value="first_time"
              checkedValue={formData.businessHistory}
              onChange={handleChange}
              label="This is our first time doing business in Australia."
            />
            <RadioButton
              name="businessHistory"
              value="existing_business"
              checkedValue={formData.businessHistory}
              onChange={handleChange}
              label="We have been in business in Australia before."
            />
          </div>
        </FormField>
        <FormField label="Are any of the partners related?">
          <div className="flex flex-col space-y-2">
            <RadioButton
              name="partnersRelated"
              value="no"
              checkedValue={formData.partnersRelated}
              onChange={handleChange}
              label="No, the partners are not family members."
            />
            <RadioButton
              name="partnersRelated"
              value="yes"
              checkedValue={formData.partnersRelated}
              onChange={handleChange}
              label="Yes, some of the partners are members of the same family."
            />
          </div>
        </FormField>

        {/* Step 5: Business Name Application */}
        <SectionHeader step="Step 5 of 7" title="Business Name Application" />
        <FormField label="Will you trade under a business name?">
          <div className="flex flex-col space-y-4">
            <RadioButton
              name="tradeUnderBusinessName"
              value="yes"
              checkedValue={formData.tradeUnderBusinessName}
              onChange={handleChange}
              label="Yes, I want to register our name now."
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
              label="We will trade under our full names."
            />
          </div>
        </FormField>

        {/* Step 6: Domain Name Registration */}
        <SectionHeader step="Step 6 of 7" title="Domain Name Registration" />
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

        {/* Step 7: GST Registration */}
        <SectionHeader step="Step 7 of 7" title="GST Registration" />
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

export default PartnershipPage;
