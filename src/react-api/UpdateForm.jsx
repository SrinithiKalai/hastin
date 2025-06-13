import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import {
  countryRequest,
  cityRequest,
  currencyRequest,
} from "../Redux/Action/LoginAction";
import "./FormUpdate.css"; 

const UpdateForm = ({ formData, setFormdata, setIsUpdated }) => {
  const dispatch = useDispatch();

  const countryList = useSelector(
    (state) => state.country.countryData?.data || []
  );
  const cityList = useSelector(
    (state) => state.city.cityData?.data || []
  );
  const currencyList = useSelector(
    (state) => state.currency.currencyData?.data || []
  );

  const filteredCountries = countryList.filter(
    (c) =>
      c.name &&
      c.name.trim() !== "" &&
      c.name !== "N/A" &&
      c.name !== "." &&
      c.id
  );

  const filteredCities = cityList.filter(
    (city) =>
      city.countryId === formData.countryId &&
      (city.cityName || city.name)?.trim() !== ""
  );

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

  const handleChangeCountry = (e) => {
    const value = e.target.value;
    handleChangeInput("countryId", value);
    handleChangeInput("cityId", "");
  };

  return (
    <div className="update-form-container">
      <div className="update-form-grid">
        {/* BASIC DETAILS */}
        <Card title="BASIC DETAILS" className="update-card">
          <div className="update-form-group">
            <InputText
              name="vendorName"
              placeholder="Vendor Name"
              value={formData.vendorName || ""}
              onChange={(e) =>
                handleChangeInput(e.target.name, e.target.value)
              }
            />
            <InputText
              name="vendorCode"
              placeholder="Vendor Code"
              value={formData.vendorCode || ""}
              onChange={(e) =>
                handleChangeInput(e.target.name, e.target.value)
              }
            />
            <select
              name="vendorType"
              value={formData.vendorType || ""}
              onChange={(e) =>
                handleChangeInput(e.target.name, e.target.value)
              }
              className="p-inputtext p-component"
            >
              <option value="">Choose Vendor Type</option>
              <option value="Individual">Individual</option>
              <option value="Company">Company</option>
            </select>
            <InputText
              name="companyRegNo"
              placeholder="Company Registration No"
              value={formData.companyRegNo || ""}
              onChange={(e) =>
                handleChangeInput(e.target.name, e.target.value)
              }
            />
            <select
              name="currencies"
              value={formData.currencies || ""}
              onChange={(e) =>
                handleChangeInput(e.target.name, e.target.value)
              }
              className="p-inputtext p-component"
            >
              <option value="">Choose Currency</option>
              {currencyList.map((currency) => (
                <option key={currency.id} value={currency.code}>
                  {currency.name}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* ADDRESS DETAILS */}
        <Card title="ADDRESS DETAILS" className="update-card">
          <div className="update-form-group">
            <InputText
              name="address1"
              placeholder="Address 1"
              value={formData.address1 || ""}
              onChange={(e) =>
                handleChangeInput(e.target.name, e.target.value)
              }
            />
            <InputText
              name="address2"
              placeholder="Address 2"
              value={formData.address2 || ""}
              onChange={(e) =>
                handleChangeInput(e.target.name, e.target.value)
              }
            />
            <select
              name="countryId"
              value={formData.countryId || ""}
              onChange={handleChangeCountry}
              className="p-inputtext p-component"
            >
              <option value="">Choose Country</option>
              {filteredCountries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            <select
              name="cityId"
              value={formData.cityId || ""}
              onChange={(e) =>
                handleChangeInput(e.target.name, e.target.value)
              }
              disabled={!formData.countryId}
              className="p-inputtext p-component"
            >
              <option value="">
                {formData.countryId && filteredCities.length === 0
                  ? "No cities found"
                  : "Select City"}
              </option>
              {filteredCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.cityName || city.name || "Unnamed City"}
                </option>
              ))}
            </select>
            <InputText
              name="postalCode"
              placeholder="Zip Code"
              value={formData.postalCode || ""}
              onChange={(e) =>
                handleChangeInput(e.target.name, e.target.value)
              }
            />
          </div>
        </Card>

        {/* BANK DETAILS */}
        <Card title="BANK DETAILS" className="update-card">
          <div className="update-form-group">
            <InputText
              name="bankAcctName"
              placeholder="Bank Account Name"
              value={formData.bankAcctName || ""}
              onChange={(e) =>
                handleChangeInput(e.target.name, e.target.value)
              }
            />
            <InputText
              name="bankAccountNum"
              placeholder="Bank Account No"
              value={formData.bankAccountNum || ""}
              onChange={(e) =>
                handleChangeInput(e.target.name, e.target.value)
              }
            />
            <InputText
              name="bankName"
              placeholder="Bank Name"
              value={formData.bankName || ""}
              onChange={(e) =>
                handleChangeInput(e.target.name, e.target.value)
              }
            />
            <InputText
              name="bankBranchName"
              placeholder="Branch"
              value={formData.bankBranchName || ""}
              onChange={(e) =>
                handleChangeInput(e.target.name, e.target.value)
              }
            />
            <InputText
              name="bankSwiftCode"
              placeholder="Swift Code"
              value={formData.bankSwiftCode || ""}
              onChange={(e) =>
                handleChangeInput(e.target.name, e.target.value)
              }
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UpdateForm;
