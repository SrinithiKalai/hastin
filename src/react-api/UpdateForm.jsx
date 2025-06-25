import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { countryRequest, cityRequest, currencyRequest } from "../Redux/Action/LoginAction";
import "./FormUpdate.css";

const UpdateForm = ({ formData, setFormdata, setIsUpdated, showErrors }) => {
  const dispatch = useDispatch();

  const countryList = useSelector((state) => state.country.countryData?.data || []);
  const cityList = useSelector((state) => state.city.cityData?.data || []);
  const currencyList = useSelector((state) => state.currency.currencyData?.data || []);

  useEffect(() => {
    dispatch(countryRequest());
    dispatch(currencyRequest());
    dispatch(cityRequest());
  }, [dispatch]);

  const handleChangeInput = (name, value) => {
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsUpdated?.(true);
  };

  const handleChangeCountry = (value) => {
    handleChangeInput("countryId", value);
    handleChangeInput("cityId", "");
  };

  const filteredCountries = countryList.filter(
    (c) => c?.name && c?.name.trim() !== "" && c?.name !== "N/A" && c?.name !== "." && c?.id
  );

  const filteredCities = cityList.filter(
    (city) => city.countryId === formData.countryId && (city.cityName || city.name)
  );

const renderInput = (label, name, required = false) => {
  const value = formData[name] || "";
  const isError = required && showErrors && (!value || value.trim() === "");


    return (
      <div className="p-field" style={{ position: "relative", marginBottom: "1.5rem" }}>
        <FloatLabel>
          <InputText
            id={name}
            name={name}
            value={value}
            onChange={(e) => handleChangeInput(name, e.target.value)}
            className={`w-full ${isError ? "p-invalid" : ""}`}
          />
          <label htmlFor={name}>{label}</label>
        </FloatLabel>
        {isError && <small style={{ color: "red" }}>Required</small>}
      </div>
    );
  };

  return (
    <div className="update-form-container">
      <div className="update-form-grid">
        <Card title="BASIC DETAILS" className="update-card">
          <div className="update-form-group">
            {renderInput("Vendor Name", "vendorName", true)}
            {renderInput("Vendor Code", "vendorCode", true)}
            <div className="p-field mb-4">
              <FloatLabel>
                <Dropdown
                  id="vendorType"
                  name="vendorType"
                  value={formData.vendorType || ""}
                  options={[
                    { label: "Individual", value: "Individual" },
                    { label: "Company", value: "Company" },
                  ]}
                  onChange={(e) => handleChangeInput("vendorType", e.value)}
                  placeholder="Choose Vendor Type"
                  className={`w-full ${showErrors && !formData.vendorType ? "p-invalid" : ""}`}
                />
                <label htmlFor="vendorType">Vendor Type</label>
              </FloatLabel>
              {showErrors && !formData.vendorType && (
                <small style={{ color: "red" }}>Required</small>
              )}
            </div>
            {renderInput("Company Registration No", "companyRegNo", true)}
            <div className="p-field mb-4">
              <FloatLabel>
                <Dropdown
                  id="defaultCurrencyId"
                  name="defaultCurrencyId"
                  value={formData.defaultCurrencyId || ""}
                  options={currencyList.map((c) => ({
                    label: c.name,
                    value: c.id,
                  }))}
                  onChange={(e) => handleChangeInput("defaultCurrencyId", e.value)}
                  placeholder="Choose Currency"
                  className={`w-full ${showErrors && !formData.defaultCurrencyId ? "p-invalid" : ""}`}
                />
                <label htmlFor="defaultCurrencyId">Currency</label>
              </FloatLabel>
              {showErrors && !formData.defaultCurrencyId && (
                <small style={{ color: "red" }}>Required</small>
              )}
            </div>
          </div>
        </Card>

        <Card title="ADDRESS DETAILS" className="update-card">
          <div className="update-form-group">
            {renderInput("Address 1", "address1", true)}
            {renderInput("Address 2", "address2")}
            <div className="p-field mb-4">
              <FloatLabel>
                <Dropdown
                  id="countryId"
                  name="countryId"
                  value={formData.countryId || ""}
                  options={filteredCountries.map((country) => ({
                    label: country.name,
                    value: country.id,
                  }))}
                  onChange={(e) => handleChangeCountry(e.value)}
                  placeholder="Choose Country"
                  className={`w-full ${showErrors && !formData.countryId ? "p-invalid" : ""}`}
                />
                <label htmlFor="countryId">Country</label>
              </FloatLabel>
              {showErrors && !formData.countryId && (
                <small style={{ color: "red" }}>Required</small>
              )}
            </div>
            <div className="p-field mb-4">
              <FloatLabel>
                <Dropdown
                  id="cityId"
                  name="cityId"
                  value={formData.cityId || ""}
                  options={filteredCities.map((city) => ({
                    label: city.cityName || city.name,
                    value: city.id,
                  }))}
                  onChange={(e) => handleChangeInput("cityId", e.value)}
                  placeholder={formData.countryId && filteredCities.length === 0 ? "No cities found" : "Select City"}
                  disabled={!formData.countryId}
                  className={`w-full ${showErrors && !formData.cityId ? "p-invalid" : ""}`}
                />
                <label htmlFor="cityId">City</label>
              </FloatLabel>
              {showErrors && !formData.cityId && (
                <small style={{ color: "red" }}>Required</small>
              )}
            </div>
            {renderInput("Zip Code", "postalCode", true)}
          </div>
        </Card>

        <Card title="BANK DETAILS" className="update-card">
          <div className="update-form-group">
            {renderInput("Bank Account Name", "bankAcctName")}
            {renderInput("Bank Account No", "bankAccountNum")}
            {renderInput("Bank Name", "bankName")}
            {renderInput("Branch", "bankBranchName")}
            {renderInput("Swift Code", "bankSwiftCode")}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UpdateForm;
