"use client";
import React, { useState, useEffect } from "react";

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

const CompanyPage = () => {
  const [shareholders, setShareholders] = useState([
    {
      entityType: "Individual",
      title: "Mr",
      givenNames: "",
      lastName: "",
      dobDay: "",
      dobMonth: "",
      dobYear: "",
      tfn: "",
      isAustralianResident: true,
    },
  ]);
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
  ]);
  const today = new Date();
  const [formData, setFormData] = useState({
    hasACN: "yes",
    acn: "",
    isMajorityOwnedSubsidiary: "no",
    onlyDirector: "yes",
    onlyShareholder: "yes",
    holdingCompanyAcn: "",
    activityLocation: "australia",
    abnReason: "starting_business",
    businessAddress: "",
    serviceAddress: "business",
    abnActiveDate: today.toISOString().split("T")[0],
    abnActiveDay: today.getDate().toString(),
    abnActiveMonth: today.toLocaleString("default", { month: "long" }),
    abnActiveYear: today.getFullYear().toString(),
    serviceAddressOther: "",
    mainBusinessActivity: "",
    businessCategory: "",
    payOtherFees: "no",
    businessHistory: "first_time",
    partnersRelated: "no",
    tradeUnderBusinessName: "yes",
    businessNameSearch: "",
    registerDomainName: "no",
    domainNameSearch: "",
    registerForGST: "yes",
    declarationAccepted: false,
    companyNameSearch: "",
    companyNameSuffix: "PTY LTD",
    asicCompliancePlan: "no",
    declarationAcceptedAsic: false,
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
    if (formData.hasACN === "yes") {
      if (!formData.acn.trim()) newErrors.acn = "ACN is required.";
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
    } else {
      // hasACN === 'no'
      if (!formData.companyNameSearch.trim())
        newErrors.companyNameSearch = "Company name is required.";
      if (!formData.declarationAcceptedAsic)
        newErrors.declarationAcceptedAsic =
          "You must accept the ASIC declaration.";
    }

    if (
      formData.isMajorityOwnedSubsidiary === "yes" &&
      !formData.holdingCompanyAcn.trim()
    )
      newErrors.holdingCompanyAcn = "Holding company ACN is required.";
    if (!formData.businessAddress.trim())
      newErrors.businessAddress = "Business address is required.";
    if (
      formData.serviceAddress === "other" &&
      !formData.serviceAddressOther.trim()
    )
      newErrors.serviceAddressOther = "Service address is required.";
    if (!formData.mainBusinessActivity.trim())
      newErrors.mainBusinessActivity = "Main business activity is required.";
    if (!formData.businessCategory.trim())
      newErrors.businessCategory = "Business category is required.";

    // partners (directors) validation
    const directorsToValidate =
      formData.onlyDirector === "yes" ? [partners[0]] : partners;
    directorsToValidate.forEach((partner, idx) => {
      // Name, email, phone, and other text fields validation
      if (partner.givenNames.trim().length < 2)
        newErrors[`director-givenNames-${idx}`] =
          "Must be at least 2 characters.";
      if (partner.lastName.trim().length < 2)
        newErrors[`director-lastName-${idx}`] =
          "Must be at least 2 characters.";
      if (!/^\S+@\S+\.\S+$/.test(partner.email))
        newErrors[`director-email-${idx}`] = "Please enter a valid email.";
      if (!/^\+?[0-9\s-()]{8,}$/.test(partner.phone))
        newErrors[`director-phone-${idx}`] =
          "Please enter a valid phone number.";
      if (!partner.cityOfBirth.trim())
        newErrors[`director-cityOfBirth-${idx}`] = "City of birth is required.";
      if (!partner.tfn.trim())
        newErrors[`director-tfn-${idx}`] = "TFN is required.";

      // Date of birth validation
      const day = parseInt(partner.dobDay, 10);
      const month = parseInt(partner.dobMonth, 10);
      const year = parseInt(partner.dobYear, 10);
      if (!partner.dobDay || !partner.dobMonth || !partner.dobYear) {
        newErrors[`director-dob-${idx}`] = "Date of birth is required.";
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
          newErrors[`director-dob-${idx}`] = "Please enter a valid date.";
        }
      }
    });

    // shareholders validation
    if (formData.onlyShareholder === "no") {
      shareholders.forEach((shareholder, idx) => {
        if (shareholder.givenNames.trim().length < 2)
          newErrors[`shareholder-givenNames-${idx}`] =
            "Must be at least 2 characters.";
        if (shareholder.lastName.trim().length < 2)
          newErrors[`shareholder-lastName-${idx}`] =
            "Must be at least 2 characters.";
        if (!shareholder.tfn.trim())
          newErrors[`shareholder-tfn-${idx}`] = "TFN is required.";

        const day = parseInt(shareholder.dobDay, 10);
        const month = parseInt(shareholder.dobMonth, 10);
        const year = parseInt(shareholder.dobYear, 10);
        if (
          !shareholder.dobDay ||
          !shareholder.dobMonth ||
          !shareholder.dobYear
        ) {
          newErrors[`shareholder-dob-${idx}`] = "Date of birth is required.";
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
            newErrors[`shareholder-dob-${idx}`] = "Please enter a valid date.";
          }
        }
      });
    }

    if (!formData.declarationAccepted)
      newErrors.declarationAccepted = "You must accept the declaration.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 ">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Company ABN Registration
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (validate()) {
            const submissionData = { formData, partners, shareholders };
            console.log(
              "Form Data Submitted:",
              JSON.stringify(submissionData, null, 2)
            );
            // Here you would typically send the data to your backend API
          }
        }}
      >
        {/* Step 1: Company Details */}
        <SectionHeader
          step={formData.hasACN === "no" ? "1 / 5" : "1 / 7"}
          title="Company Details"
        />
        <FormField label="Does the company have an Australian Company Number (ACN)?">
          <div className="flex flex-col space-y-2">
            <RadioButton
              name="hasACN"
              value="yes"
              checkedValue={formData.hasACN}
              onChange={handleChange}
              label="Yes"
            />
            <RadioButton
              name="hasACN"
              value="no"
              checkedValue={formData.hasACN}
              onChange={handleChange}
              label="No"
            />
          </div>
        </FormField>
        {formData.hasACN === "no" && (
          <div className="my-8 p-6 bg-green-50 border border-green-200 rounded-lg">
            <div className="text-lg font-semibold mb-2">
              For only $999 you can register your company and this includes $611
              ASIC fee & $35.27 GST.
            </div>
            <div className="mb-4">
              In addition to account management and issues handling our service
              includes
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <ul className="list-none space-y-1">
                <li>✔ Official registration with ASIC</li>
                <li>✔ Certificate of registration</li>
                <li>✔ Share certificates</li>
                <li>✔ Replaceable rules</li>
              </ul>
              <ul className="list-none space-y-1">
                <li>✔ ACN registration</li>
                <li>✔ Company officer registers</li>
                <li>✔ Application for shares</li>
                <li>✔ Company officer consent forms</li>
              </ul>
            </div>
            <div className="font-semibold mb-2">Package also includes</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <ul className="list-none space-y-1">
                <li>✔ Company ABN Registration</li>
                <li>✔ GST Registration</li>
              </ul>
              <ul className="list-none space-y-1">
                <li>✔ Company Tax File Number</li>
                <li>✔ PAYG Registration</li>
              </ul>
            </div>
            <div className="font-semibold mb-2">Bonus benefits include</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <ul className="list-none space-y-1">
                <li>✔ Free monthly business status update</li>
                <li>✔ Free shareholder changes first 30 days</li>
              </ul>
              <ul className="list-none space-y-1">
                <li>✔ Free director updates first 30 days</li>
                <li>✔ Free subscription to Boss Moves newsletter</li>
              </ul>
            </div>
            <div className="font-semibold mb-2">Choose your company name</div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <input
                type="text"
                name="companyNameSearch"
                placeholder="Check if your company name is available..."
                value={formData.companyNameSearch || ""}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.companyNameSearch
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-green-500`}
              />
              {errors.companyNameSearch && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.companyNameSearch}
                </p>
              )}
              <select
                name="companyNameSuffix"
                value={formData.companyNameSuffix || "PTY LTD"}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              >
                <option>PTY LTD</option>
                <option>LTD</option>
                <option>NL</option>
                <option>NO LIABILITY</option>
              </select>
            </div>
            <button
              type="button"
              className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors"
            >
              Check Name Availability
            </button>
          </div>
        )}
        {formData.hasACN === "yes" && (
          <FormField label="ACN">
            <input
              type="text"
              name="acn"
              placeholder="Enter ACN"
              value={formData.acn}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.acn ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 focus:ring-green-500`}
            />
            {errors.acn && (
              <p className="text-red-500 text-xs mt-1">{errors.acn}</p>
            )}
          </FormField>
        )}
        <FormField label="Is the company a majority-owned subsidiary?">
          <div className="flex flex-col space-y-2">
            <RadioButton
              name="isMajorityOwnedSubsidiary"
              value="yes"
              checkedValue={formData.isMajorityOwnedSubsidiary}
              onChange={handleChange}
              label="Yes"
            />
            <RadioButton
              name="isMajorityOwnedSubsidiary"
              value="no"
              checkedValue={formData.isMajorityOwnedSubsidiary}
              onChange={handleChange}
              label="No"
            />
          </div>
        </FormField>
        {formData.isMajorityOwnedSubsidiary === "yes" && (
          <FormField label="Please provide the holding company's ACN">
            <input
              type="text"
              name="holdingCompanyAcn"
              placeholder="Enter ACN"
              value={formData.holdingCompanyAcn}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.holdingCompanyAcn ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 focus:ring-green-500`}
            />
            {errors.holdingCompanyAcn && (
              <p className="text-red-500 text-xs mt-1">
                {errors.holdingCompanyAcn}
              </p>
            )}
          </FormField>
        )}

        {/* Step 2: Director and Public Officer Details */}
        <SectionHeader
          step={formData.hasACN === "no" ? "2 / 5" : "2 / 7"}
          title={
            formData.onlyDirector === "no"
              ? "First director's details"
              : "Director and Public Officer Details"
          }
        />
        <FormField label="Will you be the only director?">
          <div className="flex flex-col space-y-2">
            <RadioButton
              name="onlyDirector"
              value="yes"
              checkedValue={formData.onlyDirector}
              onChange={handleChange}
              label="Yes"
            />
            <RadioButton
              name="onlyDirector"
              value="no"
              checkedValue={formData.onlyDirector}
              onChange={handleChange}
              label="No"
            />
          </div>
        </FormField>
        {(formData.onlyDirector === "yes" ? [partners[0]] : partners).map(
          (partner, idx) => (
            <div key={idx} className="mb-8 border-b pb-6">
              <h3 className="text-lg font-semibold mb-2">
                {formData.onlyDirector === "no"
                  ? `${
                      idx === 0
                        ? "First"
                        : idx === 1
                        ? "Second"
                        : idx === 2
                        ? "Third"
                        : `${idx + 1}th`
                    } director's details`
                  : null}
              </h3>
              <FormField label="Full name">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <select
                    name="title"
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
                  <div className="md:col-span-5">
                    <input
                      type="text"
                      name="givenNames"
                      placeholder="Given name"
                      value={partner.givenNames}
                      onChange={(e) => {
                        const newPartners = [...partners];
                        newPartners[idx].givenNames = e.target.value;
                        setPartners(newPartners);
                      }}
                      className={`w-full p-2 border ${
                        errors[`director-givenNames-${idx}`]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:ring-2 focus:ring-green-500`}
                    />
                    {errors[`director-givenNames-${idx}`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`director-givenNames-${idx}`]}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-5">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={partner.lastName}
                      onChange={(e) => {
                        const newPartners = [...partners];
                        newPartners[idx].lastName = e.target.value;
                        setPartners(newPartners);
                      }}
                      className={`w-full p-2 border ${
                        errors[`director-lastName-${idx}`]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:ring-2 focus:ring-green-500`}
                    />
                    {errors[`director-lastName-${idx}`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`director-lastName-${idx}`]}
                      </p>
                    )}
                  </div>
                </div>
              </FormField>
              <FormField label="Email">
                <input
                  type="email"
                  name="email"
                  value={partner.email}
                  onChange={(e) => {
                    const newPartners = [...partners];
                    newPartners[idx].email = e.target.value;
                    setPartners(newPartners);
                  }}
                  className={`w-full p-2 border ${
                    errors[`director-email-${idx}`]
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-green-500`}
                />
                {errors[`director-email-${idx}`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`director-email-${idx}`]}
                  </p>
                )}
              </FormField>
              <FormField label="Phone number">
                <input
                  type="tel"
                  name="phone"
                  value={partner.phone}
                  onChange={(e) => {
                    const newPartners = [...partners];
                    newPartners[idx].phone = e.target.value;
                    setPartners(newPartners);
                  }}
                  className={`w-full p-2 border ${
                    errors[`director-phone-${idx}`]
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-green-500`}
                />
                {errors[`director-phone-${idx}`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`director-phone-${idx}`]}
                  </p>
                )}
              </FormField>
              <FormField label="Date of birth">
                <div>
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="dobDay"
                      placeholder="Day"
                      value={partner.dobDay}
                      onChange={(e) => {
                        const newPartners = [...partners];
                        newPartners[idx].dobDay = e.target.value;
                        setPartners(newPartners);
                      }}
                      className={`p-2 border ${
                        errors[`director-dob-${idx}`]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:ring-2 focus:ring-green-500`}
                    />
                    <input
                      type="text"
                      name="dobMonth"
                      placeholder="Month"
                      value={partner.dobMonth}
                      onChange={(e) => {
                        const newPartners = [...partners];
                        newPartners[idx].dobMonth = e.target.value;
                        setPartners(newPartners);
                      }}
                      className={`p-2 border ${
                        errors[`director-dob-${idx}`]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:ring-2 focus:ring-green-500`}
                    />
                    <input
                      type="text"
                      name="dobYear"
                      placeholder="Year"
                      value={partner.dobYear}
                      onChange={(e) => {
                        const newPartners = [...partners];
                        newPartners[idx].dobYear = e.target.value;
                        setPartners(newPartners);
                      }}
                      className={`p-2 border ${
                        errors[`director-dob-${idx}`]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:ring-2 focus:ring-green-500`}
                    />
                  </div>
                  {errors[`director-dob-${idx}`] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[`director-dob-${idx}`]}
                    </p>
                  )}
                </div>
              </FormField>
              <FormField label="Country of birth">
                <select
                  name="countryOfBirth"
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
              <FormField label="State of birth">
                <select
                  name="stateOfBirth"
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
              <FormField label="City of birth">
                <input
                  type="text"
                  name="cityOfBirth"
                  value={partner.cityOfBirth}
                  onChange={(e) => {
                    const newPartners = [...partners];
                    newPartners[idx].cityOfBirth = e.target.value;
                    setPartners(newPartners);
                  }}
                  className={`w-full p-2 border ${
                    errors[`director-cityOfBirth-${idx}`]
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-green-500`}
                />
                {errors[`director-cityOfBirth-${idx}`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`director-cityOfBirth-${idx}`]}
                  </p>
                )}
              </FormField>
              <FormField label="Your Tax File Number (TFN)">
                <input
                  type="text"
                  name="tfn"
                  value={partner.tfn}
                  onChange={(e) => {
                    const newPartners = [...partners];
                    newPartners[idx].tfn = e.target.value;
                    setPartners(newPartners);
                  }}
                  className={`w-full p-2 border ${
                    errors[`director-tfn-${idx}`]
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-green-500`}
                />
                {errors[`director-tfn-${idx}`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`director-tfn-${idx}`]}
                  </p>
                )}
              </FormField>
              {/* Declaration for each director */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Declaration
                </label>
                <div className="flex items-center">
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
                    I am an Australian resident for tax purposes
                  </label>
                </div>
              </div>
            </div>
          )
        )}
        <FormField label="Will you be the only shareholder?">
          <div className="flex flex-col space-y-2">
            <RadioButton
              name="onlyShareholder"
              value="yes"
              checkedValue={formData.onlyShareholder}
              onChange={handleChange}
              label="Yes"
            />
            <RadioButton
              name="onlyShareholder"
              value="no"
              checkedValue={formData.onlyShareholder}
              onChange={handleChange}
              label="No"
            />
          </div>
        </FormField>
        {formData.onlyShareholder === "no" && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Shareholder Details
            </h2>
            {shareholders.map((shareholder, idx) => (
              <div
                key={idx}
                className="mb-8 border p-4 rounded-lg relative bg-gray-50"
              >
                {shareholders.length > 1 && (
                  <button
                    type="button"
                    className="absolute top-4 right-4 bg-red-100 text-red-700 border border-red-300 px-3 py-1 rounded hover:bg-red-200"
                    onClick={() =>
                      setShareholders(shareholders.filter((_, i) => i !== idx))
                    }
                  >
                    Delete Shareholder <span className="ml-1">🗑️</span>
                  </button>
                )}
                <FormField label="Entity type">
                  <div className="flex flex-col space-y-2">
                    <RadioButton
                      name={`entityType-${idx}`}
                      value="Individual"
                      checkedValue={shareholder.entityType}
                      onChange={(e) => {
                        const newShareholders = [...shareholders];
                        newShareholders[idx].entityType = e.target.value;
                        setShareholders(newShareholders);
                      }}
                      label="Individual"
                    />
                    <RadioButton
                      name={`entityType-${idx}`}
                      value="Company"
                      checkedValue={shareholder.entityType}
                      onChange={(e) => {
                        const newShareholders = [...shareholders];
                        newShareholders[idx].entityType = e.target.value;
                        setShareholders(newShareholders);
                      }}
                      label="Company"
                    />
                  </div>
                </FormField>
                <FormField label={`First shareholder's full name`}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <select
                      name={`title-${idx}`}
                      value={shareholder.title}
                      onChange={(e) => {
                        const newShareholders = [...shareholders];
                        newShareholders[idx].title = e.target.value;
                        setShareholders(newShareholders);
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
                      placeholder="Given name"
                      value={shareholder.givenNames}
                      onChange={(e) => {
                        const newShareholders = [...shareholders];
                        newShareholders[idx].givenNames = e.target.value;
                        setShareholders(newShareholders);
                      }}
                      className="md:col-span-5 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      name={`lastName-${idx}`}
                      placeholder="Last name"
                      value={shareholder.lastName}
                      onChange={(e) => {
                        const newShareholders = [...shareholders];
                        newShareholders[idx].lastName = e.target.value;
                        setShareholders(newShareholders);
                      }}
                      className="md:col-span-5 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </FormField>
                <FormField label="Date of birth">
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      name={`dobDay-${idx}`}
                      placeholder="Day"
                      value={shareholder.dobDay}
                      onChange={(e) => {
                        const newShareholders = [...shareholders];
                        newShareholders[idx].dobDay = e.target.value;
                        setShareholders(newShareholders);
                      }}
                      className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      name={`dobMonth-${idx}`}
                      placeholder="Month"
                      value={shareholder.dobMonth}
                      onChange={(e) => {
                        const newShareholders = [...shareholders];
                        newShareholders[idx].dobMonth = e.target.value;
                        setShareholders(newShareholders);
                      }}
                      className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      name={`dobYear-${idx}`}
                      placeholder="Year"
                      value={shareholder.dobYear}
                      onChange={(e) => {
                        const newShareholders = [...shareholders];
                        newShareholders[idx].dobYear = e.target.value;
                        setShareholders(newShareholders);
                      }}
                      className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </FormField>
                <FormField label={`First shareholder's Tax File Number (TFN)`}>
                  <input
                    type="text"
                    name={`tfn-${idx}`}
                    placeholder="Enter your TFN"
                    value={shareholder.tfn}
                    onChange={(e) => {
                      const newShareholders = [...shareholders];
                      newShareholders[idx].tfn = e.target.value;
                      setShareholders(newShareholders);
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  />
                  <span className="text-blue-700 text-xs ml-2 cursor-pointer">
                    I cant find my TFN
                  </span>
                </FormField>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Declaration
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`shareholder-isAustralianResident-${idx}`}
                      name={`shareholder-isAustralianResident-${idx}`}
                      checked={shareholder.isAustralianResident}
                      onChange={(e) => {
                        const newShareholders = [...shareholders];
                        newShareholders[idx].isAustralianResident =
                          e.target.checked;
                        setShareholders(newShareholders);
                      }}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label
                      htmlFor={`shareholder-isAustralianResident-${idx}`}
                      className="ml-2 block text-sm text-gray-900"
                    >
                      I am an Australian resident for tax purposes
                    </label>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="border border-blue-700 text-blue-700 bg-blue-50 px-6 py-2 rounded-md font-semibold flex items-center hover:bg-blue-100 transition-colors"
              onClick={() =>
                setShareholders([
                  ...shareholders,
                  {
                    entityType: "Individual",
                    title: "Mr",
                    givenNames: "",
                    lastName: "",
                    dobDay: "",
                    dobMonth: "",
                    dobYear: "",
                    tfn: "",
                    isAustralianResident: true,
                  },
                ])
              }
            >
              Add a Shareholder <span className="ml-2 text-lg">+</span>
            </button>
          </div>
        )}

        {/* Step 3: Business Location */}
        <SectionHeader
          step={formData.hasACN === "no" ? "3 / 5" : "3 / 7"}
          title="Business Location"
        />
        <FormField label="Business address:">
          <input
            type="text"
            name="businessAddress"
            placeholder="Type here to start searching address"
            value={formData.businessAddress}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          />
        </FormField>
        <FormField label="What is your address for service of documents?">
          <div className="flex space-x-4 mb-4">
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
            <div>
              <div className="text-gray-500 text-sm mb-2">
                GPO Box, Locked Bag, PO Box, Private Bag and RMB are not allowed
              </div>
              <input
                type="text"
                name="serviceAddressOther"
                placeholder="Type here to start searching address"
                value={formData.serviceAddressOther || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
              <div className="text-right mt-1">
                <span className="text-gray-700 text-sm cursor-pointer">
                  Enter address manually
                </span>
              </div>
            </div>
          )}
        </FormField>

        {/* Step 4: Business Details */}
        <SectionHeader
          step={formData.hasACN === "no" ? "4 / 5" : "4 / 7"}
          title="Business Details"
        />
        <FormField label="Main business activity">
          <input
            type="text"
            name="mainBusinessActivity"
            placeholder="Please provide your main business activity"
            value={formData.mainBusinessActivity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          />
        </FormField>
        <FormField label="Business Category">
          <input
            type="text"
            name="businessCategory"
            placeholder="Please select the business category that best describes your business"
            value={formData.businessCategory}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          />
        </FormField>
        <FormField label="ABN active date">
          <div className="grid grid-cols-3 gap-4">
            <select
              name="abnActiveDay"
              value={formData.abnActiveDay || new Date().getDate()}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            >
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              name="abnActiveMonth"
              value={
                formData.abnActiveMonth ||
                new Date().toLocaleString("default", { month: "long" })
              }
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            >
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              name="abnActiveYear"
              value={formData.abnActiveYear || new Date().getFullYear()}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            >
              {Array.from({ length: 5 }, (_, i) => (
                <option key={2023 + i} value={2023 + i}>
                  {2023 + i}
                </option>
              ))}
            </select>
          </div>
        </FormField>
        <FormField label="Will the company pay other fees?">
          <div className="flex flex-col space-y-2">
            <RadioButton
              name="payOtherFees"
              value="no"
              checkedValue={formData.payOtherFees || "no"}
              onChange={handleChange}
              label="No, the company will not pay royalties, dividends or interest to non-residents or report investment income."
            />
            <RadioButton
              name="payOtherFees"
              value="yes"
              checkedValue={formData.payOtherFees || "no"}
              onChange={handleChange}
              label="Yes, the company will pay royalties, dividends or interest to non-residents or report investment income paid to Australian residents."
            />
          </div>
        </FormField>

        {/* Step 5: ASIC Company Compliance Plan (only shown when hasACN is "no") */}
        {formData.hasACN === "no" && (
          <>
            <SectionHeader step="5 / 5" title="ASIC Company Compliance Plan" />
            <FormField label="I need help managing ASIC company compliance">
              <div className="flex flex-col space-y-4">
                <RadioButton
                  name="asicCompliancePlan"
                  value="yes"
                  checkedValue={formData.asicCompliancePlan}
                  onChange={handleChange}
                  label="Yes (free for 30 days, then $69 monthly, cancel anytime)*"
                />
                <p className="text-sm text-blue-600 ml-6">Tax Deductible</p>
                <RadioButton
                  name="asicCompliancePlan"
                  value="no"
                  checkedValue={formData.asicCompliancePlan}
                  onChange={handleChange}
                  label="No, thanks"
                />
              </div>
            </FormField>

            {formData.asicCompliancePlan === "yes" && (
              <div className="my-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="font-semibold mb-4">
                  Our ASIC company compliance plan includes
                </div>

                <div className="mb-4">
                  <div className="font-medium mb-2">
                    ▶ Unlimited filing of company changes to ASIC including
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
                    <ul className="list-none space-y-1">
                      <li>✔ Change company address</li>
                      <li>✔ Change share structure</li>
                      <li>✔ Issue / Transfer shares</li>
                    </ul>
                    <ul className="list-none space-y-1">
                      <li>✔ Appoint company officeholders</li>
                      <li>✔ Update shareholder details</li>
                      <li>✔ Change share price</li>
                    </ul>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="font-medium mb-2">
                    ▶ Company renewal processing and payment
                  </div>
                  <div className="ml-4">
                    <p className="text-sm">
                      We will file and pay* your ASIC annual company review plus
                      provide you with a legally drafted solvency resolution, a
                      statutory requirement of ASIC yearly reviews.
                    </p>
                    <p className="text-sm italic mt-2">
                      * Our service includes ASIC annual fee of $321 and GST
                      where applicable
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="font-medium mb-2">
                    ▶ Personal company compliance account manager
                  </div>
                  <div className="ml-4">
                    <p className="text-sm">
                      Our experts are on call throughout the year to assist you
                      with making changes to your company or shareholder
                      details, transfer or issue new shares or change the price
                      per share.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 p-4 border border-gray-300 rounded-md bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Declaration & Important Information
              </h3>
              <div className="text-sm text-gray-600 max-h-32 overflow-y-auto">
                <p className="mb-2">
                  Please review and confirm you agree with the declaration
                  below.
                </p>
                <p>
                  By submitting this form, I declare that Business Switch Pty
                  Ltd (ABN 83 134 235 304) is authorised to submit an ABN
                  application to the Australian Tax Office on my behalf and to
                  do so as my registered tax agent, and if necessary, submit a
                  business name application or company registration to
                  Australian Securities & Investments Commission (ASIC). I
                  understand that Business Switch will utilise information
                  supplied by me in this form to apply for an ABN, and if
                  necessary, will remain my ASIC agent and notify me when my
                  business name requires renewal. I confirm that I have received
                  the consent of all individuals referred to in this application
                  form, to the submission of their personal information
                  contained in this form to Business Switch Pty Ltd and to the
                  ATO and ASIC as necessary to process this application. I
                  verify that the information supplied is, to the best of my
                  knowledge, accurate and complete. I also confirm:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>
                    I am not disqualified from managing corporations under
                    Section 206B(1) of the Corporations Act 2001.
                  </li>
                  <li>
                    Within the last 5 years I have not been convicted of, or
                    released from prison after being convicted of, and serving a
                    term of imprisonment for, any of the criminal offences
                    referred to in Section 321(1)(c) or (d) of the Business
                    Names Registration Act 2011.
                  </li>
                  <li>
                    This application is submitted under, and is compliant with,
                    the terms and conditions of the ASIC Electronic Lodgement
                    Protocol.
                  </li>
                </ul>
              </div>
              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  id="declarationAcceptedAsic"
                  name="declarationAcceptedAsic"
                  checked={formData.declarationAcceptedAsic}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="declarationAcceptedAsic"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I agree with the declaration and{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms and Conditions of Service
                  </a>
                </label>
              </div>
              {errors.declarationAcceptedAsic && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.declarationAcceptedAsic}
                </p>
              )}
            </div>
          </>
        )}

        {/* Step 5: Business Name Application (only shown when hasACN is "yes") */}
        {formData.hasACN === "yes" && (
          <>
            <SectionHeader step="5 / 7" title="Business Name Application" />
            <FormField label="Will you trade under a business name?">
              <div className="flex flex-col space-y-4">
                <RadioButton
                  name="tradeUnderBusinessName"
                  value="yes"
                  checkedValue={formData.tradeUnderBusinessName}
                  onChange={handleChange}
                  label="Yes, I want to register a business name now"
                />
                {formData.tradeUnderBusinessName === "yes" && (
                  <>
                    <label className="block text-gray-700 text-sm font-medium mb-2 mt-2">
                      Search for your desired business name below
                    </label>
                    <div className="flex items-center space-x-2">
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
                      {errors.businessNameSearch && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.businessNameSearch}
                        </p>
                      )}
                      <button
                        type="button"
                        className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors"
                      >
                        Check Name Availability
                      </button>
                    </div>
                  </>
                )}
                <RadioButton
                  name="tradeUnderBusinessName"
                  value="no"
                  checkedValue={formData.tradeUnderBusinessName}
                  onChange={handleChange}
                  label="I will trade under my company name"
                />
              </div>
            </FormField>
          </>
        )}

        {/* Step 6: Domain Name Registration (only shown when hasACN is "yes") */}
        {formData.hasACN === "yes" && (
          <>
            <SectionHeader step="6 / 7" title="Domain Name Registration" />
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
                    {errors.domainNameSearch && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.domainNameSearch}
                      </p>
                    )}
                    <button
                      type="button"
                      className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors"
                    >
                      SEARCH
                    </button>
                  </div>
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
          </>
        )}

        {/* Step 7: GST Registration (only shown when hasACN is "yes") */}
        {formData.hasACN === "yes" && (
          <>
            <SectionHeader step="7 / 7" title="GST Registration" />
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
          </>
        )}

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

export default CompanyPage;
