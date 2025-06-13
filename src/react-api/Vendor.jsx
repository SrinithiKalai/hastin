import React, { useEffect, useState } from "react";
import UpdateForm from "./UpdateForm";
import VendorContact from "./VendorContact";
import { useDispatch, useSelector } from "react-redux";
import {
  createRequest,
  updateRequest,
  getIdRequest,
  cityRequest,
} from "../Redux/Action/LoginAction";
import "./FormUpdate.css";

const Vendor = () => {
  const dispatch = useDispatch();
  const fetch = useSelector((state) => state.user.editObj);
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
    if (fetch) {
      const updatedForm = {
        ...fetch,
        countryId: fetch.country || "",
        cityId: fetch.city || "",
        contactList: (fetch.contactList || []).map((item) => ({
          ...item,
          isDefault: item.isDefault ?? false,
        })),
      };
      setFormdata(updatedForm);

      if (fetch.country) {
        dispatch(cityRequest(fetch.country));
      }
    }
  }, [fetch, dispatch]);

  const handleInputChange = (updatedData) => {
    setFormdata(updatedData);
    setIsUpdated(true);
  };

  const generatePayload = (data) => ({
    ...data,
    country: data.countryId || "",
    city: data.cityId || "",
  });

  const handleSave = () => {
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
      label: "CONTACTS",
      content: (
        <div className="content">
          <VendorContact formData={formData} setFormdata={handleInputChange} />
        </div>
      ),
      command: () => setFocuseItem("CONTACTS"),
    },
  ];

  return (
    <div>
      <div className="vertical-menu-container" style={{paddingLeft: "20px" }}>
        {menuItems.map((item, index) => (
          <div key={index} className="mb-4">
            <button
              className={`menu-item ${
                focuseItem === item.label ? "active" : ""
              }`}
              onClick={item.command}
            >
              {item.label}
            </button>
            {focuseItem === item.label && item.content}
          </div>
        ))}
      </div>
      <div className="save-button-container" style={{paddingRight: "20px", paddingBottom: "50px"}}>
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
