import React, { useEffect, useState } from "react";
import UpdateForm from "./UpdateForm";
import VendorContact from "./VendorContact";
import { useDispatch, useSelector } from "react-redux";
import { createRequest, updateRequest, getIdRequest, cityRequest, currencyRequest } from "../Redux/Action/LoginAction";
import "./FormUpdate.css";

const Vendor = () => {
  const dispatch = useDispatch();
  const fetch = useSelector((state) => state.user.editObj);
  const currencyList = useSelector((state) => state.currency.currencyData?.data || []);

  const [focuseItem, setFocuseItem] = useState("BASIC INFORMATION");
  const [isUpdated, setIsUpdated] = useState(false);

  const [formData, setFormdata] = useState({
    countryId: "",
    cityId: "",
    contactList: [
      {
        name: "",
        email: "",
        mobileNo: "",
        isDefault: false,
        id: null,
      },
    ],
    vendorName: "",
    vendorCode: "",
    vendorType: "",
    taxRegNo: "",
    companyRegNo: "",
    address1: "",
    address2: "",
    postalCode: "",
    createdBy: "",
    documentList: [],
    id: null,
    bankAcctName: "",
    bankBranchName: "",
    bankAccountNum: "",
    bankName: "",
    bankSwiftCode: "",
    currencies: "",
  });

  useEffect(() => {
    dispatch(currencyRequest()); 
  }, [dispatch]);

  useEffect(() => {
    if (fetch) {
      const currencyObj = currencyList.find((cur) => cur.id === fetch.defaultCurrencyId);

      const updatedForm = {
        ...fetch,
        countryId: fetch.country || "",
        cityId: fetch.cityId || "",
        currencies: currencyObj?.code || "",
        contactList: (fetch.contactList || []).map((item) => ({
          ...item,
          isDefault: item.isDefault ?? false,
        })),
      };

      setFormdata(updatedForm);

      if (fetch.country) {
        dispatch(cityRequest());
      }
    }
  }, [fetch, currencyList, dispatch]);

  const handleInputChange = (updatedData) => {
    setFormdata(updatedData);
    setIsUpdated(true);
  };

  const generatePayload = (data) => ({
    ...data,
    country: data.countryId || null,
    city: data.cityId || null,
    contactList: data.contactList?.length > 0 ? data.contactList : [],
  });

  const handleSave = () => {
    if (
      !formData.vendorName ||
      !formData.vendorCode ||
      !formData.countryId ||
      !formData.cityId ||
      formData.contactList.length === 0
    ) {
      alert("Please fill all required fields before saving.");
      return;
    }

    const payload = generatePayload(formData);

    if (formData.id) {
      dispatch(updateRequest({ id: formData.id, data: payload }));
    } else {
      dispatch(createRequest(payload));
      dispatch(getIdRequest());
    }

    setIsUpdated(false);
  };

  const menuItems = [
    {
      label: "BASIC INFORMATION",
      content: (
        <div className="content">
          <UpdateForm
            formData={formData}
            setFormdata={handleInputChange}
            setIsUpdated={setIsUpdated}
          />
        </div>
      ),
      command: () => setFocuseItem("BASIC INFORMATION"),
    },
    {
      label: "CONTACT",
      content: (
        <div className="content">
          <VendorContact formData={formData} setFormdata={handleInputChange} />
        </div>
      ),
      command: () => setFocuseItem("CONTACT"),
    },
  ];

  return (
    <div>
      <div className="vertical-menu-container" style={{ paddingLeft: "20px" }}>
        {menuItems.map((item, index) => (
          <div key={index} className="mb-4">
            <button
              className={`menu-item ${focuseItem === item.label ? "active" : ""}`}
              onClick={item.command}
            >
              {item.label}
            </button>
            {focuseItem === item.label && item.content}
          </div>
        ))}
      </div>
      <div
        className="save-button-container"
        style={{ paddingRight: "20px", paddingBottom: "50px" }}
      >
        <button
          type="submit"
          className="save-btn float-end"
          onClick={handleSave}
          disabled={!isUpdated}
        >
          {formData.id ? "UPDATE" : "SAVE"}
        </button>
      </div>
    </div>
  );
};

export default Vendor;
